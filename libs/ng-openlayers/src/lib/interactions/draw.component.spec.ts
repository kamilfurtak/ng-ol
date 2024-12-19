import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawInteractionComponent } from './draw.component';
import { MapComponent } from '../map.component';
import { Draw } from 'ol/interaction';

describe('DrawInteractionComponent', () => {
  let component: DrawInteractionComponent;
  let fixture: ComponentFixture<DrawInteractionComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addInteraction: jasmine.createSpy('addInteraction'),
        removeInteraction: jasmine.createSpy('removeInteraction'),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [DrawInteractionComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawInteractionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create draw interaction', () => {
    component.type = 'Point';
    fixture.detectChanges();

    expect(component.instance instanceof Draw).toBeTruthy();
    expect(mockMapComponent.instance.addInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should remove interaction on destroy', () => {
    component.type = 'Point';
    fixture.detectChanges();

    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeInteraction).toHaveBeenCalledWith(component.instance);
  });

  it('should emit draw events', () => {
    const drawEndSpy = spyOn(component.drawEnd, 'emit');
    const drawStartSpy = spyOn(component.drawStart, 'emit');

    component.type = 'Point';
    fixture.detectChanges();

    const mockEvent = { type: 'drawend' } as any;
    component.instance.dispatchEvent(mockEvent);

    expect(drawEndSpy).toHaveBeenCalledWith(mockEvent);
  });
});
