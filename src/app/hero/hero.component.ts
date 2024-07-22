import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
  <h1>hero works!</h1>
  <canvas></canvas>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
