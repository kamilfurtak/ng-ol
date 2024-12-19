import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleTextComponent } from './text.component';
import { StyleComponent } from './style.component';
import { Text } from 'ol/style';

describe('StyleTextComponent', () => {
  let component: StyleTextComponent;
  let fixture: ComponentFixture<StyleTextComponent>;
  let mockStyleComponent: Partial<StyleComponent>;

  beforeEach(async () => {
    mockStyleComponent = {
      instance: {
        setText: jasmine.createSpy('setText')
      } as any,
      update: jasmine.createSpy('update')
    };

    await TestBed.configureTestingModule({
      imports: [StyleTextComponent],
      providers: [
        { provide: StyleComponent, useValue: mockStyleComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleTextComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('style-text');
  });

  it('should create Text style instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Text).toBeTruthy();
    expect(mockStyleComponent.instance.setText).toHaveBeenCalledWith(component.instance);
  });

  it('should handle font changes', () => {
    fixture.detectChanges();
    spyOn(component.instance, 'setFont');
    
    component.ngOnChanges({
      font: {
        currentValue: '12px Arial',
        previousValue: undefined,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.instance.setFont).toHaveBeenCalledWith('12px Arial');
    expect(mockStyleComponent.update).toHaveBeenCalled();
  });

  it('should handle text changes', () => {
    fixture.detectChanges();
    spyOn(component.instance, 'setText');
    
    component.ngOnChanges({
      text: {
        currentValue: 'Hello World',
        previousValue: undefined,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.instance.setText).toHaveBeenCalledWith('Hello World');
    expect(mockStyleComponent.update).toHaveBeenCalled();
  });

  it('should handle scale changes', () => {
    fixture.detectChanges();
    spyOn(component.instance, 'setScale');
    
    component.ngOnChanges({
      scale: {
        currentValue: 2,
        previousValue: 1,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.instance.setScale).toHaveBeenCalledWith(2);
    expect(mockStyleComponent.update).toHaveBeenCalled();
  });

  it('should handle rotation changes', () => {
    fixture.detectChanges();
    spyOn(component.instance, 'setRotation');
    
    component.ngOnChanges({
      rotation: {
        currentValue: Math.PI / 4,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.instance.setRotation).toHaveBeenCalledWith(Math.PI / 4);
    expect(mockStyleComponent.update).toHaveBeenCalled();
  });

  it('should throw error if no host provided', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [StyleTextComponent]
    });

    expect(() => {
      TestBed.createComponent(StyleTextComponent);
    }).toThrow('aol-style-text must be a descendant of aol-style');
  });
});