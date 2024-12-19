import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyboardPanInteractionComponent } from './keyboardpan.component';
import { MapComponent } from '../map.component';
import { KeyboardPan } from 'ol/interaction';

describe('KeyboardPanInteractionComponent', () => {
  let component: KeyboardPanInteractionComponent;
  let fixture: ComponentFixture<KeyboardPanInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [KeyboardPanInteractionComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardPanInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create keyboard pan interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof KeyboardPan).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle duration option', () => {
    component.duration = 250;
    fixture.detectChanges();
    expect(component.instance instanceof KeyboardPan).toBeTruthy();
  });

  it('should handle pixelDelta option', () => {
    component.pixelDelta = 128;
    fixture.detectChanges();
    expect(component.instance instanceof KeyboardPan).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});