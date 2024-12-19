import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleStrokeComponent } from './stroke.component';
import { StyleComponent } from './style.component';
import { Stroke } from 'ol/style';

fdescribe('StyleStrokeComponent', () => {
  let component: StyleStrokeComponent;
  let fixture: ComponentFixture<StyleStrokeComponent>;
  let mockStyleComponent: Partial<StyleComponent>;
  let mockStyleCircleComponent: Partial<StyleComponent>;
  let mockStyleTextComponent: Partial<StyleComponent>;

  beforeEach(async () => {
    mockStyleComponent = {
      componentType: 'style',
      instance: {
        setStroke: jasmine.createSpy('setStroke'),
      } as any,
      update: jasmine.createSpy('update'),
    };

    mockStyleCircleComponent = {
      componentType: 'style-circle',
      instance: {
        setStroke: jasmine.createSpy('setStroke'),
      } as any,
      update: jasmine.createSpy('update'),
    };

    mockStyleTextComponent = {
      componentType: 'style-text',
      instance: {
        setStroke: jasmine.createSpy('setStroke'),
      } as any,
      update: jasmine.createSpy('update'),
    };

    await TestBed.configureTestingModule({
      imports: [StyleStrokeComponent],
      providers: [{ provide: StyleComponent, useValue: mockStyleComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleStrokeComponent);
    component = fixture.componentInstance;
    // Object.defineProperty(component, 'host', { value: mockStyleComponent });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create Stroke style instance, when component type is style', () => {
      fixture.detectChanges();
      expect(component.instance instanceof Stroke).toBeTruthy();
      expect(mockStyleComponent.instance.setStroke).toHaveBeenCalledWith(component.instance);
    });

    // it('should create Stroke style instance, when component type is style-text', () => {
    //   // TestBed.overrideProvider(StyleTextComponent, { useValue: mockStyleTextComponent });
    //   mockStyleComponent.componentType = 'style-text';
    //   fixture.detectChanges();
    //   expect(component.instance instanceof Stroke).toBeTruthy();
    //   expect(mockStyleComponent.instance.setStroke).toHaveBeenCalledWith(component.instance);
    // });

    // it('should create Stroke style instance, when component type is style-circle', () => {
    //   TestBed.overrideProvider(StyleCircleComponent, { useValue: mockStyleCircleComponent });
    //   fixture.detectChanges();
    //   expect(component.instance instanceof Stroke).toBeTruthy();
    //   expect(mockStyleCircleComponent.instance.setStroke).toHaveBeenCalledWith(component.instance);
    // });
  });

  describe('ngOnChanges', () => {
    it('should handle color changes', () => {
      fixture.detectChanges();
      spyOn(component.instance, 'setColor');

      component.ngOnChanges({
        color: {
          currentValue: 'red',
          previousValue: undefined,
          firstChange: false,
          isFirstChange: () => false,
        },
      });

      expect(component.instance.setColor).toHaveBeenCalledWith('red');
      expect(mockStyleComponent.update).toHaveBeenCalled();
    });

    it('should handle lineCap changes', () => {
      fixture.detectChanges();
      spyOn(component.instance, 'setLineCap');

      component.ngOnChanges({
        lineCap: {
          currentValue: 'round',
          previousValue: undefined,
          firstChange: false,
          isFirstChange: () => false,
        },
      });

      expect(component.instance.setLineCap).toHaveBeenCalledWith('round');
      expect(mockStyleComponent.update).toHaveBeenCalled();
    });

    it('should handle lineDash changes', () => {
      fixture.detectChanges();
      spyOn(component.instance, 'setLineDash');

      component.ngOnChanges({
        lineDash: {
          currentValue: [5, 5],
          previousValue: undefined,
          firstChange: false,
          isFirstChange: () => false,
        },
      });

      expect(component.instance.setLineDash).toHaveBeenCalledWith([5, 5]);
      expect(mockStyleComponent.update).toHaveBeenCalled();
    });

    it('should handle width changes', () => {
      fixture.detectChanges();
      spyOn(component.instance, 'setWidth');

      component.ngOnChanges({
        width: {
          currentValue: 2,
          previousValue: 1,
          firstChange: false,
          isFirstChange: () => false,
        },
      });

      expect(component.instance.setWidth).toHaveBeenCalledWith(2);
      expect(mockStyleComponent.update).toHaveBeenCalled();
    });

    it('should throw error if no host provided', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [StyleStrokeComponent],
      });

      expect(() => {
        TestBed.createComponent(StyleStrokeComponent);
      }).toThrowError('aol-style-stroke must be a descendant of aol-style');
    });
  });
});
