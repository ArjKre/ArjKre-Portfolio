import { ElementRef, Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root',
})
export class Model3dService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private spotLight!: THREE.Light;

  private LaptopRenderer!: THREE.WebGLRenderer;

  private readonly LAPTOP_MODEL_FILE: string =
    '../../../../assets/models/asus_rog_strix_scar_17/';

  private modelLoader: GLTFLoader = new GLTFLoader().setPath(
    this.LAPTOP_MODEL_FILE
  );

  private gltf!: GLTF;
  private mesh!: THREE.Group;

  private mixer!: THREE.AnimationMixer;
  private animationAction!: THREE.AnimationAction;
  private clock: THREE.Clock = new THREE.Clock();
  private stopTime: number | undefined; // To store the stop time

  private mouseX?: number;
  private mouseY?: number;
  private targetX?: number;
  private targetY?: number;

  private windowHalfX = window.innerWidth / 2;
  private windowHalfY = window.innerHeight / 2;

  SCREEN_MESH?: THREE.Object3D<THREE.Object3DEventMap>;

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
  ): void {
    const WIDTH: number = window.innerWidth * 0.8;
    const HEIGHT: number = window.innerHeight * 0.85;
    // const HEIGHT: number = (parentElement.nativeElement.clientHeight/2) * .7;

    this.setupLaptopRenderer(WIDTH, HEIGHT);
    this.setupScene(WIDTH / HEIGHT);

    laptop.nativeElement.appendChild(this.LaptopRenderer.domElement);

    this.loadModel();

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

  private setupScene(aspectRatio: number): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.z = 7;
  }

  private loadModel(): void {
    this.modelLoader.load(
      'scene.gltf',
      (_gltf: GLTF) => {
        this.onModelLoaded(_gltf);
      },
      undefined,
      (error) =>
        console.error('An error occurred while loading the model:', error)
    );
  }


  private onModelLoaded(gltf: GLTF): void {
    this.gltf = gltf;
    this.mesh = gltf.scene;
    // this.mesh.position.set(0, -2, 0);
    this.mesh.position.set(0, -7, 0);
    this.mesh.scale.set(2, 2, 1);
    // this.mesh.scale.set(2, 2, 1);

    this.SCREEN_MESH = this.mesh.getObjectByName('Monitor_7');

    this.spotLight = new THREE.PointLight(0xffffff, 8, 0, 0.1);
    this.spotLight.position.set(0, 700, 750);
    this.scene.add(this.spotLight, this.mesh);

  }


  private animate = (): void => {
    this.UpdateModelBasedOnCursor();

    requestAnimationFrame(this.animate);
    this.LaptopRenderer.render(this.scene, this.camera);

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

    if (this.mesh) {
      this.mesh.rotation.set(
        this.targetY!,
        this.targetX!,
        this.mesh.rotation.z
      );
    }
  }

  private CursorTracker() {
    document.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.windowHalfX;
      this.mouseY = event.clientY - this.windowHalfY;
    });
  }

  resizeModel() {
    let h = window.innerHeight * 0.85;
    this.camera.aspect = window.innerWidth / h;
    this.camera.updateProjectionMatrix();
    this.LaptopRenderer.setSize(window.innerWidth, h);
  }
}
