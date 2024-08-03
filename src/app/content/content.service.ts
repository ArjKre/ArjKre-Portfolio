import { ElementRef, Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private readonly LAPTOP_MODEL_FILE: string = '../../assets/models/macbook_pro_13_inch_2020/';
  private modelLoader: GLTFLoader = new GLTFLoader().setPath(this.LAPTOP_MODEL_FILE);

  private mixer!: THREE.AnimationMixer;
  private clip!: THREE.AnimationClip[];
  private animationAction!: THREE.AnimationAction;
  private clock: THREE.Clock = new THREE.Clock();
  private stopTime: number | undefined; // To store the stop time

  constructor(private ngZone: NgZone) {}

  initialize(laptop: ElementRef<HTMLElement>): void {
    const WIDTH: number = laptop.nativeElement.clientWidth;
    const HEIGHT: number = laptop.nativeElement.clientHeight;

    this.setupRenderer(WIDTH, HEIGHT);
    this.setupScene(WIDTH / HEIGHT);
    this.setupControls();

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
    this.camera.position.z = 15;
  }

  private setupControls(): void {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableZoom = false;
  }

  private loadModel(): void {
    this.modelLoader.load(
      'scene.gltf',
      (gltf: GLTF) => this.onModelLoaded(gltf),
      undefined,
      (error) => console.error('An error occurred while loading the model:', error)
    );
  }

  private onModelLoaded(gltf: GLTF): void {
    const MESH: THREE.Group = gltf.scene;
    MESH.position.set(0, 0, 0);
    MESH.scale.set(35, 35, 35);
    MESH.receiveShadow = true;
    MESH.castShadow = true;

    this.mixer = new THREE.AnimationMixer(MESH);
    this.clip = gltf.animations;
    const trackName = 'Bevels_2.quaternion';
    const specificTrack = this.clip[0].tracks.find((track: THREE.KeyframeTrack) => track.name === trackName);

    if (specificTrack) {
      const singleTrackClip = new THREE.AnimationClip('clip', 5, [specificTrack]);
      this.animationAction = this.mixer.clipAction(singleTrackClip);
      this.animationAction.play();
    }

    this.scene.add(
      createPointLight(3.5, 0, 700, 750),
      // createPointLight(0.05, -300, 100, 100),
      MESH
    );

    // Stop the animation after 2 seconds
    this.stopAnimationAfterDelay(3.5);
  }

  private animate = (): void => {
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

  // Method to stop animation at a specific keyframe value
  stopAnimationAt(time: number): void {
    this.stopTime = time;
  }

  // Method to stop animation after a delay (in seconds)
  private stopAnimationAfterDelay(seconds: number): void {
    setTimeout(() => {
      this.stopAnimationAt(seconds);
    }, seconds * 1000);
  }
}

function createPointLight (intensity: number,x: number,y: number,z: number): THREE.PointLight  {
  const light = new THREE.PointLight(0xffffff, intensity, 0, 0);
  light.position.set(x, y, z);
  light.castShadow = true;
  // light.shadow.bias = -0.0001;
  light.shadow.normalBias = 1;
  return light;
};
