import { FormatComponent } from './format.component';

describe('FormatComponent', () => {
  let component: FormatComponent;

  beforeEach(() => {
    component = new FormatComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component type', () => {
    expect(component.componentType).toBe('format');
  });

  it('should initialize instance property', () => {
    expect(component.instance).toBeDefined();
  });
});