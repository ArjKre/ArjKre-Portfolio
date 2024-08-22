import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Model3dService } from './service/model3d.service';
import { Content, contentList } from './service/content';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  content: Content[] = contentList;

  @ViewChild('projectsContainer', { static: true })
  projectContainer!: ElementRef<HTMLElement>;

  @ViewChild('laptop', { static: true })
  laptopContainer!: ElementRef<HTMLElement>;

  @ViewChildren('appslide', { read: ElementRef })
  slides!: QueryList<ElementRef<HTMLElement>>;

  @Output() ProjectsComponentEmit = new EventEmitter<{
    projectContainer: ElementRef<HTMLElement>;
    laptop: ElementRef<HTMLElement>;
    slides: QueryList<ElementRef<HTMLElement>>;
  }>();

  constructor(private modelService: Model3dService) {}

  ngOnInit(): void {
    this.modelService.initializeModel(
      this.laptopContainer
    );
    this.modelService.assignCanvasId(this.laptopContainer.nativeElement);
  }

  ngAfterViewInit(): void {
    this.ProjectsComponentEmit.emit({
      projectContainer: this.projectContainer,
      laptop: this.laptopContainer,
      slides: this.slides,
    });
  }
}
