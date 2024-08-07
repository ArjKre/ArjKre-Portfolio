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
import { Content, contentList } from './service/content';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit{
  content!: Content

  @ViewChild('laptop', { static: true })
  laptopContainer!: ElementRef<HTMLElement>;
  
  @ViewChild('contentContainer', { static: true })
  contentContainer!: ElementRef<HTMLElement>;

  @Output() ContentComponentEmit = new EventEmitter<{parent: ElementRef<HTMLElement>, child : ElementRef<HTMLElement>}>();

  constructor(private service: Model3dService) {
  }

  ngOnInit(): void {
    this.content = contentList[0];
    this.ContentComponentEmit.emit({parent: this.contentContainer,child: this.laptopContainer});
    this.service.initializeModel(this.laptopContainer,this.contentContainer);
    this.service.assignCanvasId(this.laptopContainer.nativeElement);
    this.service.resizeModel(this.contentContainer.nativeElement);
  }

}
