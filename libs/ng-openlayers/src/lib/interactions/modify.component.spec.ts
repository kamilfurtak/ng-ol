import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyInteractionComponent } from './modify.component';
import { MapComponent } from '../map.component';
import { Modify } from 'ol/interaction';
import { Collection, Feature } from 'ol';

describe('ModifyInteractionComponent', () => {
  let component: ModifyInteractionComponent;
  let fixture: ComponentFixture<ModifyInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [ModifyInteractionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create modify interaction', () => {
    component.features = new Collection<Feature>();
    fixture.detectChanges();
    expect(component.instance instanceof Modify).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should emit modify events', () => {
    const modifyEndSpy = spyOn(component.olModifyEnd, 'emit');
    const modifyStartSpy = spyOn(component.olModifyStart, 'emit');

    component.features = new Collection<Feature>();
    fixture.detectChanges();

    const mockEvent = { type: 'modifyend' } as any;
    component.instance.dispatchEvent(mockEvent);

    expect(modifyEndSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should handle deleteCondition option', () => {
    component.features = new Collection<Feature>();
    component.deleteCondition = () => true;
    fixture.detectChanges();
    expect(component.instance instanceof Modify).toBeTruthy();
  });

  it('should handle pixelTolerance option', () => {
    component.features = new Collection<Feature>();
    component.pixelTolerance = 10;
    fixture.detectChanges();
    expect(component.instance instanceof Modify).toBeTruthy();
  });

  it('should remove interaction on destroy', () => {
    component.features = new Collection<Feature>();
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});
