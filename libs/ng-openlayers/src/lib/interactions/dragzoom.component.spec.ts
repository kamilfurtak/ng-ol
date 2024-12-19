import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragZoomInteractionComponent } from './dragzoom.component';
import { MapComponent } from '../map.component';
import { DragZoom } from 'ol/interaction';
import { shiftKeyOnly } from 'ol/events/condition';

describe('DragZoomInteractionComponent', () => {
  let component: DragZoomInteractionComponent;
  let fixture: ComponentFixture<DragZoomInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy(),
        removeInteraction: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [DragZoomInteractionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragZoomInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create drag zoom interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof DragZoom).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle className option', () => {
    component.className = 'custom-dragzoom';
    fixture.detectChanges();
    expect(component.instance instanceof DragZoom).toBeTruthy();
  });

  it('should handle condition option', () => {
    component.condition = shiftKeyOnly;
    fixture.detectChanges();
    expect(component.instance instanceof DragZoom).toBeTruthy();
  });

  it('should handle duration option', () => {
    component.duration = 200;
    fixture.detectChanges();
    expect(component.instance instanceof DragZoom).toBeTruthy();
  });

  it('should handle out option', () => {
    component.out = true;
    fixture.detectChanges();
    expect(component.instance instanceof DragZoom).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});
