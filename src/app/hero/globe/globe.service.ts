import { HttpClient } from '@angular/common/http';
import { GeolocationData } from './geoloactionData';
import { InitializeGlobe } from './globe';
import { ElementRef, Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobeService {
  private apiUrl: string = 'https://ipapi.co/json/';

  private geolocationData!: GeolocationData;

  constructor(private ngZone: NgZone,private http: HttpClient) {}

  FetchingGlobeAndData(globeCanvas: ElementRef<HTMLElement>, heroContainer: ElementRef<HTMLElement>) {
    this.ngZone.runOutsideAngular(()=>{
      this.http.get<GeolocationData>(this.apiUrl).subscribe(
        (data) => {
          this.geolocationData = data;
          InitializeGlobe(globeCanvas.nativeElement, heroContainer.nativeElement, this.geolocationData);
        },
        (error) => {
          console.error('Error fetching geolocation data', error);
        }
      );
    })
  }
}
