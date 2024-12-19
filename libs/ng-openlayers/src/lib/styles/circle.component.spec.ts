import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleCircleComponent } from './circle.component';
import { StyleComponent } from './style.component';
import { Circle, Fill, Stroke } from 'ol/style';

describe('StyleCircleComponent', () => {
  let component: StyleCircleComponent;
  let fixture: ComponentFixture<StyleCircleComponent>;
  let mockStyleComponent: Partial<StyleComponent>;

  beforeEach(async () => {
    mockStyleComponent = {
      instance: {
        setImage: jasmine.createSpy('setImage')
      } as any,
      update: jasmine.createSpy('update')
    };

    await TestBed.configureTestingModule({
      imports: [StyleCircleComponent],
      providers: [
        { provide: StyleComponent, useValue: mockStyleComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleCircleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('style-circle');
  });

  it('should create Circle style instance', () => {
    component.radius = 10;
    fixture.detectChanges();
    
    expect(component.instance instanceof Circle).toBeTruthy();
    expect(mockStyleComponent.instance.setImage).toHaveBeenCalledWith(component.instance);
  });

  it('should handle radius changes', () => {
    component.radius = 10;
    fixture.detectChanges();
    
    const setRadiusSpy = spyOn(component.instance, 'setRadius');
    
    component.ngOnChanges({
      radius: {
        currentValue: 20,
        previousValue: 10,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(setRadiusSpy).toHaveBeenCalledWith(20);
  });

  it('should update host when radius changes', () => {
    component.radius = 10;
    fixture.detectChanges();
    
    component.update();
    expect(mockStyleComponent.update).toHaveBeenCalled();
  });

  it('should clean up on destroy', () => {
    component.radius = 10;
    fixture.detectChanges();
    
    component.ngOnDestroy();
    expect(mockStyleComponent.instance.setImage).toHaveBeenCalledWith(null);
  });

  it('should handle fill property', () => {
    component.radius = 10;
    fixture.detectChanges();
    
    const fill = new Fill({ color: 'red' });
    component.fill = fill;
    
    expect(component.fill).toBe(fill);
  });

  it('should handle stroke property', () => {
    component.radius = 10;
    fixture.detectChanges();
    
    const stroke = new Stroke({ color: 'black', width: 2 });
    component.stroke = stroke;
    
    expect(component.stroke).toBe(stroke);
  });
});