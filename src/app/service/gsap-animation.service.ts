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

  private onCompleteOnce: boolean = false;

  constructor(private model: Model3dService) {
    ScrollTrigger.defaults({
      // toggleActions: 'restart pause resume pause', // Scoll effect Forward, Leave, Back, Back Leave
      markers: false
      // markers: {
      //   fontSize: '16',
      // },
    });
  }

  initialize(
    _heroStartElement: HTMLElement,
    _contentContainerElement: HTMLElement,
    _laptopElement: HTMLElement
  ): void {
    this.heroStartElement = _heroStartElement;
    this.contentContainerElement = _contentContainerElement;
    this.laptopElement = _laptopElement;
  }

  zoomInEffect() {
    const zoomInTimeLine = gsap.timeline({
      scrollTrigger: {
        id: 'ZOOM',
        trigger: this.heroStartElement,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: '100% center',
        fastScrollEnd: true,
        scrub: 0.3,
        onLeave: () => {
          this.laptopInView();
        },
      },
    });

    zoomInTimeLine
      .to(this.heroStartElement, { scale: 5, opacity: 0 }, 'sameTime')
      .to(this.contentContainerElement, {}, 'sameTime');
  }

  laptopInView() {
    console.log(this.contentContainerElement.clientHeight);
    const laptopInViewTimeLine = gsap.timeline({
      scrollTrigger: {
        id: 'LAPTOP',
        start: `40% center`,
        end: '90% 90%',
        scrub: 0.2,
      },
    });

    laptopInViewTimeLine
      .fromTo(
        this.laptopElement,
        { opacity: 0,},
        {  opacity: 1,},
        'sameTime'
      )
      .eventCallback('onComplete', () => {
        if (!this.onCompleteOnce) this.model.modelAnimation();
        this.onCompleteOnce = true;
      })
      .eventCallback('onReverseComplete', () => {
        this.model.reverseModelAnimation();
        this.onCompleteOnce = false;
      });
  }

  laptopMovesSideToSide(){
    const sideToSideTImeLine = gsap.timeline({
      scrollTrigger: {
        id: 'SIDE-TO-SIDE',
        pin: true,
      }
    });
  }
}
