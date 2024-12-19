import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerVectorComponent } from './layervector.component';
import { MapComponent } from '../map.component';
import { Vector } from 'ol/layer';
import { Collection } from 'ol';
import { Style } from 'ol/style';

describe('LayerVectorComponent', () => {
  let component: LayerVectorComponent;
  let fixture: ComponentFixture<LayerVectorComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        getLayers: () => new Collection(),
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [LayerVectorComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerVectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create vector layer instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle renderBuffer option', () => {
    component.renderBuffer = 100;
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle style option', () => {
    const style = new Style();
    component.style = style;
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle updateWhileAnimating option', () => {
    component.updateWhileAnimating = true;
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle updateWhileInteracting option', () => {
    component.updateWhileInteracting = true;
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });
});