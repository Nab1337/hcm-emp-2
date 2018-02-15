import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AtAccomplishmentTypes } from './at-accomplishment-types.model';
import { AtAccomplishmentTypesService } from './at-accomplishment-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-at-accomplishment-types',
    templateUrl: './at-accomplishment-types.component.html'
})
export class AtAccomplishmentTypesComponent implements OnInit, OnDestroy {
atAccomplishmentTypes: AtAccomplishmentTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private atAccomplishmentTypesService: AtAccomplishmentTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.atAccomplishmentTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.atAccomplishmentTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAtAccomplishmentTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AtAccomplishmentTypes) {
        return item.id;
    }
    registerChangeInAtAccomplishmentTypes() {
        this.eventSubscriber = this.eventManager.subscribe('atAccomplishmentTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
