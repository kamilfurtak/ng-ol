import { SourceComponent } from './source.component';
import { LayerComponent } from '../layers/layer.component';
import Source from 'ol/source/Source';

class TestSourceComponent extends SourceComponent {
  constructor(host: LayerComponent) {
    super(host);
  }
}

describe('SourceComponent', () => {
  let component: TestSourceComponent;
  let mockLayerComponent: Partial<LayerComponent>;

  beforeEach(() => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource'),
      } as any,
    };

    component = new TestSourceComponent(mockLayerComponent as LayerComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('source');
  });

  it('should clean up on destroy', () => {
    component.ngOnDestroy();
    expect(mockLayerComponent.instance.setSource).toHaveBeenCalledWith(null);
  });

  it('should register source with layer', () => {
    const source = new Source({});
    component['register'](source);
    expect(mockLayerComponent.instance.setSource).toHaveBeenCalledWith(source);
  });
});
