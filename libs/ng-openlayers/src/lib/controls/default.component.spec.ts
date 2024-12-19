import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultControlComponent } from './default.component';
import { MapComponent } from '../map.component';
import { defaults } from 'ol/control';

describe('DefaultControlComponent', () => {
  let component: DefaultControlComponent;
  let fixture: ComponentFixture<DefaultControlComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy('addControl'),
        removeControl: jasmine.createSpy('removeControl')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [DefaultControlComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultControlComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create default controls', () => {
    fixture.detectChanges();
    expect(component.instance).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalled();
  });

  it('should remove controls on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalled();
  });

  it('should handle attribution option', () => {
    component.attribution = false;
    fixture.detectChanges();
    expect(component.instance).toBeTruthy();
  });

  it('should handle rotate option', () => {
    component.rotate = false;
    fixture.detectChanges();
    expect(component.instance).toBeTruthy();
  });

  it('should handle zoom option', () => {
    component.zoom = false;
    fixture.detectChanges();
    expect(component.instance).toBeTruthy();
  });
});