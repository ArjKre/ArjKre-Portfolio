import { Component, ElementRef, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements AfterViewInit {
  
  email = 'arj@kr3.dev';
  isPaused = false;

  @ViewChild('futContainer',{static: true}) futContainer! : ElementRef<HTMLElement>;

  @Output() footerHeightEmitter =  new EventEmitter<HTMLElement>();

  constructor() {}

  ngAfterViewInit(): void {
    this.footerHeightEmitter.emit(this.futContainer.nativeElement);
  }

  pauseAnimation(): void {
    this.isPaused = true;
  }

  resumeAnimation(): void {
    this.isPaused = false;
  }
}
