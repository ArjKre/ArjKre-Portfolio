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
import { GlobeService } from './globe/globe.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
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
  isInActive: boolean = false;

  @ViewChild('globe', { static: true }) globeCanvas!: ElementRef<HTMLElement>;

  @ViewChild('heroContainer', { static: true })
  heroContainer!: ElementRef<HTMLElement>;

  @Output() containerEmit = new EventEmitter<ElementRef<HTMLElement>>();

  constructor(private globeService: GlobeService) {}

  ngOnInit(): void {
    this.globeService.FetchingGlobeAndData(this.globeCanvas,this.heroContainer);
    setTimeout(() => {
      this.isInActive = true;
    }, 4000);
  }

  ngAfterViewInit(): void {
    this.containerEmit.emit(this.heroContainer);
  }
}
