import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <div #appMenuContainer class="app-menu-container">
      <app-navbar class="app-navbar"></app-navbar>
      <div class="app-menu-wrapper">
        <app-menu
          [menuContainer]="menuContainerRef"
          class="app-menu"
        ></app-menu>
      </div>
    </div>
    <div class="foo"></div>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('appMenuContainer', { static: true })
  menuContainerRef!: ElementRef<HTMLElement>;
  title = 'ArjKre';
}
