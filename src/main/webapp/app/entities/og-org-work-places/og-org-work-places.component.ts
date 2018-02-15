import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OgOrgWorkPlaces } from './og-org-work-places.model';
import { OgOrgWorkPlacesService } from './og-org-work-places.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-og-org-work-places',
    templateUrl: './og-org-work-places.component.html'
})
export class OgOrgWorkPlacesComponent implements OnInit, OnDestroy {
ogOrgWorkPlaces: OgOrgWorkPlaces[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ogOrgWorkPlacesService: OgOrgWorkPlacesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ogOrgWorkPlacesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ogOrgWorkPlaces = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOgOrgWorkPlaces();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OgOrgWorkPlaces) {
        return item.id;
    }
    registerChangeInOgOrgWorkPlaces() {
        this.eventSubscriber = this.eventManager.subscribe('ogOrgWorkPlacesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
