import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerGroupComponent } from './layergroup.component';
import { MapComponent } from '../map.component';
import { Group } from 'ol/layer';
import { Collection } from 'ol';

describe('LayerGroupComponent', () => {
  let component: LayerGroupComponent;
  let fixture: ComponentFixture<LayerGroupComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        getLayers: () => new Collection(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [LayerGroupComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerGroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create layer group instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Group).toBeTruthy();
  });

  it('should add group to map layers', () => {
    const addSpy = spyOn(mockMapComponent.instance.getLayers(), 'push');
    fixture.detectChanges();
    expect(addSpy).toHaveBeenCalledWith(component.instance);
  });

  it('should remove group from map layers on destroy', () => {
    const removeSpy = spyOn(mockMapComponent.instance.getLayers(), 'remove');
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(removeSpy).toHaveBeenCalledWith(component.instance);
  });
});