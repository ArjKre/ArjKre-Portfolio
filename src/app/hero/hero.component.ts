import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GeolocationData } from './globe/geoloactionData';
import { HttpClient } from '@angular/common/http';
import { InitializeGlobe } from './globe/globe';

@Component({
  selector: 'app-hero',
  template: `
    <div class="container">
      <div class="globe" #globe>
        <div class="txt-hld">
          <p>
            Hi, I'm <span class="txt-underline">Arjun Kreshnan</span>, a
            workaholic front-end dev who loves transforming ideas into stunning
            experiences 🫰
          </p>
          <div
            class="hld"
            [@revealAnimation]="isInActive ? 'visible' : 'hidden'"
          >
            <span class="proj-scroll-indicator">PROJECTS</span>
            <!-- <div class="arrow">
            <span></span>
            <span></span>
            <span></span>
          </div> -->
            <div class="mouse"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('revealAnimation', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateY(0%)',
        })
      ),
      transition('hidden => visible', [animate('0.5s ease-in')]),
    ]),
  ],
})
export class HeroComponent implements OnInit {
  private apiUrl: string = 'https://ipapi.co/json/';

  isInActive: boolean = false;

  geolocationData!: GeolocationData;

  @ViewChild('globe', { static: true }) globeCanvas!: ElementRef<HTMLElement>;

  constructor(private ngZone: NgZone, private http: HttpClient) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.FetchingGlobeAndData();
    });
    setTimeout(() => {
      this.isInActive = true;
    }, 3500);
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
