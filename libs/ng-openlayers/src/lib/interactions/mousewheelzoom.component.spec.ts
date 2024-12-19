import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MouseWheelZoomInteractionComponent } from './mousewheelzoom.component';
import { MapComponent } from '../map.component';
import { MouseWheelZoom } from 'ol/interaction';

describe('MouseWheelZoomInteractionComponent', () => {
  let component: MouseWheelZoomInteractionComponent;
  let fixture: ComponentFixture<MouseWheelZoomInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [MouseWheelZoomInteractionComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MouseWheelZoomInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create mouse wheel zoom interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof MouseWheelZoom).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle duration option', () => {
    component.duration = 250;
    fixture.detectChanges();
    expect(component.instance instanceof MouseWheelZoom).toBeTruthy();
  });

  it('should handle timeout option', () => {
    component.timeout = 80;
    fixture.detectChanges();
    expect(component.instance instanceof MouseWheelZoom).toBeTruthy();
  });

  it('should handle useAnchor option', () => {
    component.useAnchor = true;
    fixture.detectChanges();
    expect(component.instance instanceof MouseWheelZoom).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});