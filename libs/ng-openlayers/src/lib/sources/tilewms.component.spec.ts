import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceTileWMSComponent } from './tilewms.component';
import { LayerTileComponent } from '../layers/layertile.component';
import { TileWMS } from 'ol/source';

describe('SourceTileWMSComponent', () => {
  let component: SourceTileWMSComponent;
  let fixture: ComponentFixture<SourceTileWMSComponent>;
  let mockLayerComponent: Partial<LayerTileComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [SourceTileWMSComponent],
      providers: [
        { provide: LayerTileComponent, useValue: mockLayerComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTileWMSComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create WMS source instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof TileWMS).toBeTruthy();
  });

  it('should handle params option', () => {
    component.params = { LAYERS: 'layer1,layer2' };
    fixture.detectChanges();
    expect(component.instance instanceof TileWMS).toBeTruthy();
  });

  it('should handle serverType option', () => {
    component.serverType = 'geoserver';
    fixture.detectChanges();
    expect(component.instance instanceof TileWMS).toBeTruthy();
  });

  it('should update params when changed', () => {
    fixture.detectChanges();
    
    const updateParamsSpy = spyOn(component.instance, 'updateParams');
    component.ngOnChanges({
      params: {
        currentValue: { LAYERS: 'newLayer' },
        previousValue: { LAYERS: 'oldLayer' },
        firstChange: false,
        isFirstChange: () => false
      }
    });
    
    expect(updateParamsSpy).toHaveBeenCalledWith({ LAYERS: 'newLayer' });
  });
});