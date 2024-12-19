import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceRasterComponent } from './raster.component';
import { LayerImageComponent } from '../layers/layerimage.component';
import { Raster, Source } from 'ol/source';

describe('SourceRasterComponent', () => {
  let component: SourceRasterComponent;
  let fixture: ComponentFixture<SourceRasterComponent>;
  let mockLayerComponent: Partial<LayerImageComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [SourceRasterComponent],
      providers: [{ provide: LayerImageComponent, useValue: mockLayerComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceRasterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create Raster source instance', () => {
    component.sources = [new Source({})];
    fixture.detectChanges();
    expect(component.instance instanceof Raster).toBeTruthy();
  });

  it('should emit raster operation events', () => {
    const beforeOperationsSpy = spyOn(component.beforeOperations, 'emit');
    const afterOperationsSpy = spyOn(component.afterOperations, 'emit');

    component.sources = [new Source({})];
    fixture.detectChanges();

    const mockEvent = { type: 'beforeoperations' } as any;
    component.instance.dispatchEvent(mockEvent);

    expect(beforeOperationsSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should handle operation option', () => {
    component.sources = [new Source({})];
    component.operation = (pixels, data) => pixels[0];
    fixture.detectChanges();
    expect(component.instance instanceof Raster).toBeTruthy();
  });

  it('should handle threads option', () => {
    component.sources = [new Source({})];
    component.threads = 4;
    fixture.detectChanges();
    expect(component.instance instanceof Raster).toBeTruthy();
  });

  it('should handle operationType option', () => {
    component.sources = [new Source({})];
    component.operationType = 'pixel';
    fixture.detectChanges();
    expect(component.instance instanceof Raster).toBeTruthy();
  });
});
