import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayComponent } from './overlay.component';
import { MapComponent } from './map.component';
import { ContentComponent } from './content.component';
import { Overlay } from 'ol';

describe('OverlayComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addOverlay: jasmine.createSpy('addOverlay'),
        removeOverlay: jasmine.createSpy('removeOverlay')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [OverlayComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('overlay');
  });

  it('should create overlay with content', () => {
    const mockContent = {
      elementRef: {
        nativeElement: document.createElement('div')
      }
    } as ContentComponent;
    
    component.content = mockContent;
    fixture.detectChanges();
    
    expect(component.instance instanceof Overlay).toBeTruthy();
    expect(mockMapComponent.instance.addOverlay).toHaveBeenCalledWith(component.instance);
  });

  it('should not create overlay without content', () => {
    fixture.detectChanges();
    expect(component.instance).toBeUndefined();
  });

  it('should remove overlay on destroy', () => {
    const mockContent = {
      elementRef: {
        nativeElement: document.createElement('div')
      }
    } as ContentComponent;
    
    component.content = mockContent;
    fixture.detectChanges();
    
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeOverlay).toHaveBeenCalledWith(component.instance);
  });
});