import { ElementRef, Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private spotLight!: THREE.Light;

  private readonly LAPTOP_MODEL_FILE: string =
    '../../assets/models/asus_rog_flow_x16/';
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

  constructor(private ngZone: NgZone) {
    this.CursorTracker();
  }

  assignCanvasId(parentElement: HTMLElement): void {
    const canvasElement = parentElement.querySelector('canvas');
    if (canvasElement) {
      canvasElement.id = 'laptop-canvas';
    }
  }

  initializeModel(laptop: ElementRef<HTMLElement>): void {
    const WIDTH: number = laptop.nativeElement.clientWidth;
    const HEIGHT: number = laptop.nativeElement.clientHeight;

    this.setupRenderer(WIDTH, HEIGHT);
    this.setupScene(WIDTH / HEIGHT);

    laptop.nativeElement.appendChild(this.renderer.domElement);

    this.loadModel();

    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private setupRenderer(width: number, height: number): void {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  private setupScene(aspectRatio: number): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.z = 6;
  }

  private loadModel(): void {
    this.modelLoader.load(
      'scene.gltf',
      (_gltf: GLTF) => {
        this.gltf = _gltf;
        this.onModelLoaded(this.gltf);
      },
      undefined,
      (error) =>
        console.error('An error occurred while loading the model:', error)
    );
  }

  private onModelLoaded(gltf: GLTF): void {
    this.mesh = gltf.scene;
    this.mesh.position.set(0, -2, 0);
    this.mesh.scale.set(1.2, 1.2, 1);

    this.spotLight = new THREE.PointLight(0xffffff, 10, 0, 0);
    this.spotLight.position.set(0, 700, 750);

    this.scene.add(this.spotLight, this.mesh);
  }

  //Method to run the model animation
  modelAnimation() {
    this.mixer = new THREE.AnimationMixer(this.mesh);
    this.animationAction = this.mixer.clipAction(this.gltf.animations[0]);
    this.animationAction.play();
    this.stopAnimationAfterDelay(0.9);
  }

  reverseModelAnimation() {
    this.animationAction.timeScale = -1.1;
    this.animationAction.play();
  }

  private stopAnimationAfterDelay(seconds: number): void {
    setTimeout(() => {
      this.stopTime = seconds;
    }, seconds * 1000);
  }

  private animate = (): void => {
    this.UpdateModelBasedOnCursor();

    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);

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
}
