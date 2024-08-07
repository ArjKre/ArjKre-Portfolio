import {
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
export class MainComponent implements OnInit, AfterViewInit {
  heroContainer!: ElementRef<HTMLElement>;
  contentContainer!: ElementRef<HTMLElement>;
  laptopCanvas!: ElementRef<HTMLElement>;

  @ViewChild('centerdiv',{static: true}) placeHolderCenterDiv! : ElementRef<HTMLElement>;

  constructor(private gsapAnimation: GsapAnimationService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.heroContainer && this.contentContainer && this.laptopCanvas) {
      this.gsapAnimation.initialize(
        this.heroContainer.nativeElement,
        this.contentContainer.nativeElement,
        this.laptopCanvas.nativeElement,
        this.placeHolderCenterDiv.nativeElement,
      );
    }
    this.gsapAnimation.runAnimation();
  }
  
  accessGlobeElement(event: ElementRef<HTMLElement>) {
    this.gsapAnimation.heroStartElement = event.nativeElement;

  }

  accessContentElement(event: {parent: ElementRef<HTMLElement>;child: ElementRef<HTMLElement>;}) {
    this.gsapAnimation.contentContainerElement = event.parent.nativeElement;
    this.gsapAnimation.laptopElement = event.child.nativeElement;
    this.gsapAnimation.placeHolderDiv = this.placeHolderCenterDiv.nativeElement;
  }
}
