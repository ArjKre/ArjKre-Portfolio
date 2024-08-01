import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GsapAnimationService } from '../service/gsap-animation.service';

@Component({
  selector: 'app-main',
  templateUrl:"./main.component.html",
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit{
  scrollbarContainer!: ElementRef<HTMLElement>;

  
  @ViewChild('content', { static: true }) contentContainer!: ElementRef<HTMLElement>;

  constructor(private gsapAnimation: GsapAnimationService) {}

  ngOnInit(): void {}

  accessElement(event: ElementRef) {
    this.scrollbarContainer = event;
    this.gsapAnimation.zoomInEffect(this.scrollbarContainer.nativeElement,this.contentContainer.nativeElement);
  }
}
