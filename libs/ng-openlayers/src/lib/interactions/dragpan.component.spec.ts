import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragPanInteractionComponent } from './dragpan.component';
import { MapComponent } from '../map.component';
import { DragPan } from 'ol/interaction';
import { mouseOnly } from 'ol/events/condition';
import Kinetic from 'ol/Kinetic';

describe('DragPanInteractionComponent', () => {
  let component: DragPanInteractionComponent;
  let fixture: ComponentFixture<DragPanInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy(),
        removeInteraction: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [DragPanInteractionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragPanInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create drag pan interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof DragPan).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle condition option', () => {
    component.condition = mouseOnly;
    fixture.detectChanges();
    expect(component.instance instanceof DragPan).toBeTruthy();
  });

  it('should handle kinetic option', () => {
    component.kinetic = new Kinetic(-0.005, 0.05, 100);
    fixture.detectChanges();
    expect(component.instance instanceof DragPan).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});
