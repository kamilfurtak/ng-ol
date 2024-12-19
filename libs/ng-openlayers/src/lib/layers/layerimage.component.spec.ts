import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerImageComponent } from './layerimage.component';
import { MapComponent } from '../map.component';
import { Image } from 'ol/layer';
import { Collection } from 'ol';

describe('LayerImageComponent', () => {
  let component: LayerImageComponent;
  let fixture: ComponentFixture<LayerImageComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        getLayers: () => new Collection(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [LayerImageComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerImageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create image layer instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Image).toBeTruthy();
  });

  it('should handle opacity option', () => {
    component.opacity = 0.5;
    fixture.detectChanges();
    expect(component.instance instanceof Image).toBeTruthy();
  });

  it('should handle visible option', () => {
    component.visible = false;
    fixture.detectChanges();
    expect(component.instance instanceof Image).toBeTruthy();
  });

  it('should handle extent option', () => {
    component.extent = [-180, -90, 180, 90];
    fixture.detectChanges();
    expect(component.instance instanceof Image).toBeTruthy();
  });

  it('should handle minResolution option', () => {
    component.minResolution = 0;
    fixture.detectChanges();
    expect(component.instance instanceof Image).toBeTruthy();
  });

  it('should handle maxResolution option', () => {
    component.maxResolution = 100;
    fixture.detectChanges();
    expect(component.instance instanceof Image).toBeTruthy();
  });

  it('should handle zIndex option', () => {
    component.zIndex = 1;
    fixture.detectChanges();
    expect(component.instance instanceof Image).toBeTruthy();
  });
});
