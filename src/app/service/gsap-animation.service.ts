import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Model3dService } from '../projects/service/model3d.service';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationService {
  heroStartElement!: HTMLElement;
  projectContainer!: HTMLElement;
  laptopElement!: HTMLElement;
  hasTriggered = false; 

  constructor(private model: Model3dService) {
    ScrollTrigger.defaults({

      // Scoll effect Forward, Leave, Back, Back Leave
      // toggleActions: 'restart pause resume pause', 

    });
  }
  private value!: number;

  initialize(
    _heroStartElement: HTMLElement,
    _projectContainer: HTMLElement,
    _laptopElement: HTMLElement,
  ): void {
    this.heroStartElement = _heroStartElement;
    this.projectContainer = _projectContainer;
    this.laptopElement = _laptopElement;
  }

  runAnimation() {
    // this.customScrollbar();
    this.value = (this.laptopElement.offsetHeight + this.laptopElement.clientHeight) -(window.innerHeight/2) * 2;
    this.zoomInEffect();
    this.LaptopAnimation();

  }

  zoomInEffect() {
    const globeZoomInTimeLine = gsap.timeline({
      scrollTrigger: {
        id: 'GLOBE-ZOOM',
        // markers:true,
        trigger: this.heroStartElement,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: 'center top',
        fastScrollEnd: true,
        scrub: true,
      },
    });

    globeZoomInTimeLine
      .to(this.heroStartElement, { scale: 5, opacity: 0 })
      .to(this.projectContainer, {},'samTime');
  }


  LaptopAnimation() {
    let tl1End: number ; // Initialize the end position
  
    const tl1 = gsap.timeline({
      scrollTrigger: {
        id: 'PIN',
        trigger: this.projectContainer,
        // markers: true,
        pin: true,
        pinSpacing: false,
        start: 'top center',
        end: '+=400',
        scrub: 0.3,
        onUpdate: (self) => {
          if (self.progress > 0.5 && !this.hasTriggered) {
            this.hasTriggered = true;
            this.model.openLidAnimation();
          }
          
          if (self.progress <= 0.5 && this.hasTriggered) {
            this.hasTriggered = false;
            this.model.closeLidAnimation();
          }
        },
        onRefresh: (self) => {
          tl1End = self.end;
          initializeTl2(); 
        }
      }
    });
  
    gsap.set(this.laptopElement, { opacity: 1, scale: 0 });
  
    tl1.to(this.laptopElement, { y: -this.value, x: 0, opacity: 1, scale: 1 });
  
    const initializeTl2 = ()=> {
      gsap.timeline({
        scrollTrigger: {
          id: 'MOVE',
          trigger: this.projectContainer,
          // markers: true,
          start: `top+=100 center`, 
          end: 'top top', 
          scrub: 1
        }
      }).fromTo(this.laptopElement,
        { y: -this.value, x: 0 }, 
        { y: 0, x: 400 } 
      );
    }

    const tl3 = gsap.timeline({
      scrollTrigger: {
        id: 'LFT-TO-RGHT',
        // markers: {
        //   indent: 300
        // },
        trigger: this.projectContainer,
        start: 'top+=10% top',
        end:'bottom bottom',
        pin: true,
        scrub: 2,
      }
    })

    tl3.to(this.laptopElement, {});
    tl3.to(this.laptopElement, {});
    tl3.to(this.laptopElement, {});

  }
  
  // customScrollbar(){
  //   gsap.from(this.scrollbarElement, {
  //     scaleY: 0,
  //     transformOrigin: "top top",
  //     ease: "none",
  //     scrollTrigger: {
  //       start: 0,
  //       end: "max",
  //       markers: true,
  //       scrub: true
  //     }
  //   });
  // }
  


}
