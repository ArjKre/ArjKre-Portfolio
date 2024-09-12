import { ElementRef, Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LaptopModelService } from '../main/projects/service/laptop-model.service';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class ModelAnimationService {
  private projectContainer!: HTMLElement;
  private laptopElement!: HTMLElement;
  private phoneElement!: HTMLElement;
  private contentElements!: ElementRef<HTMLElement>[];

  private modelPinPositionXAxis!: number;

  private slideImages?: HTMLElement;
  private screenContent1?: HTMLElement;
  private screenContent2?: HTMLElement;
  private video?: HTMLVideoElement;

  constructor(private model: LaptopModelService) {}

  private txtAnimation(timeline: gsap.core.Timeline, idx: number) {
    return timeline.to(
      this.contentElements[idx].nativeElement,
      { opacity: 1 },
      '-=0.4'
    );
  }

  runModelAnimation(
    projectContainer: HTMLElement,
    laptop: HTMLElement,
    phone: HTMLElement,
    contentSlides: ElementRef<HTMLElement>[]
  ) {
    this.projectContainer = projectContainer;
    this.laptopElement = laptop;
    this.phoneElement = phone;
    this.contentElements = contentSlides;
    this.modelPinPositionXAxis = window.innerWidth / 2 / 2;
    this.ModelAnimation();
  }

  private ModelAnimation() {
    // Phone Model Invisible
    gsap.set(this.phoneElement, {
      opacity: 0,
      translateX: -this.modelPinPositionXAxis,
    });

    // SlideElements
    this.contentElements.forEach((slide) => {
      gsap.set(slide.nativeElement, { opacity: 0 });
    });

    const tl_1 = gsap.timeline({
      scrollTrigger: {
        id: 'open',
        // markers: true,
        trigger: this.projectContainer,
        start: 'top top+=300',
        end: '+=300',
        onUpdate: (self) => {
          this.slideImages = document.getElementById('screen-content')!;
          this.screenContent1 = this.slideImages!.querySelector('.img1')!;
          this.screenContent2 = this.slideImages!.querySelector('.img2')!;
          this.video = this.slideImages!.querySelector('video')!;

          this.model!.closeAndOpenAnimation(self.progress);

          if (self.progress > 0.4) {
            this.laptopElement.style.filter = `brightness(${self.progress})`;
          }

          if (this.slideImages) {
            this.slideImages.style.filter = `brightness(${self.progress})`;
            this.slideImages.style.opacity = `${self.progress}`;
          }
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
      },
    });

    // CENTER -> LEFT /GOVT UP
    tl1.fromTo(
      this.laptopElement,
      { translateX: 0 },
      { translateX: -this.modelPinPositionXAxis, onStart: () => {} },
      '+=0.1'
    );
    this.txtAnimation(tl1, 1);

    // LEFT -> RIGHT / 95R
    tl1
      .fromTo(
        this.laptopElement,
        {
          translateX: -this.modelPinPositionXAxis,
          onReverse: () => {
            if (this.screenContent1) {
              this.screenContent1!.style.opacity = '0';
            }
          },
        },
        {
          translateX: this.modelPinPositionXAxis,
          onComplete: () => {
            if (this.screenContent1) {
              this.screenContent1!.style.opacity = '0';
            }
          },
          onReverseComplete: () => {
            if (this.screenContent1) {
              this.screenContent1!.style.opacity = '1';
            }
          },
        }
      )
      .to(
        this.contentElements[1].nativeElement,
        { zIndex: 0, opacity: 0 },
        '-=0.5'
      );
    this.txtAnimation(tl1, 0);

    // RIGHT -> LEFT / MC D's
    tl1
      .fromTo(
        this.laptopElement,
        { translateX: this.modelPinPositionXAxis },
        {
          translateX: -this.modelPinPositionXAxis,
          onComplete: () => {
            if (this.screenContent1) {
              this.screenContent2!.style.opacity = '0';
              this.video!.play();
            }
          },
          onReverseComplete: () => {
            if (this.screenContent1) {
              this.screenContent2!.style.opacity = '1';
              this.video!.pause();
              this.video!.currentTime = 0;
            }
          },
        }
      )
      .to(
        this.contentElements[0].nativeElement,
        { zIndex: 0, opacity: 0 },
        '-=0.5'
      );
    this.txtAnimation(tl1, 3);

    // Switching from laptop to smartphone
    tl1;

    // LEFT -> RIGHT / BlckDrop
    tl1.to(this.contentElements[3].nativeElement, { opacity: 0 });
    tl1
      .fromTo(
        this.laptopElement,
        { translateX: -this.modelPinPositionXAxis },
        { translateX: this.modelPinPositionXAxis, opacity: 0,onComplete:()=>{
          if(this.screenContent2){
            this.video!.pause();
            this.video!.currentTime = 0;
          }
        },onReverseComplete:()=>{
          if (this.screenContent1) {
            this.video!.play();
          }
        } }
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
        this.contentElements[2].nativeElement,
        { zIndex: 0, opacity: 0 },
        '-=0.5'
      );
    this.txtAnimation(tl1, 4);
  }
}
