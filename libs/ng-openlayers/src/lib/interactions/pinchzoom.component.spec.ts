import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PinchZoomInteractionComponent } from './pinchzoom.component';
import { MapComponent } from '../map.component';
import { PinchZoom } from 'ol/interaction';

describe('PinchZoomInteractionComponent', () => {
  let component: PinchZoomInteractionComponent;
  let fixture: ComponentFixture<PinchZoomInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy(),
        removeInteraction: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [PinchZoomInteractionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinchZoomInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create pinch zoom interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof PinchZoom).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle duration option', () => {
    component.duration = 250;
    fixture.detectChanges();
    expect(component.instance instanceof PinchZoom).toBeTruthy();
  });

  it('should handle constrainResolution option', () => {
    component.constrainResolution = true;
    fixture.detectChanges();
    expect(component.instance instanceof PinchZoom).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});
