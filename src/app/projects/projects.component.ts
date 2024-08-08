import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Content, contentList } from './service/content';
import { Model3dService } from './service/model3d.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  currentContent!: Content;

  @ViewChild('projectsContainer', { static: true })
  projectContainer!: ElementRef<HTMLElement>;

  @ViewChild('laptop', { static: true })
  laptopContainer!: ElementRef<HTMLElement>;

  @Output() ProjectsComponentEmit = new EventEmitter<{
    parent: ElementRef<HTMLElement>;
    child: ElementRef<HTMLElement>;
  }>();

  constructor(private modelService: Model3dService) {}

  ngOnInit(): void {
    this.currentContent = contentList[0];

    this.ProjectsComponentEmit.emit({
      parent: this.projectContainer,
      child: this.laptopContainer,
    });

    this.modelService.initializeModel(this.projectContainer,this.laptopContainer,);
    this.modelService.assignCanvasId(this.laptopContainer.nativeElement);
    this.modelService.resizeModel(this.projectContainer.nativeElement);
    
  }
}
