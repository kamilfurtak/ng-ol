import { Component, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { Fill } from 'ol/style';
import { StyleComponent } from './style.component';
import { StyleCircleComponent } from './circle.component';
import { StyleTextComponent } from './text.component';
import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';

@Component({
  selector: 'aol-style-fill',
  template: ` <div class="aol-style-fill"></div> `,
  standalone: true,
})
export class StyleFillComponent implements OnInit, OnChanges {
  @Input()
  color: Color | ColorLike;

  public instance: Fill;
  private readonly host: StyleComponent | StyleCircleComponent | StyleTextComponent;

  constructor(
    @Optional() styleHost: StyleComponent,
    @Optional() styleCircleHost: StyleCircleComponent,
    @Optional() styleTextHost: StyleTextComponent
  ) {
    if (!styleHost) {
      throw new Error('aol-style-stroke must be a descendant of aol-style');
    }
    if (styleTextHost) {
      this.host = styleTextHost;
    } else if (styleCircleHost) {
      this.host = styleCircleHost;
    } else {
      this.host = styleHost;
    }
    // console.log('creating aol-style-fill with: ', this);
  }

  ngOnInit() {
    // console.log('creating ol.style.Fill instance with: ', this);
    this.instance = new Fill(this);
    switch (this.host.componentType) {
      case 'style':
        this.host.instance.setFill(this.instance);
        // console.log('setting ol.style instance\'s fill:', this.host);
        break;
      case 'style-text':
        this.host.instance.setFill(this.instance);
        break;
      case 'style-circle':
        (this.host as StyleCircleComponent).fill = this.instance;
        // console.log('setting ol.style.circle instance\'s fill:', this.host);
        break;
      default:
        throw new Error('unknown host type: ' + this.host);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.instance) {
      return;
    }
    if (changes.color) {
      this.instance.setColor(changes.color.currentValue);
    }
    this.host.update();
    // console.log('changes detected in aol-style-fill, setting new color: ', changes);
  }
}
