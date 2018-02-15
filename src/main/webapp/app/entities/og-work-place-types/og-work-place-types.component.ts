import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OgWorkPlaceTypes } from './og-work-place-types.model';
import { OgWorkPlaceTypesService } from './og-work-place-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-og-work-place-types',
    templateUrl: './og-work-place-types.component.html'
})
export class OgWorkPlaceTypesComponent implements OnInit, OnDestroy {
ogWorkPlaceTypes: OgWorkPlaceTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ogWorkPlaceTypesService: OgWorkPlaceTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ogWorkPlaceTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ogWorkPlaceTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOgWorkPlaceTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OgWorkPlaceTypes) {
        return item.id;
    }
    registerChangeInOgWorkPlaceTypes() {
        this.eventSubscriber = this.eventManager.subscribe('ogWorkPlaceTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
