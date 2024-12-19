import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlOverviewMapComponent } from './overviewmap.component';
import { MapComponent } from '../map.component';
import { OverviewMap } from 'ol/control';
import { View } from 'ol';

describe('ControlOverviewMapComponent', () => {
  let component: ControlOverviewMapComponent;
  let fixture: ComponentFixture<ControlOverviewMapComponent>;
  let mockMapComponent: Partial<MapComponent>;

  beforeEach(async () => {
    mockMapComponent = {
      instance: {
        addControl: jasmine.createSpy(),
        removeControl: jasmine.createSpy(),
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [ControlOverviewMapComponent],
      providers: [{ provide: MapComponent, useValue: mockMapComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlOverviewMapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create overview map control', () => {
    fixture.detectChanges();
    expect(component.instance instanceof OverviewMap).toBeTruthy();
    expect(mockMapComponent.instance.addControl).toHaveBeenCalledWith(component.instance);
  });

  it('should handle collapsed option', () => {
    component.collapsed = true;
    fixture.detectChanges();
    expect(component.instance instanceof OverviewMap).toBeTruthy();
  });

  it('should handle label options', () => {
    component.collapseLabel = '«';
    component.label = '»';
    fixture.detectChanges();
    expect(component.instance instanceof OverviewMap).toBeTruthy();
  });

  it('should handle view option', () => {
    const view = new View();
    component.view = view;
    fixture.detectChanges();
    component.ngOnChanges({
      view: {
        currentValue: view,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.instance instanceof OverviewMap).toBeTruthy();
  });

  it('should remove control on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockMapComponent.instance.removeControl).toHaveBeenCalledWith(component.instance);
  });
});
