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
  descriptionElement!: ElementRef<HTMLElement>[];
  footerElement!: HTMLElement;

  model?: Model3dService;

  private lapImg1!: HTMLElement;
  private lapImg2!: HTMLElement;
  private lapVid!: any;

  constructor(private _model: Model3dService) {
    this.model = _model;
  }
  private aValue!: number; //Don't know what this dose but without it the globe layout get's messed up!
  private modelPinPositionXAxis!: number;
  // private modelPinPositionYAxis!: number;

  initialize(
    _heroStartElement: HTMLElement,
    _projectContainer: HTMLElement,
    _laptopElement: HTMLElement,
    _phoneElement: HTMLElement,
    descriptionElement: ElementRef<HTMLElement>[],
    _footerElement: HTMLElement
  ): void {
    this.heroStartElement = _heroStartElement;
    this.projectContainer = _projectContainer;
    this.laptopElement = _laptopElement;
    this.phoneElement = _phoneElement;
    this.descriptionElement = descriptionElement;
    this.footerElement = _footerElement;

    this.lapImg1 = document.getElementById('img-1')!;
  }
  
  runAnimation() {
    try {
      this.aValue =
      this.laptopElement.offsetHeight +
      this.laptopElement.clientHeight -
      (window.innerHeight / 2) * 2;
      // this.modelPinPositionYAxis = window.innerHeight / 2;
      this.modelPinPositionXAxis = window.innerWidth / 2 / 2;
      this.zoomInEffect();
      this.ModelAnimation();
    } catch (error) {
      return;
    }
  }
  
  zoomInEffect() {
    // Hide the footer from showing
    gsap.set(this.footerElement, { display: 'none' });
    
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
          scrub: 0.5, // Smoother scrub
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

    // SlideElements
    this.descriptionElement.forEach((slide) => {
      gsap.set(slide.nativeElement, { opacity: 0 });
    });

    let hasRun = false;

    // const tl1 = gsap.timeline({
    //   scrollTrigger: {
    //     id: 'tl1',
    //     trigger: this.projectContainer,
    //     pin: true,
    //     pinSpacing: false,
    //     markers: {
    //         indent: 100,
    //       },
    //       start: 'top top',
    //       end: '+=200',
    //       scrub: 0.7, // Smoother scrub
    //       anticipatePin: 1,
    //       onUpdate: (self) => {
    //         const reverseProgress = 1 - self.progress;
    //         const rotationAngle = (Math.PI / 2) * reverseProgress;
    //         const slideImages = document.getElementById('screen-content');

    //       if (this.model!.LaptopLid_MESH) {
    //         this.model!.LaptopLid_MESH.rotation.x = rotationAngle;
    //         if(slideImages){
    //           slideImages.style.filter = `brightness(${self.progress})`;
    //         }
    //       }

    //     },
    //   },
    // });

    // // Model Slides from top to the center
    // tl1
    //   .to(this.laptopElement, {
    //     opacity: 1,
    //     translateY: -this.modelPinPositionYAxis,
    //   })

    //   const tl_1 = gsap.timeline({
    //     scrollTrigger: {
    //       id: 'move',
    //       trigger: this.projectContainer,
    //       markers: {
    //         indent: 500
    //       },
    //       start: 'top+=40 center',
    //       end : '+=200',
    //       scrub: 0.7,
    //     }
    //   })

    //   tl_1.to(this.laptopElement,{translateY: '0 !important'});


    const tl_1 = gsap.timeline({
      scrollTrigger: {
        id: 'open',
        // markers: true,
        trigger: this.projectContainer,
        start: 'top top+=200',
        end: '+=100',
        onUpdate: (self) => {
          const slideImages = document.getElementById('screen-content');

          this.closeAndOpenAnimation(self.progress);

          if (self.progress > 0.4) {
            this.laptopElement.style.filter = `brightness(${self.progress})`;
          }

          if (slideImages) {
            slideImages.style.filter = `brightness(${self.progress})`;
          }

          this.lapImg2 = document.getElementById('img-2')!;
          this.lapImg1 = document.getElementById('img-1')!;
          this.lapVid = document.getElementById('video')!;


        },
      },
    });

    const tl1 = gsap.timeline({
      scrollTrigger: {
        id: 'tl1',
        // markers: {
        //   indent: 400,
        // },
        trigger: this.projectContainer,
        start: 'top top',
        end: 'bottom',
        pin: true,
        pinSpacing: false,
        scrub: 1.5, // Smoother and slower scrub
        invalidateOnRefresh: true,
        onLeave: () => {
          gsap.set(this.footerElement, { display: 'flex' });
        },
        onEnterBack: () => {
          gsap.set(this.footerElement, { display: 'none' });
        },
      },
    });


    // CENTER -> LEFT /GOVT UP
    tl1.fromTo(
      this.laptopElement,
      { translateX: 0 },
      { translateX: -this.modelPinPositionXAxis },
      '+=0.1'
    );
    this.txtAnimation(tl1, 1);

    // LEFT -> RIGHT / 95R
    tl1
      .fromTo(
        this.laptopElement,
        { translateX: -this.modelPinPositionXAxis},
        { translateX: this.modelPinPositionXAxis,onStart:()=>{console.log(this.lapImg1)}}
      )
      .to(
        this.descriptionElement[1].nativeElement,
        { zIndex: 0, opacity: 0 },
        '-=0.5'
      );
    this.txtAnimation(tl1, 0);

    // RIGHT -> LEFT / MC D's
    tl1
      .fromTo(
        this.laptopElement,
        { translateX: this.modelPinPositionXAxis },
        { translateX: -this.modelPinPositionXAxis}
      )
      .to(
        this.descriptionElement[0].nativeElement,
        { zIndex: 0, opacity: 0 },
        '-=0.5'
      );
    this.txtAnimation(tl1, 3);

    // Switching from laptop to smartphone
    tl1;

    // LEFT -> RIGHT / BlckDrop
    tl1
      .to(this.descriptionElement[3].nativeElement, { opacity: 0,})
      tl1.fromTo(
        this.laptopElement,
        { translateX: -this.modelPinPositionXAxis },
        { translateX: this.modelPinPositionXAxis, opacity: 0}
      )
      .fromTo(
        this.phoneElement,
        { translateX: -this.modelPinPositionXAxis, opacity: 0 },
        { translateX: this.modelPinPositionXAxis, opacity: 1 }
      );
    this.txtAnimation(tl1, 2);

    // LEFT -> RIGHT /GameHub
    tl1
      .fromTo(
        this.phoneElement,
        { translateX: this.modelPinPositionXAxis },
        { translateX: -this.modelPinPositionXAxis }
      )
      .to(
        this.descriptionElement[2].nativeElement,
        { zIndex: 0, opacity: 0 },
        '-=0.5'
      );
    this.txtAnimation(tl1, 4);
  }

  closeAndOpenAnimation(progress: number) {
    const reverseProgress = 1 - progress;
    const rotationAngle = (Math.PI / 2) * reverseProgress;
    if (this.model!.LaptopLid_MESH) {
      this.model!.LaptopLid_MESH.rotation.x = rotationAngle;
    }
  }

  txtAnimation(timeline: gsap.core.Timeline, idx: number) {
    return timeline.to(
      this.descriptionElement[idx].nativeElement,
      {
        opacity: 1,
        // onUpdate: () => {
        //   const opacity = gsap.getProperty(
        //     this.slidesElement[idx].nativeElement,
        //     'opacity'
        //   ) as number;
        //   this.slidesElement[idx].nativeElement.style.zIndex =
        //     opacity > 0.9 ? '100' : '1';
        // },
      },
      '-=0.4'
    );
  }
}
