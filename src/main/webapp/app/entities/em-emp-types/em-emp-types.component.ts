import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpTypes } from './em-emp-types.model';
import { EmEmpTypesService } from './em-emp-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-types',
    templateUrl: './em-emp-types.component.html'
})
export class EmEmpTypesComponent implements OnInit, OnDestroy {
emEmpTypes: EmEmpTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpTypesService: EmEmpTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpTypes) {
        return item.id;
    }
    registerChangeInEmEmpTypes() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
