import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LeLegalEntityTypes } from './le-legal-entity-types.model';
import { LeLegalEntityTypesService } from './le-legal-entity-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-le-legal-entity-types',
    templateUrl: './le-legal-entity-types.component.html'
})
export class LeLegalEntityTypesComponent implements OnInit, OnDestroy {
leLegalEntityTypes: LeLegalEntityTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private leLegalEntityTypesService: LeLegalEntityTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.leLegalEntityTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.leLegalEntityTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLeLegalEntityTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LeLegalEntityTypes) {
        return item.id;
    }
    registerChangeInLeLegalEntityTypes() {
        this.eventSubscriber = this.eventManager.subscribe('leLegalEntityTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
