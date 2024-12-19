import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlScaleLineComponent } from './scaleline.component';
import { MapComponent } from '../map.component';
import { ScaleLine } from 'ol/control';

describe('ControlScaleLineComponent', () => {
  let component: ControlScaleLineComponent;
  let fixture: ComponentFixture<ControlScaleLineComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy(),
        removeControl: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [ControlScaleLineComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlScaleLineComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create scale line control', () => {
    fixture.detectChanges();
    expect(component.instance instanceof ScaleLine).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalledWith(component.instance);
  });

  it('should handle units option', () => {
    component.units = 'metric';
    fixture.detectChanges();
    expect(component.instance instanceof ScaleLine).toBeTruthy();
  });

  it('should remove control on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalledWith(component.instance);
  });
});
