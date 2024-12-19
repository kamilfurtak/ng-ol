import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyboardZoomInteractionComponent } from './keyboardzoom.component';
import { MapComponent } from '../map.component';
import { KeyboardZoom } from 'ol/interaction';

describe('KeyboardZoomInteractionComponent', () => {
  let component: KeyboardZoomInteractionComponent;
  let fixture: ComponentFixture<KeyboardZoomInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [KeyboardZoomInteractionComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardZoomInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create keyboard zoom interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof KeyboardZoom).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle duration option', () => {
    component.duration = 250;
    fixture.detectChanges();
    expect(component.instance instanceof KeyboardZoom).toBeTruthy();
  });

  it('should handle delta option', () => {
    component.delta = 1;
    fixture.detectChanges();
    expect(component.instance instanceof KeyboardZoom).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});