import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContentService } from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @ViewChild('laptop',{static:true}) laptopContainer! : ElementRef<HTMLElement>;


  constructor(private service : ContentService) { }
  ngOnInit(): void {
    this.service.initializeModel(this.laptopContainer);
  }

}
