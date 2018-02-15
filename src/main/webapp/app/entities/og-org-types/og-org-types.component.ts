import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OgOrgTypes } from './og-org-types.model';
import { OgOrgTypesService } from './og-org-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-og-org-types',
    templateUrl: './og-org-types.component.html'
})
export class OgOrgTypesComponent implements OnInit, OnDestroy {
ogOrgTypes: OgOrgTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ogOrgTypesService: OgOrgTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ogOrgTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ogOrgTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOgOrgTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OgOrgTypes) {
        return item.id;
    }
    registerChangeInOgOrgTypes() {
        this.eventSubscriber = this.eventManager.subscribe('ogOrgTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
