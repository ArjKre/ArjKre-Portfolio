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
  private spotLight!: THREE.Light;

  private readonly LAPTOP_MODEL_FILE: string = '../../assets/models/asus_rog_flow_x16/';
  private modelLoader: GLTFLoader = new GLTFLoader().setPath(this.LAPTOP_MODEL_FILE);

  private mixer!: THREE.AnimationMixer;
  private clip!: THREE.AnimationClip[];
  private animationAction!: THREE.AnimationAction;
  private clock: THREE.Clock = new THREE.Clock();
  private stopTime: number | undefined; // To store the stop time

  constructor(private ngZone: NgZone) {}

  initializeModel(laptop: ElementRef<HTMLElement>): void {
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
    this.camera.position.z = 5.5;
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
    const mesh: THREE.Group = gltf.scene;
    mesh.position.set(0, 0, 0);
    console.log(gltf.animations[0])
    mesh.scale.set(1, 1, 1);

    this.spotLight = new THREE.PointLight(0xffffff, 3.5, 0, 0);
    this.spotLight.position.set(0, 700, 750);

    this.scene.add(this.spotLight,mesh);

    this.mixer = new THREE.AnimationMixer(mesh);
    this.animationAction = this.mixer.clipAction(gltf.animations[0]);
    this.animationAction.play();
    this.stopAnimationAfterDelay(0.9);

  }

  stopAnimationAt(time: number): void {
    this.stopTime = time;
  }
  
  // Method to stop animation after a delay (in seconds)
  private stopAnimationAfterDelay(seconds: number): void {
    setTimeout(() => {
      this.stopAnimationAt(seconds);
    }, seconds * 1000);
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
  
  

  // LEGACY CODE 👇 | USED FOR CUTTING UP ANIMATIONS

  // private lidOpeningAnimation = (gltf : GLTF, mesh : THREE.Group,trackName : string) : void =>  {
  //   this.mixer = new THREE.AnimationMixer(mesh);
  //   this.clip = gltf.animations;
  //   const specificTrack = this.clip[0].tracks.find((track: THREE.KeyframeTrack) => track.name === trackName);
    
  //   if (specificTrack) {
  //     const singleTrackClip = new THREE.AnimationClip('clip', 10, [specificTrack]);
  //     this.animationAction = this.mixer.clipAction(singleTrackClip);
  //     this.animationAction.play();
  //   }
  // }
}
  