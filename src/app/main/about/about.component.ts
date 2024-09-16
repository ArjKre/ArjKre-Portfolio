import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  isBtnClicked: boolean = false;
  animationState: string = 'start';

  @ViewChild('resume', { static: true })resume!: ElementRef<HTMLAnchorElement>;
  
  constructor() {}
  
  @Output() backBtn = new EventEmitter();
  
  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = 'end';
    }, 0);
  }
  
  onBtnClicked() {
    this.backBtn.emit(!this.isBtnClicked);
  }
  
  downloadResume() {
    const link = this.resume.nativeElement;
    link.href = '../../../assets/resume2024.pdf';
    link.download = 'resume2024.pdf';
    window.open(link.href,'_blank');
  }
}
