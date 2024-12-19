import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponent } from './view.component';
import { MapComponent } from './map.component';
import { View } from 'ol';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        setView: jasmine.createSpy('setView'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [ViewComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create ol.View instance', () => {
    expect(component.instance instanceof View).toBeTruthy();
  });

  it('should set view on map', () => {
    expect(mockMapComponent.instance.setView).toHaveBeenCalledWith(component.instance);
  });

  it('should update zoom level', () => {
    const newZoom = 10;
    component.zoom = newZoom;
    fixture.detectChanges();
    
    expect(component.instance.getZoom()).toBe(newZoom);
  });

  it('should update center', () => {
    const newCenter = [0, 0];
    component.center = newCenter;
    fixture.detectChanges();
    
    expect(component.instance.getCenter()).toEqual(newCenter);
  });
});