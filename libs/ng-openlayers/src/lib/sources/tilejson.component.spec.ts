import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceTileJSONComponent } from './tilejson.component';
import { LayerTileComponent } from '../layers/layertile.component';
import { TileJSON } from 'ol/source';

describe('SourceTileJSONComponent', () => {
  let component: SourceTileJSONComponent;
  let fixture: ComponentFixture<SourceTileJSONComponent>;
  let mockLayerComponent: Partial<LayerTileComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [SourceTileJSONComponent],
      providers: [{ provide: LayerTileComponent, useValue: mockLayerComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTileJSONComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create TileJSON source instance', () => {
    component.url = 'https://example.com/tiles.json';
    fixture.detectChanges();
    expect(component.instance instanceof TileJSON).toBeTruthy();
  });

  it('should set source on layer', () => {
    component.url = 'https://example.com/tiles.json';
    fixture.detectChanges();
    expect(mockLayerComponent.instance.setSource).toHaveBeenCalledWith(component.instance);
  });
});
