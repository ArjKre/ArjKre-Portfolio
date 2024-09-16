import { ElementRef, Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

@Injectable({
  providedIn: 'root',
})
export class PhoneModelService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private _camera!: THREE.PerspectiveCamera;
  private pointLight!: THREE.Light;

  private phoneRenderer!: THREE.WebGLRenderer;
  private screenRenderer!: CSS3DRenderer; // Add CSS3DRenderer
  private screenScene!: THREE.Scene; // Scene for CSS3DRenderer

  private readonly PHONE_MODEL_FILE: string =
    '../../../../assets/models/';

  private modelLoader: GLTFLoader = new GLTFLoader().setPath(
    this.PHONE_MODEL_FILE
  );

  private mesh!: THREE.Group;
  private mixer!: THREE.AnimationMixer;
  private clock: THREE.Clock = new THREE.Clock();
  private stopTime: number | undefined; // To store the stop time

  private mouseX?: number;
  private mouseY?: number;
  private targetY: number = 0;
  private targetX: number = 0;

  private windowHalfX = window.innerWidth / 2;
  private windowHalfY = window.innerHeight / 2;

  WIDTH: number = window.innerWidth * 0.8;
  HEIGHT: number = window.innerHeight * 0.8;

  Screen_MESH?: any;
  cssObject?: any;
  screenContent?: HTMLElement;

  constructor(private ngZone: NgZone) {
    this.CursorTracker();
  }

  assignCanvasId(parentElement: HTMLElement, name: string): void {
    const canvasElement = parentElement.querySelector('canvas');
    if (canvasElement) {
      canvasElement.id = name;
    }
  }

  initializeModel(
    laptop: ElementRef<HTMLElement>,
    screen: ElementRef<HTMLElement>
  ): void {
    //PHONE
    this.setupPhoneRenderer(window.innerWidth, window.innerHeight);
    this.setupPhoneScene(window.innerWidth / window.innerHeight);
    laptop.nativeElement.appendChild(this.phoneRenderer.domElement);
    this.loadModel();

    //PHONE SCREEN
    this.setupScreenRenderer(window.innerWidth, window.innerHeight);
    this.setupPhoneScreenScene(window.innerWidth / window.innerHeight);
    screen.nativeElement.appendChild(this.screenRenderer.domElement);

    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private setupPhoneRenderer(width: number, height: number): void {
    this.phoneRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.phoneRenderer.outputColorSpace = THREE.SRGBColorSpace;
    this.phoneRenderer.setSize(width, height);
    this.phoneRenderer.setClearColor(0x000000, 0);
    this.phoneRenderer.setPixelRatio(window.devicePixelRatio);
  }

  private setupScreenRenderer(width: number, height: number): void {
    this.screenRenderer = new CSS3DRenderer();
    this.screenRenderer.setSize(width, height);
    this.screenRenderer.domElement.style.position = 'absolute';
    this.screenRenderer.domElement.style.top = '0';
  }

  private setupPhoneScene(aspectRatio: number): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.z = 750;
  }

  private setupPhoneScreenScene(aspectRatio: number): void {
    this.screenScene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this._camera.position.z = 750;
  }

  private loadModel(): void {
    this.modelLoader.load(
      'phone.gltf',
      (_gltf: any) => {
        this.onModelLoad(_gltf);
      },
      undefined,
      (error) =>
        console.error('An error occurred while loading the model:', error)
    );
  }

  private onModelLoad(gltf : GLTF): void{
    
    this.mesh = gltf.scene;
    this.mesh.scale.set(120,120,120);
    this.mesh.position.set(-100, -160, 0);

    this.Screen_MESH = this.mesh.getObjectByName('Object_4');

    const material = new THREE.MeshPhongMaterial({
      opacity: 0,
      color: new THREE.Color(0x111111),
      blending: THREE.NoBlending,
    }); 

    this.applyMaterialToObject(this.Screen_MESH, material);

    this.pointLight = new THREE.PointLight(0xffffff, 8, 0, 0.1);
    this.pointLight.position.set(0, 700, 750);
    this.scene.add(this.pointLight, this.mesh);

    this.createPhoneScreen();
    this.syncPhoneScreen();
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

  createPhoneScreen() {
    const _screenContent = document.getElementById('phoneScreenContent');
    this.screenContent = _screenContent?.cloneNode(true) as HTMLElement;
    _screenContent!.remove();
    
    this.cssObject = new CSS3DObject(this.screenContent!);
    this.screenScene.add(this.cssObject);

    this.syncPhoneScreen();
  }

  syncPhoneScreen() {
    if (!this.Screen_MESH || !this.cssObject) return;

    this.Screen_MESH.updateMatrixWorld(true);

    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    this.Screen_MESH.matrixWorld.decompose(position, quaternion, scale);

    // this.cssObject.position.set(40,0,0);
    
    
    this.cssObject.position.copy(position);
    this.cssObject.position.setY(-4)
    this.cssObject.quaternion.copy(quaternion);
    this.cssObject.scale.copy(scale);
    this.cssObject.rotateOnAxis(new THREE.Vector3(0, 0, 1), (Math.PI/2) * -1 );
  }


  private animate = (): void => {
    this.UpdateModelBasedOnCursor();

    requestAnimationFrame(this.animate);

    this.syncPhoneScreen();

    // Render the 3D model using WebGL
    this.phoneRenderer.render(this.scene, this.camera);

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
    this.targetX = this.mouseX! * 0.0001;
    this.targetY = this.mouseY! * 0.0001;

    if (this.mesh && !Number.isNaN(this.targetX) && !Number.isNaN(this.targetY)) {
      this.mesh.rotation.y = this.targetX;
      this.mesh.rotation.x = this.targetY;
    }
  }

  private CursorTracker() {
    document.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.windowHalfX;
      this.mouseY = event.clientY - this.windowHalfY;
    });
  }


  resizeModel() {
    let h  = window.innerHeight * 0.85;
    this.camera.aspect = window.innerWidth / h;
    this.camera.updateProjectionMatrix();
    this.phoneRenderer.setSize(window.innerWidth, h);
  }
}
