import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { LaptopModelService } from './service/laptop-model.service';
import { Content, contentList } from './service/content';
import { PhoneModelService } from './service/phone-model.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnChanges{
  content: Content[] = contentList;

  @ViewChild('projectsContainer', { static: true })
  projectContainer!: ElementRef<HTMLElement>;

  @ViewChild('laptop', { static: true })
  laptopContainer!: ElementRef<HTMLElement>;

  @ViewChild('laptopScreen', { static: true })
  laptopScreenContainer!: ElementRef<HTMLElement>;

  @ViewChild('phone', { static: true })
  phoneContainer!: ElementRef<HTMLElement>;

  @ViewChildren('appslide', { read: ElementRef })
  contentSlides!: QueryList<ElementRef<HTMLElement>>;

  @ViewChild('footerholder', { static: true })
  holder!: ElementRef<HTMLElement>;

  @Input() footerElement!: number;

  @Output() ProjectsComponentEmit = new EventEmitter<{
    projectContainer: ElementRef<HTMLElement>;
    laptop: ElementRef<HTMLElement>;
    phone: ElementRef<HTMLElement>;
    slides: QueryList<ElementRef<HTMLElement>>;
  }>();

  constructor(private LaptopService: LaptopModelService,private phoneService: PhoneModelService) {}

  ngOnInit(): void {
    this.LaptopService.initializeModel(
      this.laptopContainer,
      this.laptopScreenContainer
    );
    this.LaptopService.assignCanvasId(
      this.laptopContainer.nativeElement,
      'laptop-canvas'
    );

    this.phoneService.initializeModel(this.phoneContainer);
    this.phoneService.assignCanvasId(this.phoneContainer.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['footerElement']) {
      this.holder.nativeElement.style.height = `${this.footerElement}px`;
    }
  }

  ngAfterViewInit(): void {
    this.ProjectsComponentEmit.emit({
      projectContainer: this.projectContainer,
      laptop: this.laptopContainer,
      phone: this.phoneContainer,
      slides: this.contentSlides,
    });

  }
}
