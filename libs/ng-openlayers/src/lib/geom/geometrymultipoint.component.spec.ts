import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeometryMultiPointComponent } from './geometrymultipoint.component';
import { MapComponent } from '../map.component';
import { FeatureComponent } from '../feature.component';
import { MultiPoint } from 'ol/geom';

describe('GeometryMultiPointComponent', () => {
  let component: GeometryMultiPointComponent;
  let fixture: ComponentFixture<GeometryMultiPointComponent>;
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
      imports: [GeometryMultiPointComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent },
        { provide: FeatureComponent, useValue: mockFeatureComponent },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometryMultiPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('geometry-multipoint');
  });

  it('should create MultiPoint geometry', () => {
    expect(component.instance instanceof MultiPoint).toBeTruthy();
  });

  it('should initialize with default coordinates', () => {
    const coords = component.instance.getCoordinates();
    expect(coords).toEqual([
      [0, 0],
      [1, 1],
    ]);
  });
});
