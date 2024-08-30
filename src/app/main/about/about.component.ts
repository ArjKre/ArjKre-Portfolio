import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  isBtnClicked: boolean = false;
  animationState: string = 'start';

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
}
