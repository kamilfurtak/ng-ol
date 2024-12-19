import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeometryMultiLinestringComponent } from './geometrymultilinestring.component';
import { MapComponent } from '../map.component';
import { FeatureComponent } from '../feature.component';
import { MultiLineString } from 'ol/geom';

describe('GeometryMultiLinestringComponent', () => {
  let component: GeometryMultiLinestringComponent;
  let fixture: ComponentFixture<GeometryMultiLinestringComponent>;
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
      imports: [GeometryMultiLinestringComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent },
        { provide: FeatureComponent, useValue: mockFeatureComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometryMultiLinestringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('geometry-multilinestring');
  });

  it('should create MultiLineString geometry', () => {
    expect(component.instance instanceof MultiLineString).toBeTruthy();
  });

  it('should initialize with default coordinates', () => {
    const coords = component.instance.getCoordinates();
    expect(coords).toEqual([[[0, 0], [1, 1]]]);
  });

  it('should set geometry on feature', () => {
    expect(mockFeatureComponent.instance.setGeometry).toHaveBeenCalledWith(component.instance);
  });
});