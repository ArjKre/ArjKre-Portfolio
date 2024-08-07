import { Component, Input, OnInit } from '@angular/core';
import { Content } from '../service/content';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  @Input() _contentList!: Content;

  constructor() { }

  ngOnInit(): void {
    
  }

}
