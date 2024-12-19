import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerVectorTileComponent } from './layervectortile.component';
import { MapComponent } from '../map.component';
import { VectorTile } from 'ol/layer';
import { Collection } from 'ol';
import { Style } from 'ol/style';

describe('LayerVectorTileComponent', () => {
  let component: LayerVectorTileComponent;
  let fixture: ComponentFixture<LayerVectorTileComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        getLayers: () => new Collection(),
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [LayerVectorTileComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerVectorTileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create vector tile layer instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });

  it('should handle renderBuffer option', () => {
    component.renderBuffer = 100;
    fixture.detectChanges();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });

  it('should handle renderMode option', () => {
    component.renderMode = 'vector';
    fixture.detectChanges();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });

  it('should handle style option', () => {
    const style = new Style();
    component.style = style;
    fixture.detectChanges();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });

  it('should handle updateWhileAnimating option', () => {
    component.updateWhileAnimating = true;
    fixture.detectChanges();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });

  it('should handle updateWhileInteracting option', () => {
    component.updateWhileInteracting = true;
    fixture.detectChanges();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });

  it('should handle visible option', () => {
    component.visible = false;
    fixture.detectChanges();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });
});