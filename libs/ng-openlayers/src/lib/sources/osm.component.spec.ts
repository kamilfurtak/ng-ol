import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceOsmComponent } from './osm.component';
import { LayerTileComponent } from '../layers/layertile.component';
import { OSM } from 'ol/source';

describe('SourceOsmComponent', () => {
  let component: SourceOsmComponent;
  let fixture: ComponentFixture<SourceOsmComponent>;
  let mockLayerComponent: Partial<LayerTileComponent>;

  beforeEach(async () => {
    mockLayerComponent = {
      instance: {
        setSource: jasmine.createSpy('setSource'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [SourceOsmComponent],
      providers: [{ provide: LayerTileComponent, useValue: mockLayerComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceOsmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create OSM source instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof OSM).toBeTruthy();
  });

  it('should set source on layer', () => {
    fixture.detectChanges();
    expect(mockLayerComponent.instance.setSource).toHaveBeenCalledWith(component.instance);
  });

  it('should handle attributions option', () => {
    component.attributions = 'Test Attribution';
    fixture.detectChanges();
    expect(component.instance instanceof OSM).toBeTruthy();
  });

  it('should handle maxZoom option', () => {
    component.maxZoom = 19;
    fixture.detectChanges();
    expect(component.instance instanceof OSM).toBeTruthy();
  });

  it('should emit tile load events', () => {
    const loadStartSpy = spyOn(component.tileLoadStart, 'emit');
    const loadEndSpy = spyOn(component.tileLoadEnd, 'emit');

    fixture.detectChanges();

    const mockEvent = { type: 'tileloadstart' } as any;
    component.instance.dispatchEvent(mockEvent);

    expect(loadStartSpy).toHaveBeenCalledWith(mockEvent);
  });
});
