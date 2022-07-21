import { OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Translate } from 'ol/interaction';
import { Collection, Feature } from 'ol';
import { Layer } from 'ol/layer';
import { TranslateEvent } from 'ol/interaction/Translate';
import { MapComponent } from '../map.component';
export declare class TranslateInteractionComponent implements OnInit, OnDestroy {
    private map;
    instance: Translate;
    features?: Collection<Feature>;
    layers?: Layer[] | ((layer: Layer) => boolean);
    hitTolerance?: number;
    olChange: EventEmitter<TranslateEvent>;
    propertyChange: EventEmitter<TranslateEvent>;
    translateEnd: EventEmitter<TranslateEvent>;
    translateStart: EventEmitter<TranslateEvent>;
    translating: EventEmitter<TranslateEvent>;
    constructor(map: MapComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
