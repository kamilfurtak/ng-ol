import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceXYZComponent } from './xyz.component';
import { LayerTileComponent } from '../layers/layertile.component';
import { XYZ } from 'ol/source';
import { TileGridComponent } from '../tilegrid.component';

describe('SourceXYZComponent', () => {
  let component: SourceXYZComponent;
  let fixture: ComponentFixture<SourceXYZComponent>;
  let mockLayerComponent: Partial<LayerTileComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [SourceXYZComponent],
      providers: [{ provide: LayerTileComponent, useValue: mockLayerComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceXYZComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create XYZ source instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof XYZ).toBeTruthy();
  });

  it('should handle url option', () => {
    component.url = 'https://example.com/tiles/{z}/{x}/{y}';
    fixture.detectChanges();
    expect(component.instance instanceof XYZ).toBeTruthy();
  });

  it('should handle tileGrid option', () => {
    const mockTileGrid = new TileGridComponent();
    component.tileGridXYZ = mockTileGrid;
    fixture.detectChanges();
    expect(component.instance instanceof XYZ).toBeTruthy();
  });

  it('should emit tile load events', () => {
    const loadStartSpy = spyOn(component.tileLoadStart, 'emit');
    const loadEndSpy = spyOn(component.tileLoadEnd, 'emit');

    fixture.detectChanges();

    const mockEvent = { type: 'tileloadstart' } as any;
    component.instance.dispatchEvent(mockEvent);

    expect(loadStartSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should handle url changes', () => {
    fixture.detectChanges();

    component.ngOnChanges({
      url: {
        currentValue: 'https://example.com/new-tiles/{z}/{x}/{y}',
        previousValue: undefined,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.instance instanceof XYZ).toBeTruthy();
  });
});
