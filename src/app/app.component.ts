import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MenuItem } from './menu/menu-item/menu-item';

@Component({
  selector: 'app-root',
  template: `
   <div #appMenuContainer class="app-menu-container">
      <app-navbar class="app-navbar"></app-navbar>
      <div class="wrapper">
        <app-menu
          class="app-menu"
          (currentItem)="OnItemChange($event)"
          [menuContainer]="menuContainerRef"
        ></app-menu>
        <app-proj
          class="app-proj"
          *ngIf="currentItem.id > 0"
          [currentItem]="currentItem"
        ></app-proj>
      </div>
    </div>
    <app-contact class="app-contact"></app-contact>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('appMenuContainer', { static: true })
  menuContainerRef!: ElementRef<HTMLElement>;

  currentItem!: MenuItem;

  constructor(private cdr: ChangeDetectorRef) {}

  OnItemChange(event: MenuItem) {
    this.currentItem = event;
    this.cdr.detectChanges();
  }

  title = 'ArjKre';
}
