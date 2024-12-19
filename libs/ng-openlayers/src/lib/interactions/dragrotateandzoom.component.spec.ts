import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragRotateAndZoomInteractionComponent } from './dragrotateandzoom.component';
import { MapComponent } from '../map.component';
import { DragRotateAndZoom } from 'ol/interaction';
import { shiftKeyOnly } from 'ol/events/condition';

describe('DragRotateAndZoomInteractionComponent', () => {
  let component: DragRotateAndZoomInteractionComponent;
  let fixture: ComponentFixture<DragRotateAndZoomInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [DragRotateAndZoomInteractionComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragRotateAndZoomInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create drag rotate and zoom interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof DragRotateAndZoom).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle condition option', () => {
    component.condition = shiftKeyOnly;
    fixture.detectChanges();
    expect(component.instance instanceof DragRotateAndZoom).toBeTruthy();
  });

  it('should handle duration option', () => {
    component.duration = 250;
    fixture.detectChanges();
    expect(component.instance instanceof DragRotateAndZoom).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});