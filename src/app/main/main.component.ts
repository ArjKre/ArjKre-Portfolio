import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  QueryList,
} from '@angular/core';
import { GlobeAnimationService } from '../service/globe-animation.service';
import { ModelAnimationService } from '../service/model-animation.service';

@Component({
  templateUrl: './main.component.html',
  selector: 'app-main',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit {
  heroContainer?: HTMLElement;
  projectContainer?: HTMLElement;
  laptopCanvas?: HTMLElement;
  laptopImages?: ElementRef<HTMLElement>[];
  phoneCanvas?: HTMLElement;
  contentElements?: ElementRef<HTMLElement>[];
  FooterElement?: HTMLElement;

  isAboutClicked: boolean = false;

  footerHeight: number = 0;
  isFooterVisible: boolean = false;

  constructor(
    private globeAnimation: GlobeAnimationService,
    private modelAnimation: ModelAnimationService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.checkAndInitialize();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let scrollPosition = window.scrollY;
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (scrollPosition > totalHeight * 0.7) {
      this.isFooterVisible = true;
    } else {
      this.isFooterVisible = false;
    }
  }

  accessGlobeElement(event: ElementRef<HTMLElement>) {
    this.heroContainer = event.nativeElement;
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
    this.contentElements = event.slides.toArray();
  }

  checkAndInitialize() {
    this.globeAnimation.runGlobeAnimation(
      this.heroContainer!,
      this.projectContainer!
    );
    this.modelAnimation.runModelAnimation(
      this.projectContainer!,
      this.laptopCanvas!,
      this.phoneCanvas!,
      this.contentElements!
    );
  }

  accessFooterHeight(event: HTMLElement) {
    this.FooterElement = event;
    this.footerHeight = event.clientHeight;
    this.cd.detectChanges();
  }

  navbarAboutClicked(event: boolean) {
    this.isAboutClicked = event;
  }

  onBackBtnClicked(event: boolean) {
    this.isAboutClicked = !event;
  }
}
