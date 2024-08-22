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
import { Phone3dService } from './service/phone3d.service';

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

  @ViewChild('phone', { static: true })
  phoneContainer!: ElementRef<HTMLElement>;

  @ViewChildren('appslide', { read: ElementRef })
  slides!: QueryList<ElementRef<HTMLElement>>;

  @Output() ProjectsComponentEmit = new EventEmitter<{
    projectContainer: ElementRef<HTMLElement>;
    laptop: ElementRef<HTMLElement>;
    phone: ElementRef<HTMLElement>;
    slides: QueryList<ElementRef<HTMLElement>>;
  }>();

  constructor(private LaptopService: Model3dService,private phoneService: Phone3dService) {}

  ngOnInit(): void {
    this.LaptopService.initializeModel(this.laptopContainer);
    this.LaptopService.assignCanvasId(this.laptopContainer.nativeElement);

    this.phoneService.initializeModel(this.phoneContainer);

  }

  ngAfterViewInit(): void {
    this.ProjectsComponentEmit.emit({
      projectContainer: this.projectContainer,
      laptop: this.laptopContainer,
      phone: this.phoneContainer,
      slides: this.slides,
    });
  }
}
