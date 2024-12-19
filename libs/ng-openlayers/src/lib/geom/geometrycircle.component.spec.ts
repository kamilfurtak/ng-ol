import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeometryCircleComponent } from './geometrycircle.component';
import { MapComponent } from '../map.component';
import { FeatureComponent } from '../feature.component';
import { Circle } from 'ol/geom';

describe('GeometryCircleComponent', () => {
  let component: GeometryCircleComponent;
  let fixture: ComponentFixture<GeometryCircleComponent>;
  let mockMapComponent: Partial<MapComponent>;
  let mockFeatureComponent: Partial<FeatureComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {} as any,
    };

    mockFeatureComponent = {
      instance: {
        setGeometry: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [GeometryCircleComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent },
        { provide: FeatureComponent, useValue: mockFeatureComponent },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometryCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('geometry-circle');
  });

  it('should create Circle geometry', () => {
    expect(component.instance instanceof Circle).toBeTruthy();
  });

  it('should handle radius changes', () => {
    const newRadius = 100;
    component.radius = newRadius;
    expect(component.radius).toBe(newRadius);
  });

  it('should initialize with default center coordinates', () => {
    const center = component.instance.getCenter();
    expect(center).toEqual([0, 0]);
  });
});
