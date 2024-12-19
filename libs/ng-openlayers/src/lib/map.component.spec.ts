import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { Map } from 'ol';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create ol.Map instance', () => {
    expect(component.instance instanceof Map).toBeTruthy();
  });

  it('should set default controls', () => {
    expect(component.controls).toEqual([]);
  });

  it('should set default interactions', () => {
    expect(component.interactions).toEqual([]);
  });

  it('should set default width and height', () => {
    expect(component.width).toBe('100%');
    expect(component.height).toBe('100%');
  });

  it('should update properties when inputs change', () => {
    const newWidth = '500px';
    component.width = newWidth;
    fixture.detectChanges();

    expect(component.width).toBe(newWidth);
  });

  it('should emit click events', () => {
    const spy = spyOn(component.olClick, 'emit');
    const mockEvent = { type: 'click' } as any;

    component.instance.dispatchEvent(mockEvent);

    expect(spy).toHaveBeenCalledWith(mockEvent);
  });
});
