import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GsapAnimationService } from '../service/gsap-animation.service';

@Component({
  // templateUrl: './main.component.html',
  selector: 'app-main',
  styleUrls: ['./main.component.scss'],
  template: `
    <div class="main-container">
      <app-navbar class="app-navbar"></app-navbar>
      <app-hero (containerEmit)="accessGlobeElement($event)"></app-hero>
      <app-content
        class="app-content"
        (laptopContianerEmit)="accessLaptopElement($event)"
        #content
      ></app-content>
    </div>
  `,
})
export class MainComponent implements AfterViewInit {
  heroContainer!: ElementRef<HTMLElement>;
  laptopCanvas!: ElementRef<HTMLElement>;

  @ViewChild('content', { static: true })
  contentContainer!: ElementRef<HTMLElement>;

  constructor(private gsapAnimation: GsapAnimationService) {}

  ngAfterViewInit(): void {
    if (this.heroContainer && this.contentContainer && this.laptopCanvas) {
      this.gsapAnimation.initialize(
        this.heroContainer.nativeElement,
        this.contentContainer.nativeElement,
        this.laptopCanvas.nativeElement
      );
    }
  }

  async accessGlobeElement(event: ElementRef<HTMLElement>) {
    this.gsapAnimation.heroStartElement = event.nativeElement;
    this.gsapAnimation.zoomInEffect();
  }

  accessLaptopElement(event: ElementRef<HTMLElement>) {
    this.gsapAnimation.LaptopElement = event.nativeElement;
  }
}
