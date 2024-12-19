import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoubleClickZoomInteractionComponent } from './doubleclickzoom.component';
import { MapComponent } from '../map.component';
import { DoubleClickZoom } from 'ol/interaction';

describe('DoubleClickZoomInteractionComponent', () => {
  let component: DoubleClickZoomInteractionComponent;
  let fixture: ComponentFixture<DoubleClickZoomInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [DoubleClickZoomInteractionComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleClickZoomInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create double click zoom interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof DoubleClickZoom).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle duration option', () => {
    component.duration = 250;
    fixture.detectChanges();
    expect(component.instance instanceof DoubleClickZoom).toBeTruthy();
  });

  it('should handle delta option', () => {
    component.delta = 1;
    fixture.detectChanges();
    expect(component.instance instanceof DoubleClickZoom).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});