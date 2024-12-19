import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleFillComponent } from './fill.component';
import { StyleComponent } from './style.component';
import { StyleCircleComponent } from './circle.component';
import { StyleTextComponent } from './text.component';
import { Fill } from 'ol/style';

describe('StyleFillComponent', () => {
  let component: StyleFillComponent;
  let fixture: ComponentFixture<StyleFillComponent>;
  let mockStyleComponent: Partial<StyleComponent>;

  beforeEach(async () => {
    mockStyleComponent = {
      instance: {
        setFill: jasmine.createSpy('setFill')
      } as any,
      update: jasmine.createSpy('update'),
      componentType: 'style'
    };

    await TestBed.configureTestingModule({
      imports: [StyleFillComponent],
      providers: [
        { provide: StyleComponent, useValue: mockStyleComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleFillComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create Fill style instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Fill).toBeTruthy();
    expect(mockStyleComponent.instance.setFill).toHaveBeenCalledWith(component.instance);
  });

  it('should handle color changes', () => {
    fixture.detectChanges();
    spyOn(component.instance, 'setColor');
    
    component.ngOnChanges({
      color: {
        currentValue: 'red',
        previousValue: undefined,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.instance.setColor).toHaveBeenCalledWith('red');
    expect(mockStyleComponent.update).toHaveBeenCalled();
  });

  it('should work with StyleCircleComponent host', () => {
    TestBed.resetTestingModule();
    const mockCircleComponent = {
      instance: {} as any,
      update: jasmine.createSpy('update'),
      componentType: 'style-circle'
    };

    TestBed.configureTestingModule({
      imports: [StyleFillComponent],
      providers: [
        { provide: StyleCircleComponent, useValue: mockCircleComponent }
      ]
    });

    const circleFixture = TestBed.createComponent(StyleFillComponent);
    circleFixture.detectChanges();
    
    expect(mockCircleComponent.update).not.toHaveBeenCalled();
  });

  it('should work with StyleTextComponent host', () => {
    TestBed.resetTestingModule();
    const mockTextComponent = {
      instance: {
        setFill: jasmine.createSpy('setFill')
      } as any,
      update: jasmine.createSpy('update'),
      componentType: 'style-text'
    };

    TestBed.configureTestingModule({
      imports: [StyleFillComponent],
      providers: [
        { provide: StyleTextComponent, useValue: mockTextComponent }
      ]
    });

    const textFixture = TestBed.createComponent(StyleFillComponent);
    textFixture.detectChanges();
    
    expect(mockTextComponent.instance.setFill).toHaveBeenCalled();
  });

  it('should throw error if no host provided', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [StyleFillComponent]
    });

    expect(() => {
      TestBed.createComponent(StyleFillComponent);
    }).toThrow('aol-style-stroke must be a descendant of aol-style');
  });
});