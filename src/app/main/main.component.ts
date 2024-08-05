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
  templateUrl: './main.component.html',
  selector: 'app-main',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit {
  heroContainer!: ElementRef<HTMLElement>;
  contentContainer!: ElementRef<HTMLElement>;
  laptopCanvas!: ElementRef<HTMLElement>;


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

  accessGlobeElement(event: ElementRef<HTMLElement>) {
    this.gsapAnimation.heroStartElement = event.nativeElement;
    this.gsapAnimation.zoomInEffect();
  }

  accessContentElement(event: {parent: ElementRef<HTMLElement>,child: ElementRef<HTMLElement>}) {
    this.gsapAnimation.contentContainerElement = event.parent.nativeElement;
    this.gsapAnimation.laptopElement = event.child.nativeElement;
  }
}
