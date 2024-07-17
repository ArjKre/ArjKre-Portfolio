import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2,  } from '@angular/core';
import { MenuItem } from './menu-item/menu-item';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-menu',
  template: `
    <div class="menu-container">
      <ng-container *ngFor="let item of menulist; let i = index">
      <app-menu-item
      *ngIf="i === currentIndex"
        [itemName]="menulist[currentIndex].name"
      ></app-menu-item>
      </ng-container>
    </div>
  `,
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Input() menuContainer!: ElementRef<HTMLElement>;
  currentIndex  : number = 0;

  menulist: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.menulist = [
      { id: 0, name: 'About Us' },
      {
        id: 1,
        name: 'UP School',
        para: `
        The webpage for UP School North Vazhakulam is a dynamic and engaging platform built using HTML, CSS, and JavaScript. It effectively advertises the school's offerings, showcasing its vibrant community, academic excellence, and extracurricular activities. The homepage features an attractive layout with high-quality images and informative content sections. CSS is used to ensure a visually appealing and responsive design that looks great on both desktop and mobile devices. Interactive elements created with JavaScript, such as photo galleries, enhance user engagement and provide a seamless browsing experience. The webpage serves as a comprehensive resource for prospective students and parents, offering detailed information about the faculty, facilities, and contact details.
        
        `,
      },
      { id: 2, name: 'BlckDrop' },
      { id: 3, name: 'McDonald' },
      { id: 4, name: 'Game hub' },
      { id: 5, name: '95R' },
    ];
    console.log(this.menuContainer.nativeElement);
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(this.menuContainer.nativeElement,{
      scrollTrigger: {
        trigger: this.menuContainer.nativeElement,
        start : 'top top',
        end : 'bottom bottom',
        pin: true,
        pinSpacing : false,
        scrub: 0.5,
        markers : false,
        onUpdate : (self) =>{
          if(self.progress === 1){
            self.kill;
          }
          this.currentIndex = Math.floor(self.progress * (this.menulist.length - 1));
        }
      }
    })
  }
}
