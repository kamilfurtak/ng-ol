import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlAttributionComponent } from './attribution.component';
import { MapComponent } from '../map.component';
import { Attribution } from 'ol/control';

describe('ControlAttributionComponent', () => {
  let component: ControlAttributionComponent;
  let fixture: ComponentFixture<ControlAttributionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy(),
        removeControl: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [ControlAttributionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAttributionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('control');
  });

  it('should create attribution control', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Attribution).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalledWith(component.instance);
  });

  it('should handle collapsible option', () => {
    component.collapsible = true;
    fixture.detectChanges();
    expect(component.instance instanceof Attribution).toBeTruthy();
  });

  it('should remove control on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalledWith(component.instance);
  });
});
