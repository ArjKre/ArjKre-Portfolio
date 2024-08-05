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
import { Model3dService } from './service/model3d.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit{
  private intervalId: any;

  @ViewChild('laptop', { static: true })
  laptopContainer!: ElementRef<HTMLElement>;
  
  @ViewChild('contentContainer', { static: true })
  contentContainer!: ElementRef<HTMLElement>;

  @Output() ContentComponentEmit = new EventEmitter<{parent: ElementRef<HTMLElement>, child : ElementRef<HTMLElement>}>();

  constructor(private service: Model3dService) {
  }
  ngOnInit(): void {
    this.ContentComponentEmit.emit({parent: this.contentContainer,child: this.laptopContainer});
    this.service.initializeModel(this.laptopContainer);
    this.service.assignCanvasId(this.laptopContainer.nativeElement);
  }

}
