import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerTileComponent } from './layertile.component';
import { MapComponent } from '../map.component';
import { Tile } from 'ol/layer';
import { Collection } from 'ol';

describe('LayerTileComponent', () => {
  let component: LayerTileComponent;
  let fixture: ComponentFixture<LayerTileComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        getLayers: () => new Collection(),
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [LayerTileComponent],
      providers: [
        { provide: MapComponent, useValue: mockMapComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerTileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create tile layer instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Tile).toBeTruthy();
  });

  it('should handle preload option', () => {
    component.preload = 2;
    fixture.detectChanges();
    expect(component.instance instanceof Tile).toBeTruthy();
  });

  it('should handle useInterimTilesOnError option', () => {
    component.useInterimTilesOnError = true;
    fixture.detectChanges();
    expect(component.instance instanceof Tile).toBeTruthy();
  });
});