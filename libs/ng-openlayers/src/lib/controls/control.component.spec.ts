import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlComponent } from './control.component';
import { MapComponent } from '../map.component';
import { ContentComponent } from '../content.component';
import { Control } from 'ol/control';

describe('ControlComponent', () => {
  let component: ControlComponent;
  let fixture: ComponentFixture<ControlComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy('addControl'),
        removeControl: jasmine.createSpy('removeControl')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [ControlComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('control');
  });

  it('should not create control without content', () => {
    fixture.detectChanges();
    expect(component.instance).toBeUndefined();
  });

  it('should create control with content', () => {
    const mockContent = {
      elementRef: {
        nativeElement: document.createElement('div')
      }
    } as ContentComponent;
    
    component.content = mockContent;
    fixture.detectChanges();
    
    expect(component.instance instanceof Control).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalledWith(component.instance);
  });

  it('should remove control on destroy', () => {
    const mockContent = {
      elementRef: {
        nativeElement: document.createElement('div')
      }
    } as ContentComponent;
    
    component.content = mockContent;
    fixture.detectChanges();
    
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalledWith(component.instance);
  });
});