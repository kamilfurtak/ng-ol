import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceImageStaticComponent } from './imagestatic.component';
import { LayerImageComponent } from '../layers/layerimage.component';
import { ImageStatic } from 'ol/source';

describe('SourceImageStaticComponent', () => {
  let component: SourceImageStaticComponent;
  let fixture: ComponentFixture<SourceImageStaticComponent>;
  let mockLayerComponent: Partial<LayerImageComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [SourceImageStaticComponent],
      providers: [{ provide: LayerImageComponent, useValue: mockLayerComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceImageStaticComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create ImageStatic source instance', () => {
    component.url = 'https://example.com/image.png';
    component.imageExtent = [0, 0, 100, 100];
    fixture.detectChanges();
    expect(component.instance instanceof ImageStatic).toBeTruthy();
  });

  it('should emit image load events', () => {
    const loadStartSpy = spyOn(component.imageLoadStart, 'emit');
    const loadEndSpy = spyOn(component.imageLoadEnd, 'emit');

    component.url = 'https://example.com/image.png';
    component.imageExtent = [0, 0, 100, 100];
    fixture.detectChanges();

    const mockEvent = { type: 'imageloadstart' } as any;
    component.instance.dispatchEvent(mockEvent);

    expect(loadStartSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should handle url changes', () => {
    component.url = 'https://example.com/image.png';
    component.imageExtent = [0, 0, 100, 100];
    fixture.detectChanges();

    const setLayerSourceSpy = spyOn(component, 'setLayerSource');
    component.ngOnChanges({
      url: {
        currentValue: 'https://example.com/new-image.png',
        previousValue: 'https://example.com/image.png',
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(setLayerSourceSpy).toHaveBeenCalled();
  });
});
