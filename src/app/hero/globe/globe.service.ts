import { HttpClient } from '@angular/common/http';
import { GeolocationData } from './geoloactionData';
import { InitializeGlobe } from './globe';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobeService {
  private apiUrl: string = 'https://ipapi.co/json/';

  private geolocationData!: GeolocationData;

  constructor(private http: HttpClient) {}

  FetchingGlobeAndData(globeCanvas: HTMLElement, heroContainer: HTMLElement) {
    this.http.get<GeolocationData>(this.apiUrl).subscribe(
      (data) => {
        this.geolocationData = data;
        InitializeGlobe(globeCanvas, heroContainer, this.geolocationData);
      },
      (error) => {
        console.error('Error fetching geolocation data', error);
      }
    );
  }
}
