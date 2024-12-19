import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlFullScreenComponent } from './fullscreen.component';
import { MapComponent } from '../map.component';
import { FullScreen } from 'ol/control';

describe('ControlFullScreenComponent', () => {
  let component: ControlFullScreenComponent;
  let fixture: ComponentFixture<ControlFullScreenComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy('addControl'),
        removeControl: jasmine.createSpy('removeControl')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [ControlFullScreenComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlFullScreenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create fullscreen control', () => {
    fixture.detectChanges();
    expect(component.instance instanceof FullScreen).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalledWith(component.instance);
  });

  it('should handle className option', () => {
    component.className = 'custom-class';
    fixture.detectChanges();
    expect(component.instance instanceof FullScreen).toBeTruthy();
  });

  it('should handle label options', () => {
    component.label = 'Full';
    component.labelActive = 'Exit';
    fixture.detectChanges();
    expect(component.instance instanceof FullScreen).toBeTruthy();
  });

  it('should remove control on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalledWith(component.instance);
  });
});