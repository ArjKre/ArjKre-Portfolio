import { ElementRef, Injectable } from '@angular/core';
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
  slidesElement!: ElementRef<HTMLElement>[];
  hasTriggered = false;

  constructor(private model: Model3dService) {
    ScrollTrigger.defaults({
      // Scoll effect Forward, Leave, Back, Back Leave
      // toggleActions: 'restart pause resume pause',
    });
  }
  private aValue!: number; //Don't know what this dose but without it the globe layout get's messed up!
  private laptopPinPositionXAxis!: number;
  private laptopPinPositionYAxis! : number

  initialize(
    _heroStartElement: HTMLElement,
    _projectContainer: HTMLElement,
    _laptopElement: HTMLElement,
    _slidesElement: ElementRef<HTMLElement>[]
  ): void {
    this.heroStartElement = _heroStartElement;
    this.projectContainer = _projectContainer;
    this.laptopElement = _laptopElement;
    this.slidesElement = _slidesElement;
  }

  runAnimation() {
    try {
      this.aValue = this.laptopElement.offsetHeight + this.laptopElement.clientHeight - (window.innerHeight / 2) * 2;
      this.laptopPinPositionYAxis = window.innerHeight/2;
      this.laptopPinPositionXAxis = window.innerWidth / 2 / 2;
      this.zoomInEffect();
      this.LaptopAnimation();
    } catch (error) {
      return;
    }
  }

  zoomInEffect() {
    const globeZoomInTimeLine = gsap.timeline({
      scrollTrigger: {
        id: 'globe',
        // markers: {
        //   indent:0,
        // },
        trigger: this.heroStartElement,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: 'center top',
        fastScrollEnd: true,
        scrub: 1,
      },
    });

    globeZoomInTimeLine
      .to(this.heroStartElement, { scale: 5, opacity: 0 })
      .to(this.projectContainer, {});
  }

  LaptopAnimation() {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        id: 'tl1',
        trigger: this.projectContainer,
        // markers: {
        //   indent: 350,
        // },
        pin: true,
        pinSpacing: false,
        start: 'top center',
        end: '+=400',
        // end: 'top top',
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (self.progress > 0.5 && !this.hasTriggered) {
            this.model.openLidAnimation();
            this.hasTriggered = true;
          }

          if (self.progress <= 0.5 && this.hasTriggered) {
            this.model.closeLidAnimation();
            this.hasTriggered = false;
          }
        },
      },
    });

    // gsap.set(this.phoneElement,{opacity: 0, translateX: -this.value, zIndex: 0});
    gsap.set(this.laptopElement, { opacity: 0, scale: 0 });

    this.slidesElement.forEach((slide) => {
      gsap.set(slide.nativeElement, { opacity: 0 });
    });

    tl1
      .to(this.laptopElement, {
        y: - this.laptopPinPositionYAxis,
        translateX: 0,
        opacity: 1,
        scale: 1,
      })
      .to(this.laptopElement, { y: -this.laptopPinPositionYAxis, translateX: 0});

    const tl2 = gsap.timeline({
      scrollTrigger: {
        id: 'tl2',
        trigger: this.projectContainer,
        // markers: {
        //   indent: 500,
        // },
        start: 'top+=100 center',
        end: 'top top',
        scrub: 1,
        anticipatePin: 1,
      },
    });

    tl2.fromTo(
      this.laptopElement,
      { y: -this.laptopPinPositionYAxis, translateX: 0 },
      { y: 0, translateX: 0 },
    );

    const tl3 = gsap.timeline({
      scrollTrigger: {
        id: 'tl3',
        markers: {
          indent: 750,
        },
        trigger: this.projectContainer,
        start: 'top top',
        end: 'max',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });


    // CENTER - LEFT 
    // Govt School
    tl3
    .fromTo(this.laptopElement, { translateX: 0 }, { translateX: -this.laptopPinPositionXAxis})
    this.txtAnimation(tl3,1);
    
    // LEFT - RIGHT
    // MC D's
    tl3
    .fromTo(this.laptopElement,{translateX:-this.laptopPinPositionXAxis},{translateX: this.laptopPinPositionXAxis})
    .to(this.slidesElement[1].nativeElement,{zIndex: 0,opacity: 0,},'-=0.5')
    this.txtAnimation(tl3,0);
    
    // RIGHT - LEFT
    //  95R
    tl3
    .fromTo(this.laptopElement,{translateX:this.laptopPinPositionXAxis},{translateX: -this.laptopPinPositionXAxis,})
    .to(this.slidesElement[0].nativeElement,{zIndex: 0,opacity: 0,},'-=0.5')
    this.txtAnimation(tl3,3);
    
    // LEFT - RIGHT
    // BlckDrp
    tl3
    .fromTo(this.laptopElement,{translateX:-this.laptopPinPositionXAxis},{translateX: this.laptopPinPositionXAxis,})
    .to(this.slidesElement[3].nativeElement,{zIndex: 0,opacity: 0,},'-=0.5')
    this.txtAnimation(tl3,2);
    
    // LEFT - RIGHT
    // GAME HUB
    tl3
    .fromTo(this.laptopElement,{translateX: this.laptopPinPositionXAxis},{translateX: -this.laptopPinPositionXAxis,})
    .to(this.slidesElement[2].nativeElement,{zIndex: 0,opacity: 0,},'-=0.5')
    this.txtAnimation(tl3,4);

    
  }

  txtAnimation(timeline: gsap.core.Timeline, idx: number) {
    return timeline.to(
      this.slidesElement[idx].nativeElement,
      {
        opacity: 1,
        onUpdate: () => {
          const opacity = gsap.getProperty(
            this.slidesElement[idx].nativeElement,
            'opacity'
          ) as number;
          this.slidesElement[idx].nativeElement.style.zIndex =
            opacity > 0.9 ? '100' : '1';
        },
      },
      '-=0.5'
    );
  }
}
