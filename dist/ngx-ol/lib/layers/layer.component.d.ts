import { OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import Event from 'ol/events/Event';
import { MapComponent } from '../map.component';
import { LayerGroupComponent } from './layergroup.component';
import { Extent } from 'ol/extent';
export declare abstract class LayerComponent implements OnInit, OnChanges, OnDestroy {
    protected host: MapComponent | LayerGroupComponent;
    instance: any;
    componentType: string;
    opacity: number;
    visible: boolean;
    extent: Extent;
    zIndex: number;
    minResolution: number;
    maxResolution: number;
    prerender: (evt: Event) => void;
    postrender: (evt: Event) => void;
    constructor(host: MapComponent | LayerGroupComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
