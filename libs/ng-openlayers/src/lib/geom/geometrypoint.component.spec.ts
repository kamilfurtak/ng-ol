import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeometryPointComponent } from './geometrypoint.component';
import { MapComponent } from '../map.component';
import { FeatureComponent } from '../feature.component';
import { Point } from 'ol/geom';

describe('GeometryPointComponent', () => {
  let component: GeometryPointComponent;
  let fixture: ComponentFixture<GeometryPointComponent>;
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
      imports: [GeometryPointComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent },
        { provide: FeatureComponent, useValue: mockFeatureComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometryPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('geometry-point');
  });

  it('should create Point geometry', () => {
    expect(component.instance instanceof Point).toBeTruthy();
  });

  it('should initialize with default coordinates', () => {
    const coords = component.instance.getCoordinates();
    expect(coords).toEqual([0, 0]);
  });

  it('should set geometry on feature', () => {
    expect(mockFeatureComponent.instance.setGeometry).toHaveBeenCalledWith(component.instance);
  });
});