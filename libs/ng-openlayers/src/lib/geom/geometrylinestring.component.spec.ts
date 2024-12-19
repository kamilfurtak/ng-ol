import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeometryLinestringComponent } from './geometrylinestring.component';
import { MapComponent } from '../map.component';
import { FeatureComponent } from '../feature.component';
import { LineString } from 'ol/geom';

describe('GeometryLinestringComponent', () => {
  let component: GeometryLinestringComponent;
  let fixture: ComponentFixture<GeometryLinestringComponent>;
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
      imports: [GeometryLinestringComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent },
        { provide: FeatureComponent, useValue: mockFeatureComponent },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometryLinestringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('geometry-linestring');
  });

  it('should create LineString geometry', () => {
    expect(component.instance instanceof LineString).toBeTruthy();
  });

  it('should initialize with default coordinates', () => {
    const coords = component.instance.getCoordinates();
    expect(coords).toEqual([
      [0, 0],
      [1, 1],
    ]);
  });
});
