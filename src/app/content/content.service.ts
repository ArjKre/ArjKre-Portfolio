import { ElementRef, Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private LAPTOP_MODEL_FILE = '../../assets/models/macbook_pro_13_inch_2020/';
  private modelLoader: GLTFLoader = new GLTFLoader().setPath(
    this.LAPTOP_MODEL_FILE
  );

  constructor(private ngZone: NgZone) {}

  initialize(laptop: ElementRef<HTMLElement>) {
    const WIDTH = laptop.nativeElement.clientWidth;
    const HEIGHT = laptop.nativeElement.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true,alpha: true });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.setSize(
      laptop.nativeElement.clientWidth,
      laptop.nativeElement.clientHeight
    );
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    laptop.nativeElement.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    // this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    this.camera.position.z = 15;

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableZoom = false;

    this.modelLoader.load(
      'scene.gltf',
      (gltf) => {
        console.log(gltf);
        
        const mesh = gltf.scene;
        mesh.position.set(0,0,0)
        mesh.scale.set(35, 35, 35);
        this.scene.add(
          createPointLight(3.5, 0, 700, 750),
          createPointLight(0.05, -300, 100, 100),
          mesh
        );

      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        requestAnimationFrame(animate);
        this.renderer.render(this.scene, this.camera);
      };

      animate();
    });
  }
}

const createPointLight = (
  intensity: number,
  x: number,
  y: number,
  z: number
) => {
  const pointLight = new THREE.PointLight(0xffffff, intensity, 0, 0);
  pointLight.position.set(x, y, z);
  return pointLight;
};
