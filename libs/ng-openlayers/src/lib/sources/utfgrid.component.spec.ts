import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceUTFGridComponent } from './utfgrid.component';
import { LayerTileComponent } from '../layers/layertile.component';
import { UTFGrid } from 'ol/source';

describe('SourceUTFGridComponent', () => {
  let component: SourceUTFGridComponent;
  let fixture: ComponentFixture<SourceUTFGridComponent>;
  let mockLayerComponent: Partial<LayerTileComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [SourceUTFGridComponent],
      providers: [
        { provide: LayerTileComponent, useValue: mockLayerComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceUTFGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create UTFGrid source instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof UTFGrid).toBeTruthy();
  });

  it('should handle tileJSON option', () => {
    component.tileJSON = {
      grids: ['https://example.com/grid/{z}/{x}/{y}.json'],
      tiles: ['https://example.com/tiles/{z}/{x}/{y}.png']
    };
    fixture.detectChanges();
    expect(component.instance instanceof UTFGrid).toBeTruthy();
  });

  it('should handle url option', () => {
    component.url = 'https://example.com/grid/{z}/{x}/{y}.json';
    fixture.detectChanges();
    expect(component.instance instanceof UTFGrid).toBeTruthy();
  });
});