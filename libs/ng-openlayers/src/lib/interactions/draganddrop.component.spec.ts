import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragAndDropInteractionComponent } from './draganddrop.component';
import { MapComponent } from '../map.component';
import { DragAndDrop } from 'ol/interaction';
import GeoJSON from 'ol/format/GeoJSON';

describe('DragAndDropInteractionComponent', () => {
  let component: DragAndDropInteractionComponent;
  let fixture: ComponentFixture<DragAndDropInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [DragAndDropInteractionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create drag and drop interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof DragAndDrop).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle formatConstructors option', () => {
    component.formatConstructors = [new GeoJSON()];
    fixture.detectChanges();
    expect(component.instance instanceof DragAndDrop).toBeTruthy();
  });

  it('should handle projection option', () => {
    component.projection = 'EPSG:4326';
    fixture.detectChanges();
    expect(component.instance instanceof DragAndDrop).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});
