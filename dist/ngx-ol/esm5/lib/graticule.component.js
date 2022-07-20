import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Graticule } from 'ol';
import { MapComponent } from './map.component';
var GraticuleComponent = /** @class */ (function () {
    function GraticuleComponent(map) {
        this.map = map;
        this.componentType = 'graticule';
    }
    GraticuleComponent.prototype.ngOnChanges = function (changes) {
        var properties = {};
        if (!this.instance) {
            return;
        }
        for (var key in changes) {
            if (changes.hasOwnProperty(key)) {
                properties[key] = changes[key].currentValue;
            }
        }
        if (properties) {
            this.instance = new Graticule(properties);
        }
        this.instance.setMap(this.map.instance);
    };
    GraticuleComponent.prototype.ngAfterContentInit = function () {
        this.instance = new Graticule({
            strokeStyle: this.strokeStyle,
            showLabels: this.showLabels,
            lonLabelPosition: this.lonLabelPosition,
            latLabelPosition: this.latLabelPosition,
        });
        this.instance.setMap(this.map.instance);
    };
    GraticuleComponent.prototype.ngOnDestroy = function () {
        this.instance.setMap(null);
    };
    GraticuleComponent.ctorParameters = function () { return [
        { type: MapComponent }
    ]; };
    tslib_1.__decorate([
        Input()
    ], GraticuleComponent.prototype, "strokeStyle", void 0);
    tslib_1.__decorate([
        Input()
    ], GraticuleComponent.prototype, "showLabels", void 0);
    tslib_1.__decorate([
        Input()
    ], GraticuleComponent.prototype, "lonLabelPosition", void 0);
    tslib_1.__decorate([
        Input()
    ], GraticuleComponent.prototype, "latLabelPosition", void 0);
    GraticuleComponent = tslib_1.__decorate([
        Component({
            selector: 'aol-graticule',
            template: '<ng-content></ng-content>'
        })
    ], GraticuleComponent);
    return GraticuleComponent;
}());
export { GraticuleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdGljdWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vbC8iLCJzb3VyY2VzIjpbImxpYi9ncmF0aWN1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBeUQsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLElBQUksQ0FBQztBQUUvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFNL0M7SUFhRSw0QkFBb0IsR0FBaUI7UUFBakIsUUFBRyxHQUFILEdBQUcsQ0FBYztRQVg5QixrQkFBYSxHQUFHLFdBQVcsQ0FBQztJQVdLLENBQUM7SUFFekMsd0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQU0sVUFBVSxHQUE2QixFQUFFLENBQUM7UUFFaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsT0FBTztTQUNSO1FBRUQsS0FBSyxJQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUU7WUFDekIsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQixVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQzthQUM3QztTQUNGO1FBRUQsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsK0NBQWtCLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFNBQVMsQ0FBQztZQUM1QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDdkMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtTQUN4QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Z0JBakN3QixZQUFZOztJQVJyQztRQURDLEtBQUssRUFBRTsyREFDWTtJQUVwQjtRQURDLEtBQUssRUFBRTswREFDWTtJQUVwQjtRQURDLEtBQUssRUFBRTtnRUFDaUI7SUFFekI7UUFEQyxLQUFLLEVBQUU7Z0VBQ2lCO0lBWGQsa0JBQWtCO1FBSjlCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSwyQkFBMkI7U0FDdEMsQ0FBQztPQUNXLGtCQUFrQixDQStDOUI7SUFBRCx5QkFBQztDQUFBLEFBL0NELElBK0NDO1NBL0NZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcmF0aWN1bGUgfSBmcm9tICdvbCc7XG5pbXBvcnQgeyBTdHJva2UgfSBmcm9tICdvbC9zdHlsZSc7XG5pbXBvcnQgeyBNYXBDb21wb25lbnQgfSBmcm9tICcuL21hcC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhb2wtZ3JhdGljdWxlJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgR3JhdGljdWxlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBpbnN0YW5jZTogYW55O1xuICBwdWJsaWMgY29tcG9uZW50VHlwZSA9ICdncmF0aWN1bGUnO1xuXG4gIEBJbnB1dCgpXG4gIHN0cm9rZVN0eWxlOiBTdHJva2U7XG4gIEBJbnB1dCgpXG4gIHNob3dMYWJlbHM6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGxvbkxhYmVsUG9zaXRpb246IG51bWJlcjtcbiAgQElucHV0KClcbiAgbGF0TGFiZWxQb3NpdGlvbjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwOiBNYXBDb21wb25lbnQpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IHByb3BlcnRpZXM6IHsgW2luZGV4OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBwcm9wZXJ0aWVzW2tleV0gPSBjaGFuZ2VzW2tleV0uY3VycmVudFZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICB0aGlzLmluc3RhbmNlID0gbmV3IEdyYXRpY3VsZShwcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgdGhpcy5pbnN0YW5jZS5zZXRNYXAodGhpcy5tYXAuaW5zdGFuY2UpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgR3JhdGljdWxlKHtcbiAgICAgIHN0cm9rZVN0eWxlOiB0aGlzLnN0cm9rZVN0eWxlLFxuICAgICAgc2hvd0xhYmVsczogdGhpcy5zaG93TGFiZWxzLFxuICAgICAgbG9uTGFiZWxQb3NpdGlvbjogdGhpcy5sb25MYWJlbFBvc2l0aW9uLFxuICAgICAgbGF0TGFiZWxQb3NpdGlvbjogdGhpcy5sYXRMYWJlbFBvc2l0aW9uLFxuICAgIH0pO1xuICAgIHRoaXMuaW5zdGFuY2Uuc2V0TWFwKHRoaXMubWFwLmluc3RhbmNlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaW5zdGFuY2Uuc2V0TWFwKG51bGwpO1xuICB9XG59XG4iXX0=