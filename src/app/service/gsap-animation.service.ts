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
  phoneElement!: HTMLElement;
  slidesElement!: ElementRef<HTMLElement>[];
  footerElement!: HTMLElement;

  hasTriggered = false;

  constructor(private model: Model3dService) {
    ScrollTrigger.defaults({
      // Scoll effect Forward, Leave, Back, Back Leave
      // toggleActions: 'restart pause resume pause',
    });
  }
  private aValue!: number; //Don't know what this dose but without it the globe layout get's messed up!
  private modelPinPositionXAxis!: number;
  private modelPinPositionYAxis! : number

  initialize(
    _heroStartElement: HTMLElement,
    _projectContainer: HTMLElement,
    _laptopElement: HTMLElement,
    _phoneElement: HTMLElement,
    _slidesElement: ElementRef<HTMLElement>[],
    _footerElement: HTMLElement
  ): void {
    this.heroStartElement = _heroStartElement;
    this.projectContainer = _projectContainer;
    this.laptopElement = _laptopElement;
    this.phoneElement = _phoneElement;
    this.slidesElement = _slidesElement;
    this.footerElement = _footerElement;
  }

  runAnimation() {
    try {
      this.aValue = this.laptopElement.offsetHeight + this.laptopElement.clientHeight - (window.innerHeight / 2) * 2;
      this.modelPinPositionYAxis = window.innerHeight/2;
      this.modelPinPositionXAxis = window.innerWidth / 2 / 2;
      this.zoomInEffect();
      this.ModelAnimation();
    } catch (error) {
      return;
    }
  }

  zoomInEffect() {

    //Hide the footer from showing
    gsap.set(this.footerElement,{opacity: 0});

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

  ModelAnimation() {
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

    //Phone Model Invisible
    gsap.set(this.phoneElement,{opacity: 0, translateX : -this.modelPinPositionXAxis})

    //Laptop Model Reveal
    gsap.set(this.laptopElement, { opacity: 0, scale: 0 });

    this.slidesElement.forEach((slide) => {
      gsap.set(slide.nativeElement, { opacity: 0 });
    });

    //Model Slides from top to the center
    tl1
      .to(this.laptopElement, {
        y: - this.modelPinPositionYAxis,
        translateX: 0,
        opacity: 1,
        scale: 1,
      })
      .to(this.laptopElement, { y: -this.modelPinPositionYAxis, translateX: 0});

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
      { y: -this.modelPinPositionYAxis, translateX: 0 },
      { y: 0, translateX: 0 },
    );

    const tl3 = gsap.timeline({
      scrollTrigger: {
        id: 'tl3',
        markers: true,
        trigger: this.projectContainer,
        start: 'top top',
        // end: 'max',
        end: 'bottom',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onEnter:()=>{
          gsap.set(this.footerElement,{opacity: 1})
        },
        onLeaveBack:()=>{
          gsap.set(this.footerElement,{opacity: 0})
          
        }
      },
    });


    // CENTER - LEFT 
    // Govt School
    tl3
    .fromTo(this.laptopElement, { translateX: 0 }, { translateX: -this.modelPinPositionXAxis})
    this.txtAnimation(tl3,1);
    
    // LEFT - RIGHT
    // MC D's
    tl3
    .fromTo(this.laptopElement,{translateX:-this.modelPinPositionXAxis},{translateX: this.modelPinPositionXAxis})
    .to(this.slidesElement[1].nativeElement,{zIndex: 0,opacity: 0,},'-=0.5')
    this.txtAnimation(tl3,0);
    
    // RIGHT - LEFT
    //  95R
    tl3
    .fromTo(this.laptopElement,{translateX:this.modelPinPositionXAxis},{translateX: -this.modelPinPositionXAxis,})
    .to(this.slidesElement[0].nativeElement,{zIndex: 0,opacity: 0,},'-=0.5')
    this.txtAnimation(tl3,3);

    //Switching from laptop to smartphone
    tl3
    
    // LEFT - RIGHT
    // BlckDrp
    tl3
    .fromTo(this.laptopElement,{translateX:-this.modelPinPositionXAxis,opacity:1},{translateX: this.modelPinPositionXAxis,opacity:0})
    .to(this.slidesElement[3].nativeElement,{zIndex: 0,opacity: 0,})
    .fromTo(this.phoneElement,{translateX:-this.modelPinPositionXAxis,opacity: 0},{translateX: this.modelPinPositionXAxis,opacity: 1})
    this.txtAnimation(tl3,2);
    
    // // LEFT - RIGHT
    // // GAME HUB
    tl3
    .fromTo(this.phoneElement,{translateX: this.modelPinPositionXAxis},{translateX: -this.modelPinPositionXAxis,})
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
