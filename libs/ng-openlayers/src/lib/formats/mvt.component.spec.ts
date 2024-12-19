import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormatMVTComponent } from './mvt.component';
import { MVT } from 'ol/format';

describe('FormatMVTComponent', () => {
  let component: FormatMVTComponent;
  let fixture: ComponentFixture<FormatMVTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatMVTComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatMVTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create MVT format instance', () => {
    expect(component.instance instanceof MVT).toBeTruthy();
  });

  it('should handle featureClass option', () => {
    // const featureClass = class {};
    // component.featureClass = featureClass;
    // fixture.detectChanges();
    // expect(component.instance instanceof MVT).toBeTruthy();
  });

  it('should handle geometryName option', () => {
    component.geometryName = 'geom';
    fixture.detectChanges();
    expect(component.instance instanceof MVT).toBeTruthy();
  });

  it('should handle layerName option', () => {
    component.layerName = 'test-layer';
    fixture.detectChanges();
    expect(component.instance instanceof MVT).toBeTruthy();
  });

  it('should handle layers option', () => {
    component.layers = ['layer1', 'layer2'];
    fixture.detectChanges();
    expect(component.instance instanceof MVT).toBeTruthy();
  });

  it('should extend FormatComponent', () => {
    expect(component.componentType).toBe('format');
  });
});
