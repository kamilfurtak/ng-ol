import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerComponent } from './layer.component';
import { MapComponent } from '../map.component';
import { Collection } from 'ol';
import { Layer } from 'ol/layer';

class TestLayerComponent extends LayerComponent {
  constructor(host: MapComponent) {
    super(host);
  }
}

describe('LayerComponent', () => {
  let component: TestLayerComponent;
  let fixture: ComponentFixture<TestLayerComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        getLayers: () => new Collection<Layer>(),
      } as any,
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    component = new TestLayerComponent(mockMapComponent as MapComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('layer');
  });

  it('should update properties when inputs change', () => {
    const changes = {
      opacity: {
        currentValue: 0.5,
        previousValue: 1,
        firstChange: false,
        isFirstChange: () => false
      }
    };

    component.instance = {
      setProperties: jasmine.createSpy('setProperties')
    } as any;

    component.ngOnChanges(changes);
    
    expect(component.instance.setProperties).toHaveBeenCalledWith({ opacity: 0.5 }, false);
  });
});