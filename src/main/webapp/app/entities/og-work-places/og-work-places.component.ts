import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OgWorkPlaces } from './og-work-places.model';
import { OgWorkPlacesService } from './og-work-places.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-og-work-places',
    templateUrl: './og-work-places.component.html'
})
export class OgWorkPlacesComponent implements OnInit, OnDestroy {
ogWorkPlaces: OgWorkPlaces[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ogWorkPlacesService: OgWorkPlacesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ogWorkPlacesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ogWorkPlaces = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOgWorkPlaces();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OgWorkPlaces) {
        return item.id;
    }
    registerChangeInOgWorkPlaces() {
        this.eventSubscriber = this.eventManager.subscribe('ogWorkPlacesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
