import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceClusterComponent } from './cluster.component';
import { LayerVectorComponent } from '../layers/layervector.component';
import { Cluster, Vector } from 'ol/source';

describe('SourceClusterComponent', () => {
  let component: SourceClusterComponent;
  let fixture: ComponentFixture<SourceClusterComponent>;
  let mockLayerComponent: Partial<LayerVectorComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [SourceClusterComponent],
      providers: [{ provide: LayerVectorComponent, useValue: mockLayerComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceClusterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create cluster source instance', () => {
    component.source = new Vector();
    fixture.detectChanges();
    expect(component.instance instanceof Cluster).toBeTruthy();
  });

  it('should handle distance option', () => {
    component.source = new Vector();
    component.distance = 50;
    fixture.detectChanges();
    expect(component.instance instanceof Cluster).toBeTruthy();
  });

  it('should handle geometryFunction option', () => {
    component.source = new Vector();
    component.geometryFunction = (feature) => (feature as any).getGeometry();
    fixture.detectChanges();
    expect(component.instance instanceof Cluster).toBeTruthy();
  });

  it('should handle wrapX option', () => {
    component.source = new Vector();
    component.wrapX = true;
    fixture.detectChanges();
    expect(component.instance instanceof Cluster).toBeTruthy();
  });

  it('should update distance when changed', () => {
    component.source = new Vector();
    fixture.detectChanges();

    const setDistanceSpy = spyOn(component.instance, 'setDistance');
    component.ngOnChanges({
      distance: {
        currentValue: 100,
        previousValue: 50,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(setDistanceSpy).toHaveBeenCalledWith(100);
  });
});
