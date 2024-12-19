import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceImageWMSComponent } from './imagewms.component';
import { LayerImageComponent } from '../layers/layerimage.component';
import { ImageWMS } from 'ol/source';

describe('SourceImageWMSComponent', () => {
  let component: SourceImageWMSComponent;
  let fixture: ComponentFixture<SourceImageWMSComponent>;
  let mockLayerComponent: Partial<LayerImageComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [SourceImageWMSComponent],
      providers: [{ provide: LayerImageComponent, useValue: mockLayerComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceImageWMSComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create ImageWMS source instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof ImageWMS).toBeTruthy();
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
        currentValue: { LAYERS: 'newLayer' },
        previousValue: { LAYERS: 'oldLayer' },
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(updateParamsSpy).toHaveBeenCalledWith({ LAYERS: 'newLayer' });
  });

  it('should handle serverType option', () => {
    component.serverType = 'geoserver';
    fixture.detectChanges();
    expect(component.instance instanceof ImageWMS).toBeTruthy();
  });

  it('should handle ratio option', () => {
    component.ratio = 1.5;
    fixture.detectChanges();
    expect(component.instance instanceof ImageWMS).toBeTruthy();
  });
});
