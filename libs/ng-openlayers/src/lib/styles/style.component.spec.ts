import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleComponent } from './style.component';
import { FeatureComponent } from '../feature.component';
import { LayerVectorComponent } from '../layers/layervector.component';
import { Style } from 'ol/style';

describe('StyleComponent', () => {
  let component: StyleComponent;
  let fixture: ComponentFixture<StyleComponent>;
  let mockFeatureComponent: Partial<FeatureComponent>;

  beforeEach(async () => {
    mockFeatureComponent = {
      instance: {
        setStyle: jasmine.createSpy('setStyle'),
        changed: jasmine.createSpy('changed')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [StyleComponent],
      providers: [
        { provide: FeatureComponent, useValue: mockFeatureComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('style');
  });

  it('should create Style instance', () => {
    fixture.detectChanges();
    expect(component.instance instanceof Style).toBeTruthy();
  });

  it('should set style on feature', () => {
    fixture.detectChanges();
    expect(mockFeatureComponent.instance.setStyle).toHaveBeenCalledWith(component.instance);
  });

  it('should update host on style change', () => {
    fixture.detectChanges();
    component.update();
    expect(mockFeatureComponent.instance.changed).toHaveBeenCalled();
  });

  it('should throw error if no host provided', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [StyleComponent]
    });

    expect(() => {
      TestBed.createComponent(StyleComponent);
    }).toThrow('aol-style must be applied to a feature or a layer');
  });
});