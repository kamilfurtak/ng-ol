import { SimpleGeometryComponent } from './simplegeometry.component';
import { MapComponent } from '../map.component';
import { FeatureComponent } from '../feature.component';
import SimpleGeometry from 'ol/geom/SimpleGeometry';

class TestGeometryComponent extends SimpleGeometryComponent {
  constructor(map: MapComponent, host: FeatureComponent) {
    super(map, host);
    this.instance = new SimpleGeometry();
  }
}

describe('SimpleGeometryComponent', () => {
  let component: TestGeometryComponent;
  let mockMapComponent: Partial<MapComponent>;
  let mockFeatureComponent: Partial<FeatureComponent>;

  beforeEach(() => {
    mockMapComponent = {
      instance: {} as any
    };

    mockFeatureComponent = {
      instance: {
        setGeometry: jasmine.createSpy('setGeometry')
      } as any
    };

    component = new TestGeometryComponent(
      mockMapComponent as MapComponent,
      mockFeatureComponent as FeatureComponent
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('simple-geometry');
  });

  it('should set geometry on feature when initialized', () => {
    component.ngOnInit();
    expect(mockFeatureComponent.instance.setGeometry).toHaveBeenCalledWith(component.instance);
  });
});