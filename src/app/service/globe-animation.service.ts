import { ElementRef, Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class GlobeAnimationService {
  heroStartElement!: HTMLElement;
  projectContainer!: HTMLElement;
  laptopElement!: HTMLElement;
  phoneElement!: HTMLElement;
  descriptionElement!: ElementRef<HTMLElement>[];

  constructor() {}
  private aValue!: number; //Don't know what this dose but without it the globe layout get's messed up!
  // private modelPinPositionXAxis!: number;

  initialize(_heroStartElement: HTMLElement,_projectContainer: HTMLElement): void {

  }

  runGlobeAnimation(_heroStartElement: HTMLElement,_projectContainer: HTMLElement) {
    this.heroStartElement = _heroStartElement;
    this.projectContainer = _projectContainer;
    this.globeAnimation();
    // this.aValue =
    //   this.projectContainer.offsetHeight +
    //   this.projectContainer.clientHeight -
    //   (window.innerHeight / 2) * 2;
    // this.modelPinPositionXAxis = window.innerWidth / 2 / 2;
  }

  private globeAnimation() {
    const globeZoomInTimeLine = gsap.timeline({
      scrollTrigger: {
        id: 'globe',
        // markers: {
        //   indent: 0,
        // },
        trigger: this.heroStartElement,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: 'center top',
        fastScrollEnd: true,
        scrub: 0.5, // Smoother scrub
      },
    });

    globeZoomInTimeLine
      .to(this.heroStartElement, { scale: 5, opacity: 0 })
      .to(this.projectContainer, {});
  }
}
