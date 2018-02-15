import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmContractTypes } from './em-contract-types.model';
import { EmContractTypesService } from './em-contract-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-contract-types',
    templateUrl: './em-contract-types.component.html'
})
export class EmContractTypesComponent implements OnInit, OnDestroy {
emContractTypes: EmContractTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emContractTypesService: EmContractTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emContractTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emContractTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmContractTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmContractTypes) {
        return item.id;
    }
    registerChangeInEmContractTypes() {
        this.eventSubscriber = this.eventManager.subscribe('emContractTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
