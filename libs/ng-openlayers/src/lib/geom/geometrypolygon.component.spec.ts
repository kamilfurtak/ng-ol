import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeometryPolygonComponent } from './geometrypolygon.component';
import { MapComponent } from '../map.component';
import { FeatureComponent } from '../feature.component';
import { Polygon } from 'ol/geom';

describe('GeometryPolygonComponent', () => {
  let component: GeometryPolygonComponent;
  let fixture: ComponentFixture<GeometryPolygonComponent>;
  let mockMapComponent: Partial<MapComponent>;
  let mockFeatureComponent: Partial<FeatureComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {} as any
    };

    mockFeatureComponent = {
      instance: {
        setGeometry: jasmine.createSpy('setGeometry')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [GeometryPolygonComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent },
        { provide: FeatureComponent, useValue: mockFeatureComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometryPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('geometry-polygon');
  });

  it('should create Polygon geometry', () => {
    expect(component.instance instanceof Polygon).toBeTruthy();
  });

  it('should initialize with default coordinates', () => {
    const coords = component.instance.getCoordinates();
    expect(coords).toEqual([[[0, 0], [1, 1], [0, 1]]]);
  });

  it('should set geometry on feature', () => {
    expect(mockFeatureComponent.instance.setGeometry).toHaveBeenCalledWith(component.instance);
  });
});