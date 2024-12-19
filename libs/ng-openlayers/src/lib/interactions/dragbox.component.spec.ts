import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragBoxInteractionComponent } from './dragbox.component';
import { MapComponent } from '../map.component';
import { DragBox } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';

describe('DragBoxInteractionComponent', () => {
  let component: DragBoxInteractionComponent;
  let fixture: ComponentFixture<DragBoxInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy(),
        removeInteraction: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [DragBoxInteractionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragBoxInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create drag box interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof DragBox).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle className option', () => {
    component.className = 'custom-dragbox';
    fixture.detectChanges();
    expect(component.instance instanceof DragBox).toBeTruthy();
  });

  it('should handle condition option', () => {
    component.condition = platformModifierKeyOnly;
    fixture.detectChanges();
    expect(component.instance instanceof DragBox).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});
