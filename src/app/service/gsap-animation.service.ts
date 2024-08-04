import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContentService } from '../content/service/content.service';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationService {
  heroStartElement!: HTMLElement;
  heroEndElement!: HTMLElement;
  LaptopElement!: HTMLElement;

  private onCompleteOnce : boolean = false;

  constructor(private model: ContentService) {
    ScrollTrigger.defaults({
      // toggleActions: 'restart pause resume pause', // Scoll effect Forward, Leave, Back, Back Leave
      // markers: false
      markers: {
        fontSize: '16',
      },
    });
  }

  initialize(
    heroStartElement: HTMLElement,
    heroEndElement: HTMLElement,
    laptopElement: HTMLElement
  ): void {
    this.heroStartElement = heroStartElement;
    this.heroEndElement = heroEndElement;
    this.LaptopElement = laptopElement;
  }

  // zoomInEffect(heroStartElement : HTMLElement,heroEndElement: HTMLElement) {
  zoomInEffect() {
    const zoomInTimeLine = gsap.timeline({
      scrollTrigger: {
        id: 'ZOOM',
        trigger: this.heroStartElement,
        pin: true,
        start: 'top top',
        end: '100% center',
        fastScrollEnd: true,
        scrub: 0.3,
        onLeave:()=>{
          this.laptopInView();
        },
      },
    });

    zoomInTimeLine
      .to(this.heroStartElement, { scale: 5, opacity: 0 }, 'sameTime')
      .to(this.heroEndElement, {}, 'sameTime');
  }

  laptopInView() {
    const laptopInViewTimeLine = gsap.timeline({
      scrollTrigger: {
        id: 'LAPTOP',
        pin: true,
        start: `40% center`,
        end: '90% 80%',
        scrub: 0.2,
      },
    });

    laptopInViewTimeLine
      .fromTo(
        this.LaptopElement,
        { top: 0, opacity: 0 },
        { top: window.innerHeight - window.outerHeight, opacity: 1 },
        'sameTime'
      )
      .eventCallback('onComplete', () => {
        if(!this.onCompleteOnce)
          this.model.modelAnimation();
          this.onCompleteOnce = true;
      })
      .eventCallback('onReverseComplete', () => {
        this.model.reverseModelAnimation();
        this.onCompleteOnce = false;
      });
  }
}
