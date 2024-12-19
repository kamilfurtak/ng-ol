import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoordinateComponent } from './coordinate.component';
import { MapComponent } from './map.component';
import { ViewComponent } from './view.component';

describe('CoordinateComponent', () => {
  let component: CoordinateComponent;
  let fixture: ComponentFixture<CoordinateComponent>;
  let mockMapComponent: Partial<MapComponent>;
  let mockViewComponent: Partial<ViewComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        on: jasmine.createSpy(),
        getView: () => ({
          getProjection: () => ({
            getCode: () => 'EPSG:3857',
          }),
        }),
      } as any,
    };

    mockViewComponent = {
      instance: {
        setCenter: jasmine.createSpy(),
      } as any,
      componentType: 'view',
    };

    await TestBed.configureTestingModule({
      imports: [CoordinateComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent },
        { provide: ViewComponent, useValue: mockViewComponent },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default SRID', () => {
    expect(component.srid).toBe('EPSG:3857');
  });

  it('should transform coordinates on init', () => {
    component.x = 0;
    component.y = 0;
    fixture.detectChanges();

    expect(mockViewComponent.instance.setCenter).toHaveBeenCalled();
  });

  it('should transform coordinates when changed', () => {
    component.ngOnChanges({
      x: {
        currentValue: 10,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false,
      },
      y: {
        currentValue: 20,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(mockViewComponent.instance.setCenter).toHaveBeenCalled();
  });

  it('should handle map view changes', () => {
    const mockEvent = {
      target: {
        get: (key: string) => ({
          getProjection: () => ({
            getCode: () => 'EPSG:4326',
          }),
        }),
      },
      key: 'view',
    };

    component['onMapViewChanged'](mockEvent);
    expect(mockViewComponent.instance.setCenter).toHaveBeenCalled();
  });
});
