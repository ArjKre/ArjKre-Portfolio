import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, QueryList } from '@angular/core';
import { GsapAnimationService } from '../service/gsap-animation.service';

@Component({
  templateUrl: './main.component.html',
  selector: 'app-main',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit {
  heroContainer?: HTMLElement;
  projectContainer?: HTMLElement;
  laptopCanvas?: HTMLElement;
  phoneCanvas?: HTMLElement;
  slidesElement?: ElementRef<HTMLElement>[];
  FooterElement? : HTMLElement;

  footerHeight: number = 0;

  constructor(private gsapAnimation: GsapAnimationService, private cd: ChangeDetectorRef) {}

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
    slides: QueryList<ElementRef<HTMLElement>>;
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
      this.FooterElement!,
    );
    this.gsapAnimation.runAnimation();
  }

  accessFooterHeight(event: HTMLElement) {
    this.FooterElement = event;
    this.footerHeight = event.clientHeight;
    this.cd.detectChanges();
  }
}
