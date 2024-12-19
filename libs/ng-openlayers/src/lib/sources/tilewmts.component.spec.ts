import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceTileWMTSComponent } from './tilewmts.component';
import { LayerTileComponent } from '../layers/layertile.component';
import { WMTS } from 'ol/source';
import { TileGridWMTSComponent } from '../tilegridwmts.component';

describe('SourceTileWMTSComponent', () => {
  let component: SourceTileWMTSComponent;
  let fixture: ComponentFixture<SourceTileWMTSComponent>;
  let mockLayerComponent: Partial<LayerTileComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [SourceTileWMTSComponent],
      providers: [{ provide: LayerTileComponent, useValue: mockLayerComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTileWMTSComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create WMTS source instance', () => {
    component.layer = 'layer1';
    component.matrixSet = 'EPSG:3857';
    component.format = 'image/png';
    component.style = 'default';

    fixture.detectChanges();
    expect(component.instance instanceof WMTS).toBeTruthy();
  });

  it('should handle tileGrid from component', () => {
    const mockTileGrid = new TileGridWMTSComponent();
    component.tileGridWMTS = mockTileGrid;
    component.layer = 'layer1';
    component.matrixSet = 'EPSG:3857';
    component.format = 'image/png';
    component.style = 'default';

    component.ngAfterContentInit();
    expect(component.instance instanceof WMTS).toBeTruthy();
  });

  it('should emit tile load events', () => {
    const loadStartSpy = spyOn(component.tileLoadStart, 'emit');
    const loadEndSpy = spyOn(component.tileLoadEnd, 'emit');

    component.layer = 'layer1';
    component.matrixSet = 'EPSG:3857';
    component.format = 'image/png';
    component.style = 'default';

    fixture.detectChanges();

    const mockEvent = { type: 'tileloadstart' } as any;
    component.instance.dispatchEvent(mockEvent);

    expect(loadStartSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should handle url changes', () => {
    component.layer = 'layer1';
    component.matrixSet = 'EPSG:3857';
    component.format = 'image/png';
    component.style = 'default';

    fixture.detectChanges();

    const setLayerSourceSpy = spyOn(component, 'setLayerSource');
    component.ngOnChanges({
      url: {
        currentValue: 'https://example.com/wmts',
        previousValue: undefined,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(setLayerSourceSpy).toHaveBeenCalled();
  });
});
