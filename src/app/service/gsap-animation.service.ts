import { ElementRef, Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Model3dService } from '../main/projects/service/model3d.service';

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
  private modelPinPositionYAxis!: number;

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
      this.aValue =
        this.laptopElement.offsetHeight +
        this.laptopElement.clientHeight -
        (window.innerHeight / 2) * 2;
      this.modelPinPositionYAxis = window.innerHeight / 2;
      this.modelPinPositionXAxis = window.innerWidth / 2 / 2;
      this.zoomInEffect();
      this.ModelAnimation();
    } catch (error) {
      return;
    }
  }

  zoomInEffect() {
    // Hide the footer from showing
    gsap.set(this.footerElement, { opacity: 0 });

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
        scrub: 0.5,  // Smoother scrub
      },
    });

    globeZoomInTimeLine
      .to(this.heroStartElement, { scale: 5, opacity: 0 })
      .to(this.projectContainer, {});
  }

  ModelAnimation() {

    // Phone Model Invisible
    gsap.set(this.phoneElement, {
      opacity: 0,
      translateX: -this.modelPinPositionXAxis,
    });

    // Laptop Model Reveal
    gsap.set(this.laptopElement, { opacity: 0, scale: 0 });

    this.slidesElement.forEach((slide) => {
      gsap.set(slide.nativeElement, { opacity: 0 });
    });

    const tl1 = gsap.timeline({
      scrollTrigger: {
        id: 'tl1',
        trigger: this.projectContainer,
        // markers: {
        //   indent: 100,
        // },
        start: 'top center',
        end: '+=300',
        scrub: 0.7,  // Smoother scrub
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

    // Model Slides from top to the center
    tl1
      .to(this.laptopElement, {
        y: -this.modelPinPositionYAxis,
        pin: true,
        translateX: 0,
        opacity: 1,
        scale: 1,
      },'-=0.1')
      .fromTo(this.laptopElement, { y: -this.modelPinPositionYAxis, translateX: 0 }, { y: 0 });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        id: 'tl2',
        // markers: {
        //   indent: 400,
        // },
        trigger: this.projectContainer,
        start: 'top top',
        end: 'bottom',
        pin: true,
        pinSpacing: false,
        scrub: 1.5,  // Smoother and slower scrub
        invalidateOnRefresh: true,
        onLeave: () => {
          gsap.set(this.footerElement, { opacity: 1 });
        },
        onEnterBack: () => {
          gsap.set(this.footerElement, { opacity: 0 });
        },
      },
    });

    // CENTER - LEFT /GOVT UP
    tl2.fromTo(
      this.laptopElement,
      { translateX: 0 },
      { translateX: -this.modelPinPositionXAxis }
    );
    this.txtAnimation(tl2, 1);

    // LEFT - RIGHT / MC D's 
    tl2
      .fromTo(
        this.laptopElement,
        { translateX: -this.modelPinPositionXAxis },
        { translateX: this.modelPinPositionXAxis }
      )
      .to(
        this.slidesElement[1].nativeElement,
        { zIndex: 0, opacity: 0 },
        '-=0.5'
      );
    this.txtAnimation(tl2, 0);

    // RIGHT - LEFT / 95R
    tl2
      .fromTo(
        this.laptopElement,
        { translateX: this.modelPinPositionXAxis },
        { translateX: -this.modelPinPositionXAxis }
      )
      .to(
        this.slidesElement[0].nativeElement,
        { zIndex: 0, opacity: 0 },
        '-=0.5'
      );
    this.txtAnimation(tl2, 3);

    // Switching from laptop to smartphone
    tl2;

    // LEFT - RIGHT / BlckDrop
    tl2
      .to(this.slidesElement[3].nativeElement, { zIndex: 0, opacity: 0 })
      .fromTo(
        this.laptopElement,
        { translateX: -this.modelPinPositionXAxis, opacity: 1 },
        { translateX: this.modelPinPositionXAxis, opacity: 0 }
      )
      .fromTo(
        this.phoneElement,
        { translateX: -this.modelPinPositionXAxis, opacity: 0 },
        { translateX: this.modelPinPositionXAxis, opacity: 1 }
      );
    this.txtAnimation(tl2, 2);

    // LEFT - RIGHT /GameHub
    tl2
      .fromTo(
        this.phoneElement,
        { translateX: this.modelPinPositionXAxis },
        { translateX: -this.modelPinPositionXAxis }
      )
      .to(
        this.slidesElement[2].nativeElement,
        { zIndex: 0, opacity: 0 },
        '-=0.5'
      );
    this.txtAnimation(tl2, 4);
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
      '-=0.4'
    );
  }

 
}

