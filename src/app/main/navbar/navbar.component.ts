import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar-container">
      <a>
        <div class="img-container">
          <img [src]="imagePath" class="prf" alt="logo" />
        </div>
      </a>
      <div class="link-container underline-transition">
        <span class="abt-link ">About</span>
        <span class="contact-link" (click)="contactClick()">Contact Us</span>
      </div>
    </div>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  imagePath! : string;

  constructor() {}

  ngOnInit(): void {
    this.imagePath = '../../assets/images/prf1.jpeg';
  }

  contactClick() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }
}
