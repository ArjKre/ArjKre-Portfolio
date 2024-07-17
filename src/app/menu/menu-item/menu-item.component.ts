import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  template: `
  <span class="menu-item-name">
    {{itemName.toUpperCase()}}
  </span>
  `,
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() itemName! : string;

  constructor() { }

  ngOnInit(): void {
  }

}
