import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationService {
   heroStartElement!: HTMLElement;
   heroEndElement!: HTMLElement;
   LaptopElement!: HTMLElement;

  constructor() {
    ScrollTrigger.defaults({
      toggleActions: 'restart pause resume pause', // Scoll effect Forward, Leave, Back, Back Leave
      markers: true, // Easily remove markers for production
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
        }
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
        end: 'bottom bottom',
        scrub: true,
      },
    });

    laptopInViewTimeLine.fromTo(this.LaptopElement,{translateY: - window.innerHeight,opacity: 0},{translateY: 0,opacity:1},"sameTime");
  }
}
