import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
  <app-navbar class="app-navbar"></app-navbar>
  <app-hero></app-hero>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ArjKre';
}
