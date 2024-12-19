import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragRotateInteractionComponent } from './dragrotate.component';
import { MapComponent } from '../map.component';
import { DragRotate } from 'ol/interaction';
import { altKeyOnly } from 'ol/events/condition';

describe('DragRotateInteractionComponent', () => {
  let component: DragRotateInteractionComponent;
  let fixture: ComponentFixture<DragRotateInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [DragRotateInteractionComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragRotateInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create drag rotate interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof DragRotate).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle condition option', () => {
    component.condition = altKeyOnly;
    fixture.detectChanges();
    expect(component.instance instanceof DragRotate).toBeTruthy();
  });

  it('should handle duration option', () => {
    component.duration = 250;
    fixture.detectChanges();
    expect(component.instance instanceof DragRotate).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});