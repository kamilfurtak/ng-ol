import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectInteractionComponent } from './select.component';
import { MapComponent } from '../map.component';
import { Select } from 'ol/interaction';
import { click } from 'ol/events/condition';
import { Style } from 'ol/style';

describe('SelectInteractionComponent', () => {
  let component: SelectInteractionComponent;
  let fixture: ComponentFixture<SelectInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [SelectInteractionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create select interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Select).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle condition option', () => {
    component.condition = click;
    fixture.detectChanges();
    expect(component.instance instanceof Select).toBeTruthy();
  });

  it('should handle style option', () => {
    const style = new Style();
    component.style = style;
    fixture.detectChanges();
    expect(component.instance instanceof Select).toBeTruthy();
  });

  it('should handle multi option', () => {
    component.multi = true;
    fixture.detectChanges();
    expect(component.instance instanceof Select).toBeTruthy();
  });

  it('should emit select events', () => {
    const selectSpy = spyOn(component.olSelect, 'emit');
    fixture.detectChanges();

    const mockEvent = { type: 'select' } as any;
    component.instance.dispatchEvent(mockEvent);

    expect(selectSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});
