import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ContentService } from './service/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit{
  private intervalId: any;

  @ViewChild('laptop', { static: true })
  laptopContainer!: ElementRef<HTMLElement>;

  @Output() laptopContianerEmit = new EventEmitter<ElementRef<HTMLElement>>();

  constructor(private service: ContentService) {}
  ngOnInit(): void {
    this.laptopContianerEmit.emit(this.laptopContainer);
    this.service.initializeModel(this.laptopContainer);
  }





}
