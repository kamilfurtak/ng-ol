import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceVectorComponent } from './vector.component';
import { LayerVectorComponent } from '../layers/layervector.component';
import { Vector } from 'ol/source';
import Feature from 'ol/format/Feature';

describe('SourceVectorComponent', () => {
  let component: SourceVectorComponent;
  let fixture: ComponentFixture<SourceVectorComponent>;
  let mockLayerComponent: Partial<LayerVectorComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [SourceVectorComponent],
      providers: [
        { provide: LayerVectorComponent, useValue: mockLayerComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceVectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create vector source instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle overlaps option', () => {
    component.overlaps = false;
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle useSpatialIndex option', () => {
    component.useSpatialIndex = true;
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle wrapX option', () => {
    component.wrapX = true;
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle url option', () => {
    component.url = 'https://example.com/features.json';
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });

  it('should handle format option', () => {
    const format = new Feature();
    component.format = format;
    fixture.detectChanges();
    expect(component.instance instanceof Vector).toBeTruthy();
  });
});