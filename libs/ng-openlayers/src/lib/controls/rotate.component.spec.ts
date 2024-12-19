import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlRotateComponent } from './rotate.component';
import { MapComponent } from '../map.component';
import { Rotate } from 'ol/control';

describe('ControlRotateComponent', () => {
  let component: ControlRotateComponent;
  let fixture: ComponentFixture<ControlRotateComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy(),
        removeControl: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [ControlRotateComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlRotateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create rotate control', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Rotate).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalledWith(component.instance);
  });

  it('should handle className option', () => {
    component.className = 'custom-rotate';
    fixture.detectChanges();
    expect(component.instance instanceof Rotate).toBeTruthy();
  });

  it('should handle label options', () => {
    component.label = '⟳';
    component.tipLabel = 'Reset rotation';
    fixture.detectChanges();
    expect(component.instance instanceof Rotate).toBeTruthy();
  });

  it('should remove control on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalledWith(component.instance);
  });
});
