import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlZoomToExtentComponent } from './zoomtoextent.component';
import { MapComponent } from '../map.component';
import { ZoomToExtent } from 'ol/control';

describe('ControlZoomToExtentComponent', () => {
  let component: ControlZoomToExtentComponent;
  let fixture: ComponentFixture<ControlZoomToExtentComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy(),
        removeControl: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [ControlZoomToExtentComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlZoomToExtentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create zoom to extent control', () => {
    fixture.detectChanges();
    expect(component.instance instanceof ZoomToExtent).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalledWith(component.instance);
  });

  it('should handle className option', () => {
    component.className = 'custom-extent';
    fixture.detectChanges();
    expect(component.instance instanceof ZoomToExtent).toBeTruthy();
  });

  it('should handle label options', () => {
    component.label = 'E';
    component.tipLabel = 'Fit to extent';
    fixture.detectChanges();
    expect(component.instance instanceof ZoomToExtent).toBeTruthy();
  });

  it('should handle extent option', () => {
    component.extent = [-180, -90, 180, 90];
    fixture.detectChanges();
    expect(component.instance instanceof ZoomToExtent).toBeTruthy();
  });

  it('should remove control on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalledWith(component.instance);
  });
});
