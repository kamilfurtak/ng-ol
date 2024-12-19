import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlZoomSliderComponent } from './zoomslider.component';
import { MapComponent } from '../map.component';
import { ZoomSlider } from 'ol/control';

describe('ControlZoomSliderComponent', () => {
  let component: ControlZoomSliderComponent;
  let fixture: ComponentFixture<ControlZoomSliderComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy(),
        removeControl: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [ControlZoomSliderComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlZoomSliderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create zoom slider control', () => {
    fixture.detectChanges();
    expect(component.instance instanceof ZoomSlider).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalledWith(component.instance);
  });

  it('should handle className option', () => {
    component.className = 'custom-slider';
    fixture.detectChanges();
    expect(component.instance instanceof ZoomSlider).toBeTruthy();
  });

  it('should handle duration option', () => {
    component.duration = 200;
    fixture.detectChanges();
    expect(component.instance instanceof ZoomSlider).toBeTruthy();
  });

  it('should handle resolution options', () => {
    component.maxResolution = 100;
    component.minResolution = 1;
    fixture.detectChanges();
    expect(component.instance instanceof ZoomSlider).toBeTruthy();
  });

  it('should remove control on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalledWith(component.instance);
  });
});
