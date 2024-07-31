import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GeolocationData } from './globe/geoloactionData';
import { HttpClient } from '@angular/common/http';
import { InitializeGlobe } from './globe/globe';

@Component({
  selector: 'app-hero',
  templateUrl: "./hero.component.html",
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
export class HeroComponent implements OnInit, AfterViewInit {
  private apiUrl: string = 'https://ipapi.co/json/';

  isInActive: boolean = false;

  geolocationData!: GeolocationData;

  @ViewChild('globe', { static: true }) globeCanvas!: ElementRef<HTMLElement>;

  @ViewChild('heroContainer', { static: true })heroContainer!: ElementRef<HTMLElement>;

  @Output() containerEmit = new EventEmitter<ElementRef<HTMLElement>>();

  constructor(private ngZone: NgZone, private http: HttpClient) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.FetchingGlobeAndData();
    });
    setTimeout(() => {
      this.isInActive = true;
    }, 4000);
  }

  ngAfterViewInit(): void {
    this.containerEmit.emit(this.heroContainer);
  }

  FetchingGlobeAndData() {
    this.http.get<GeolocationData>(this.apiUrl).subscribe(
      (data) => {
        this.geolocationData = data;
        InitializeGlobe(
          this.globeCanvas.nativeElement,
          this.heroContainer,
          this.geolocationData
        );
      },
      (error) => {
        console.log('Error fetching geolocation data', error);
      }
    );
  }
}
