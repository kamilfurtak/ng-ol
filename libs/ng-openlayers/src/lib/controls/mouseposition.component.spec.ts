import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlMousePositionComponent } from './mouseposition.component';
import { MapComponent } from '../map.component';
import MousePosition from 'ol/control/MousePosition';

describe('ControlMousePositionComponent', () => {
  let component: ControlMousePositionComponent;
  let fixture: ComponentFixture<ControlMousePositionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy('addControl'),
        removeControl: jasmine.createSpy('removeControl')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [ControlMousePositionComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMousePositionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create mouse position control', () => {
    fixture.detectChanges();
    expect(component.instance instanceof MousePosition).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalledWith(component.instance);
  });

  it('should handle coordinate format option', () => {
    component.coordinateFormat = (coord) => coord.join(',');
    fixture.detectChanges();
    expect(component.instance instanceof MousePosition).toBeTruthy();
  });

  it('should handle projection option', () => {
    component.projection = 'EPSG:4326';
    fixture.detectChanges();
    expect(component.instance instanceof MousePosition).toBeTruthy();
  });

  it('should remove control on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalledWith(component.instance);
  });
});