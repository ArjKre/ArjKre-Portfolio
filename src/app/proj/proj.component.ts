import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../menu/menu-item/menu-item';

@Component({
  selector: 'app-proj',
  template: `
    <div class="proj-ctr">
      <div class="flx">
        <div class="proj-txt">
          <div class="heading">
            <h2>{{ currentItem.heading }}</h2>
          </div>
          <div class="sub-heading">
            <h3>{{ currentItem.subheading }}</h3>
          </div>
          <div class="para">
            <p>{{ currentItem.para }}</p>
          </div>
          <div class="pltflang">
            <ng-container *ngFor="let lang of currentItem.pltf; let i = index">
              <div class="poof">
                <a [ngClass]="'lang-' + i">
                  {{ lang }}
                </a>
              </div>
            </ng-container>
          </div>
        </div>
        <div class="grph"></div>
      </div>
    </div>
  `,
  styleUrls: ['./proj.component.scss'],
})
export class ProjComponent implements OnInit {
  @Input() currentItem!: MenuItem;

  constructor() {}

  ngOnInit(): void {}
}
