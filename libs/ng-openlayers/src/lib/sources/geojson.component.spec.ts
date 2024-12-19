import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceGeoJSONComponent } from './geojson.component';
import { LayerVectorComponent } from '../layers/layervector.component';
import { Vector } from 'ol/source';
import { GeoJSON } from 'ol/format';

describe('SourceGeoJSONComponent', () => {
  let component: SourceGeoJSONComponent;
  let fixture: ComponentFixture<SourceGeoJSONComponent>;
  let mockLayerComponent: Partial<LayerVectorComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [SourceGeoJSONComponent],
      providers: [
        { provide: LayerVectorComponent, useValue: mockLayerComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceGeoJSONComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create GeoJSON source instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
    expect(component.format instanceof GeoJSON).toBeTruthy();
  });

  it('should handle url option', () => {
    component.url = 'https://example.com/features.geojson';
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle defaultDataProjection option', () => {
    component.defaultDataProjection = 'EPSG:4326';
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle featureProjection option', () => {
    component.featureProjection = 'EPSG:3857';
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle geometryName option', () => {
    component.geometryName = 'the_geom';
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });
});