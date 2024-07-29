import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { InitializeGlobe } from './globe/globe';
import { HttpClient } from '@angular/common/http';
import { GeolocationData } from './globe/geoloactionData';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-hero',
  template: `
    <div class="globe" #globe>
      <div class="txt-hld">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nisi
          ratione nihil magni, eveniet possimus?
        </p>
      </div>
      <div class="mouse" [@revealAnimation]= "isInActive ? 'visible' : 'hidden'"></div>
    </div>
  `,
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('revealAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0%)'
      })),
      transition('hidden => visible', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class HeroComponent implements OnInit {
  private apiUrl: string = 'https://ipapi.co/json/';

  isInActive : boolean = false;

  geolocationData!: GeolocationData;

  @ViewChild('globe', { static: true }) globeCanvas!: ElementRef<HTMLElement>;



  constructor(private ngZone: NgZone, private http: HttpClient) {}


  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.FetchingGlobeAndData();
    });
    setTimeout(() => {
      this.isInActive = true;
    }, 5000);
  }



  FetchingGlobeAndData() {
    this.http.get<GeolocationData>(this.apiUrl).subscribe(
      (data) => {
        this.geolocationData = data;
        InitializeGlobe(this.globeCanvas.nativeElement, this.geolocationData);
      },
      (error) => {
        console.log('Error fetching geolocation data', error);
      }
    );
  }



}
