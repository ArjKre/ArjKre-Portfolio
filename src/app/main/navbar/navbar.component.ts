import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar-container">
      <a>
        <div class="logo-container">
           <p (click)="imgClick()">Arjun Kreshnan <span>↗</span></p>
        </div>
      </a>
      <div class="link-container underline-transition">
        <span class="abt-link" (click)="aboutClick()">About</span>
        <span class="contact-link" (click)="contactClick()">Contact</span>
      </div>
    </div>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  imagePath! : string;

  isabtBtnClick : boolean = false;

  @Output() abtBtnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.imagePath = '../../assets/images/prf1.jpeg';
  }

  contactClick() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'auto',
    });
  }

  aboutClick(){
    this.abtBtnClick.emit(!this.isabtBtnClick);
  }

  imgClick(){
    window.scrollTo({
      top:0,
      behavior: 'smooth',
    })
  }
}
