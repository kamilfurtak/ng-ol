import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateInteractionComponent } from './translate.component';
import { MapComponent } from '../map.component';
import { Translate } from 'ol/interaction';
import { Collection, Feature } from 'ol';

describe('TranslateInteractionComponent', () => {
  let component: TranslateInteractionComponent;
  let fixture: ComponentFixture<TranslateInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [TranslateInteractionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create translate interaction', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Translate).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should handle features option', () => {
    component.features = new Collection<Feature>();
    fixture.detectChanges();
    expect(component.instance instanceof Translate).toBeTruthy();
  });

  it('should handle hitTolerance option', () => {
    component.hitTolerance = 5;
    fixture.detectChanges();
    expect(component.instance instanceof Translate).toBeTruthy();
  });

  it('should emit translate events', () => {
    const translateEndSpy = spyOn(component.translateEnd, 'emit');
    const translateStartSpy = spyOn(component.translateStart, 'emit');

    fixture.detectChanges();

    const mockEvent = { type: 'translateend' } as any;
    component.instance.dispatchEvent(mockEvent);

    expect(translateEndSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should remove interaction on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });
});
