import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlZoomComponent } from './zoom.component';
import { MapComponent } from '../map.component';
import { Zoom } from 'ol/control';

describe('ControlZoomComponent', () => {
  let component: ControlZoomComponent;
  let fixture: ComponentFixture<ControlZoomComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy(),
        removeControl: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [ControlZoomComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlZoomComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create zoom control', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Zoom).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalledWith(component.instance);
  });

  it('should handle duration option', () => {
    component.duration = 250;
    fixture.detectChanges();
    expect(component.instance instanceof Zoom).toBeTruthy();
  });

  it('should handle zoom labels', () => {
    component.zoomInLabel = '+';
    component.zoomOutLabel = '-';
    component.zoomInTipLabel = 'Zoom in';
    component.zoomOutTipLabel = 'Zoom out';
    fixture.detectChanges();
    expect(component.instance instanceof Zoom).toBeTruthy();
  });

  it('should remove control on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalledWith(component.instance);
  });
});
