import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleIconComponent } from './icon.component';
import { StyleComponent } from './style.component';
import { Icon } from 'ol/style';

describe('StyleIconComponent', () => {
  let component: StyleIconComponent;
  let fixture: ComponentFixture<StyleIconComponent>;
  let mockStyleComponent: Partial<StyleComponent>;

  beforeEach(async () => {
    mockStyleComponent = {
      instance: {
        setImage: jasmine.createSpy('setImage')
      } as any,
      update: jasmine.createSpy('update')
    };

    await TestBed.configureTestingModule({
      imports: [StyleIconComponent],
      providers: [
        { provide: StyleComponent, useValue: mockStyleComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create Icon style instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Icon).toBeTruthy();
    expect(mockStyleComponent.instance.setImage).toHaveBeenCalledWith(component.instance);
  });

  it('should handle opacity changes', () => {
    fixture.detectChanges();
    spyOn(component.instance, 'setOpacity');
    
    component.ngOnChanges({
      opacity: {
        currentValue: 0.5,
        previousValue: 1,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.instance.setOpacity).toHaveBeenCalledWith(0.5);
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

  it('should recreate icon when src changes', () => {
    fixture.detectChanges();
    
    component.ngOnChanges({
      src: {
        currentValue: 'new-icon.png',
        previousValue: 'old-icon.png',
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(mockStyleComponent.instance.setImage).toHaveBeenCalledTimes(2);
    expect(mockStyleComponent.update).toHaveBeenCalled();
  });
});