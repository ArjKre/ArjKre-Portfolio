import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { InitializeGlobe } from './globe/globe';

@Component({
  selector: 'app-hero',
  template: ` <div class="globe" #globe></div> `,
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  @ViewChild('globe', { static: true }) globeCanvas!: ElementRef<HTMLElement>;

  constructor(private ngZone: NgZone,) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      InitializeGlobe(this.globeCanvas.nativeElement);
    });
  }
}
