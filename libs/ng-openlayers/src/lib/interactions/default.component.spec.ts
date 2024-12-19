import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultInteractionComponent } from './default.component';
import { MapComponent } from '../map.component';
import { Collection } from 'ol';

describe('DefaultInteractionComponent', () => {
  let component: DefaultInteractionComponent;
  let fixture: ComponentFixture<DefaultInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy(),
        removeInteraction: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [DefaultInteractionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create default interactions', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Collection).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalled();
  });

  it('should handle altShiftDragRotate option', () => {
    component.altShiftDragRotate = false;
    fixture.detectChanges();
    expect(component.instance instanceof Collection).toBeTruthy();
  });

  it('should handle doubleClickZoom option', () => {
    component.doubleClickZoom = false;
    fixture.detectChanges();
    expect(component.instance instanceof Collection).toBeTruthy();
  });

  it('should remove interactions on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalled();
  });
});
