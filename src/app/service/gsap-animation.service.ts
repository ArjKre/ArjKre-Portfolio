import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationService {
  constructor() {
    ScrollTrigger.defaults({
      // Defaults are used by all ScrollTriggers
      toggleActions: 'restart pause resume pause', // Scoll effect Forward, Leave, Back, Back Leave
      markers: false,  // Easily remove markers for production
    });
  }
  
  zoomInEffect(element: HTMLElement, end: HTMLElement) {
    
    const zoomInTimeLine = gsap.timeline({
      scrollTrigger: {
        id: 'ZOOM',
        trigger: element,
        pin: true,
        start: `top top`,
        end: `+=100% top`,
        endTrigger: end,
        fastScrollEnd: true,
        scrub: 0.3,
      },
    });

    zoomInTimeLine
      .to(element, { scale: 5, opacity: 0 }, 'sameTime')
      .to(end, {}, 'sameTime');
  }
}
