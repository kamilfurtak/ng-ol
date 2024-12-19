import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceVectorTileComponent } from './vectortile.component';
import { LayerVectorTileComponent } from '../layers/layervectortile.component';
import { VectorTile } from 'ol/source';
import { FormatComponent } from '../formats/format.component';
import { TileGridComponent } from '../tilegrid.component';

describe('SourceVectorTileComponent', () => {
  let component: SourceVectorTileComponent;
  let fixture: ComponentFixture<SourceVectorTileComponent>;
  let mockLayerComponent: Partial<LayerVectorTileComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [SourceVectorTileComponent],
      providers: [
        { provide: LayerVectorTileComponent, useValue: mockLayerComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceVectorTileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create vector tile source instance after content init', () => {
    const mockFormat = new FormatComponent();
    const mockTileGrid = new TileGridComponent();
    
    component.formatComponent = mockFormat;
    component.tileGridComponent = mockTileGrid;
    
    component.ngAfterContentInit();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });

  it('should handle cacheSize option', () => {
    component.cacheSize = 512;
    const mockFormat = new FormatComponent();
    const mockTileGrid = new TileGridComponent();
    
    component.formatComponent = mockFormat;
    component.tileGridComponent = mockTileGrid;
    
    component.ngAfterContentInit();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });

  it('should handle overlaps option', () => {
    component.overlaps = true;
    const mockFormat = new FormatComponent();
    const mockTileGrid = new TileGridComponent();
    
    component.formatComponent = mockFormat;
    component.tileGridComponent = mockTileGrid;
    
    component.ngAfterContentInit();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });

  it('should handle tilePixelRatio option', () => {
    component.tilePixelRatio = 2;
    const mockFormat = new FormatComponent();
    const mockTileGrid = new TileGridComponent();
    
    component.formatComponent = mockFormat;
    component.tileGridComponent = mockTileGrid;
    
    component.ngAfterContentInit();
    expect(component.instance instanceof VectorTile).toBeTruthy();
  });
});