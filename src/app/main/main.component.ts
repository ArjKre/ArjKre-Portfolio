import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
} from '@angular/core';
import { GsapAnimationService } from '../service/gsap-animation.service';

@Component({
  templateUrl: './main.component.html',
  selector: 'app-main',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit{
  heroContainer?: HTMLElement;
  projectContainer?: HTMLElement;
  laptopCanvas?: HTMLElement;
  phoneCanvas?: HTMLElement;
  slidesElement?: ElementRef<HTMLElement>[];

  constructor(private gsapAnimation: GsapAnimationService) {}

  ngAfterViewInit(): void {
    this.checkAndInitialize();
  }


  accessGlobeElement(event: ElementRef<HTMLElement>) {
    this.heroContainer = event.nativeElement;
    this.gsapAnimation.heroStartElement = this.heroContainer;
    this.checkAndInitialize();
  }

  accessProjectsElement(event: {
    projectContainer: ElementRef<HTMLElement>;
    laptop: ElementRef<HTMLElement>;
    phone: ElementRef<HTMLElement>;
    slides:QueryList<ElementRef<HTMLElement>>;
  }) {
    this.projectContainer = event.projectContainer.nativeElement;
    this.laptopCanvas = event.laptop.nativeElement;
    this.phoneCanvas = event.phone.nativeElement;
    this.slidesElement = event.slides.toArray();
    
  }

  checkAndInitialize() {
    this.gsapAnimation.initialize(
      this.heroContainer!,
      this.projectContainer!,
      this.laptopCanvas!,
      this.phoneCanvas!,
      this.slidesElement!,
    );
    this.gsapAnimation.runAnimation();
  }
}
