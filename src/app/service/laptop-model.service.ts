import { ElementRef, Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import {
  CSS3DRenderer,
  CSS3DObject,
} from 'three/examples/jsm/renderers/CSS3DRenderer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

@Injectable({
  providedIn: 'root',
})
export class LaptopModelService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private _camera!: THREE.PerspectiveCamera;
  private pointLight!: THREE.Light;

  private LaptopRenderer!: THREE.WebGLRenderer;
  private screenRenderer!: CSS3DRenderer; // Add CSS3DRenderer
  private screenScene!: THREE.Scene; // Scene for CSS3DRenderer

  private readonly LAPTOP_MODEL_FILE: string =
    '../../../../assets/models/';
  private modelLoader: GLTFLoader = new GLTFLoader().setPath(
    this.LAPTOP_MODEL_FILE
  );
  private dracoLoader: DRACOLoader = new DRACOLoader();

  private mesh!: THREE.Group;
  private mixer!: THREE.AnimationMixer;
  private clock: THREE.Clock = new THREE.Clock();
  private stopTime: number | undefined; // To store the stop time

  private mouseX?: number;
  private mouseY?: number;
  private targetY?: number;
  private targetX?: number;

  private windowHalfX = window.innerWidth / 2;
  private windowHalfY = window.innerHeight / 2;

  WIDTH: number = window.innerWidth;
  HEIGHT: number = window.innerHeight;

  LaptopLid_MESH?: THREE.Object3D<THREE.Object3DEventMap>;
  Screen_MESH?: any;
  cssObject?: any;
  screenContent?: HTMLElement;

  constructor(private ngZone: NgZone) {
    this.CursorTracker();
    this.dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
    );
    this.modelLoader.setDRACOLoader(this.dracoLoader);
  }

  assignCanvasId(parentElement: HTMLElement, name: string): void {
    const canvasElement = parentElement.querySelector('canvas');
    if (canvasElement) {
      canvasElement.id = name;
    }
  }

  initializeModel(laptop: ElementRef<HTMLElement>,screen: ElementRef<HTMLElement>): void {

    //LAPTOP
    this.setupLaptopRenderer(window.innerWidth, window.innerHeight);
    this.setupLaptopScene(window.innerWidth / window.innerHeight);
    laptop.nativeElement.appendChild(this.LaptopRenderer.domElement);
    this.loadModel();

    //LAPTOP SCREEN
    this.setupScreenRenderer(window.innerWidth, window.innerHeight);
    this.setupLaptopScreenScene(window.innerWidth / window.innerHeight);
    screen.nativeElement.appendChild(this.screenRenderer.domElement);

    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private setupLaptopRenderer(width: number, height: number): void {
    this.LaptopRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.LaptopRenderer.outputColorSpace = THREE.SRGBColorSpace;
    this.LaptopRenderer.setSize(width, height);
    this.LaptopRenderer.setClearColor(0x000000, 0);
    this.LaptopRenderer.setPixelRatio(window.devicePixelRatio);
  }

  private setupScreenRenderer(width: number, height: number): void {
    this.screenRenderer = new CSS3DRenderer();
    this.screenRenderer.setSize(width, height);
    this.screenRenderer.domElement.style.position = 'absolute';
    this.screenRenderer.domElement.style.top = '0';
  }

  private setupLaptopScene(aspectRatio: number): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.z = 750;
  }
  private setupLaptopScreenScene(aspectRatio: number): void {
    this.screenScene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this._camera.position.z = 750;
  }

  private loadModel(): void {
    this.modelLoader.load(
      'scene.glb',
      (_gltf: any) => {
        this.onModelLoaded(_gltf);
      },
      undefined,
      (error) =>
        console.error('An error occurred while loading the model:', error)
    );
  }

  private onModelLoaded(gltf: any): void {
    this.mesh = gltf.scene;
    this.mesh.position.set(0, -100, 0);
    this.mesh.scale.set(55, 55, 40);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.LaptopLid_MESH = this.mesh.getObjectByName('screenflip');
    this.Screen_MESH = this.mesh.getObjectByName('Cube008_2');

    this.LaptopLid_MESH!.rotation.x = Math.PI / 2;

    const material = new THREE.MeshPhongMaterial({
      opacity: 0.15,
      color: new THREE.Color(0x111111),
      blending: THREE.NoBlending,
    });

    this.applyMaterialToObject(this.Screen_MESH, material);

    this.pointLight = new THREE.PointLight(0xffffff, 10, 0, 0);
    this.pointLight.position.set(0, 150, 50);

    this.scene.add(this.pointLight, this.mesh);

    this.createLaptopScreen();
    this.syncLaptopScreen();
  }

  private applyMaterialToObject(
    objectName: THREE.Object3D<THREE.Object3DEventMap>,
    material: THREE.Material
  ): void {
    if (objectName) {
      objectName.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
          child.material.needsUpdate = true;
        }
      });
    }
  }

  createLaptopScreen() {
    const _screenContent = document.getElementById('laptopScreenContent');
    this.screenContent = _screenContent?.cloneNode(true) as HTMLElement;
    _screenContent!.remove();
    
    this.cssObject = new CSS3DObject(this.screenContent!);
    this.screenScene.add(this.cssObject);

    this.syncLaptopScreen();
  }

  syncLaptopScreen() {
    if (!this.Screen_MESH || !this.cssObject) return;

    this.Screen_MESH.updateMatrixWorld(true);

    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    this.Screen_MESH.matrixWorld.decompose(position, quaternion, scale);

    this.cssObject.position.copy(position);
    this.cssObject.quaternion.copy(quaternion);
    this.cssObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), (Math.PI / 2) * -1);
  }

  closeAndOpenAnimation(progress: number) {
    const reverseProgress = 1 - progress;
    const rotationAngle = (Math.PI / 2) * reverseProgress;
    if (this.LaptopLid_MESH) {
      this.LaptopLid_MESH.rotation.x = rotationAngle;
    }
  }

  private animate = (): void => {
    this.UpdateModelBasedOnCursor();

    requestAnimationFrame(this.animate);

    this.syncLaptopScreen();

    // Render the 3D model using WebGL
    this.LaptopRenderer.render(this.scene, this.camera);

    // Render the 2D content using CSS3DRenderer
    if (this.screenRenderer) {
      this.screenRenderer.render(this.screenScene, this._camera);
    }

    if (this.mixer) {
      const delta = this.clock.getDelta();
      const currentTime = this.mixer.time;

      if (this.stopTime !== undefined && currentTime >= this.stopTime) {
        this.mixer.setTime(this.stopTime);
      } else {
        this.mixer.update(delta);
      }
    }
  };

  private UpdateModelBasedOnCursor() {
    if (this.mouseX !== undefined && this.mouseY !== undefined) {
      this.targetX = this.mouseX * 0.0002;
      this.targetY = this.mouseY * 0.0002;

      if (this.mesh && !Number.isNaN(this.targetX) && !Number.isNaN(this.targetY)) {
        this.mesh.rotation.y = this.targetX;
        this.mesh.rotation.x = this.targetY;
      }
    }
  }

  private CursorTracker() {
    document.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.windowHalfX;
      this.mouseY = event.clientY - this.windowHalfY;
    });
  }


}
