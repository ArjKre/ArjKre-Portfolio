import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MenuItem, menuList } from './menu-item/menu-item';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-menu',
  template: `
    <div class="menu-container">
      <ng-container *ngFor="let item of menulist; let i = index">
        <app-menu-item
          *ngIf="i === currentIndex && i != 0"
          [itemName]="menulist[currentIndex].name"
        ></app-menu-item>
      </ng-container>
    </div>
  `,
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  
  @Input() menuContainer!: ElementRef<HTMLElement>;

  @Output() currentItem = new EventEmitter<MenuItem>();

  currentIndex: number = 0;
  
  isActive : boolean = false;

  menulist: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.menulist = menuList;
    this.currentItem.emit(this.menulist[0]);
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(this.menuContainer.nativeElement, {
      scrollTrigger: {
        trigger: this.menuContainer.nativeElement,
        start: 'top top',
        end: 'bottom bottom',
        pin: this.menuContainer.nativeElement,
        pinnedContainer: this.menuContainer.nativeElement,
        pinSpacing: false,
        scrub: 0.5,
        // markers: true,
        onUpdate: (self) => {
          if(this.isActive == false){
            this.isActive = true;
          }
          this.currentIndex = Math.floor(
            self.progress * (this.menulist.length)
          );//remove the -1 for the length
          this.OutputItem(this.menulist[this.currentIndex]);
        },
      },
    });
  }
  OutputItem(item: MenuItem) {
    this.currentItem.emit(item);
  }
}
