import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceImageArcGISRestComponent } from './imagearcgisrest.component';
import { LayerImageComponent } from '../layers/layerimage.component';
import ImageArcGISRest from 'ol/source/ImageArcGISRest';

describe('SourceImageArcGISRestComponent', () => {
  let component: SourceImageArcGISRestComponent;
  let fixture: ComponentFixture<SourceImageArcGISRestComponent>;
  let mockLayerComponent: Partial<LayerImageComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [SourceImageArcGISRestComponent],
      providers: [{ provide: LayerImageComponent, useValue: mockLayerComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceImageArcGISRestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create ImageArcGISRest source instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof ImageArcGISRest).toBeTruthy();
  });

  it('should emit image load events', () => {
    const loadStartSpy = spyOn(component.imageLoadStart, 'emit');
    const loadEndSpy = spyOn(component.imageLoadEnd, 'emit');

    fixture.detectChanges();

    const mockEvent = { type: 'imageloadstart' } as any;
    component.instance.dispatchEvent(mockEvent);

    expect(loadStartSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should handle params changes', () => {
    fixture.detectChanges();

    const updateParamsSpy = spyOn(component.instance, 'updateParams');
    component.ngOnChanges({
      params: {
        currentValue: { LAYERS: 'show:0,1,2' },
        previousValue: { LAYERS: 'show:0' },
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(updateParamsSpy).toHaveBeenCalledWith({ LAYERS: 'show:0,1,2' });
  });

  it('should handle ratio option', () => {
    component.ratio = 1.5;
    fixture.detectChanges();
    expect(component.instance instanceof ImageArcGISRest).toBeTruthy();
  });

  it('should handle resolutions option', () => {
    component.resolutions = [156543.03392804097, 78271.51696402048];
    fixture.detectChanges();
    expect(component.instance instanceof ImageArcGISRest).toBeTruthy();
  });
});
