import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Model3dService } from '../content/service/model3d.service';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationService {
  heroStartElement!: HTMLElement;
  contentContainerElement!: HTMLElement;
  laptopElement!: HTMLElement;
  placeHolderDiv!: HTMLElement;

  private onlyOnce: boolean = false;

  constructor(private model: Model3dService) {
    ScrollTrigger.defaults({
      // toggleActions: 'restart pause resume pause', // Scoll effect Forward, Leave, Back, Back Leave
      // markers: false
      // markers: {
      //   fontSize: '16px',
      // },
    });
  }
  private value!: number;

  initialize(
    _heroStartElement: HTMLElement,
    _contentContainerElement: HTMLElement,
    _laptopElement: HTMLElement,
    _placeHolderDiv: HTMLElement
  ): void {
    this.heroStartElement = _heroStartElement;
    this.contentContainerElement = _contentContainerElement;
    this.laptopElement = _laptopElement;
    this.placeHolderDiv = _placeHolderDiv;
  }

  runAnimation() {
    this.value =
      (this.laptopElement.offsetTop +
        this.heroStartElement.clientHeight +
        this.heroStartElement.offsetTop) /
      2;
    this.value += this.placeHolderDiv.offsetTop;
    this.zoomInEffect();
    this.laptopInView();

  }

  zoomInEffect() {
    const zoomInTimeLine = gsap.timeline({
      scrollTrigger: {
        id: 'GLOBE-ZOOM',
        trigger: this.heroStartElement,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: '100% center',
        fastScrollEnd: true,
        scrub: 0.3,
      },
    });

    zoomInTimeLine
      .to(this.heroStartElement, { scale: 5, opacity: 0 })
      .to(this.contentContainerElement, {}, 'sameTime');
  }

  laptopInView() {
    const laptopAnimatedToCenter = gsap.timeline({
      scrollTrigger: {
        markers: {
          indent: 300,
        },
        id: 'LAPTOP',
        start: '40% center',
        end: '+=0',
        scrub: 1,
      },
    });

    gsap.set(this.laptopElement, { opacity: 0 });

    laptopAnimatedToCenter.to(this.laptopElement, {
      opacity: 1,
      y: -this.value,
      onComplete: () => {
        if (!this.onlyOnce) {
          ScrollTrigger.create({
            id: 'PINNED',
            trigger: this.laptopElement,
            markers: true,
            start: `+=60% center`,
            end: '+=25%',
            scrub: 1,
            pin: true,
            pinSpacing: false,
            onEnter: () => {
              this.model.openAnimation();
              // Ensure the element stays at its final transformed position
              // gsap.set(this.laptopElement, {});
            },
          });
          this.onlyOnce = true;
        }
      },
    }).eventCallback('onReverseComplete',()=>{
      this.model.closeAnimation();
    });
  }
}
