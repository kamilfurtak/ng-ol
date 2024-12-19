import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureComponent } from './feature.component';
import { SourceVectorComponent } from './sources/vector.component';
import { Feature } from 'ol';

describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;
  let mockSourceComponent: Partial<SourceVectorComponent>;

  beforeEach(async () => {
    mockSourceComponent = {
      instance: {
        addFeature: jasmine.createSpy('addFeature'),
        removeFeature: jasmine.createSpy('removeFeature')
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [FeatureComponent],
      providers: [
        { provide: SourceVectorComponent, useValue: mockSourceComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create ol.Feature instance', () => {
    expect(component.instance instanceof Feature).toBeTruthy();
  });

  it('should add feature to source on init', () => {
    expect(mockSourceComponent.instance.addFeature).toHaveBeenCalledWith(component.instance);
  });

  it('should remove feature from source on destroy', () => {
    component.ngOnDestroy();
    expect(mockSourceComponent.instance.removeFeature).toHaveBeenCalledWith(component.instance);
  });

  it('should set feature ID when provided', () => {
    const id = 'test-id';
    component.id = id;
    component.ngOnChanges({
      id: {
        currentValue: id,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    
    expect(component.instance.getId()).toBe(id);
  });
});