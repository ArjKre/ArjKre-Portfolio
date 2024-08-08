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
  heroContainer?: ElementRef<HTMLElement>;
  projectContainer?: ElementRef<HTMLElement>;
  laptopCanvas?: ElementRef<HTMLElement>;


  constructor(private gsapAnimation: GsapAnimationService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.heroContainer && this.projectContainer && this.laptopCanvas) {
      this.gsapAnimation.initialize(
        this.heroContainer.nativeElement,
        this.projectContainer.nativeElement,
        this.laptopCanvas.nativeElement,
      );
    }
    this.gsapAnimation.runAnimation();
  }

  accessGlobeElement(event: ElementRef<HTMLElement>) {
    this.gsapAnimation.heroStartElement = event.nativeElement;
  }

  accessProjectsElement(event:{parent: ElementRef<HTMLElement>; child: ElementRef<HTMLElement>;}) {
    this.gsapAnimation.projectContainer = event.parent.nativeElement
    this.gsapAnimation.laptopElement = event.child.nativeElement;
  }

}
