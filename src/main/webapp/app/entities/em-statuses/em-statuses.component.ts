import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmStatuses } from './em-statuses.model';
import { EmStatusesService } from './em-statuses.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-statuses',
    templateUrl: './em-statuses.component.html'
})
export class EmStatusesComponent implements OnInit, OnDestroy {
emStatuses: EmStatuses[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emStatusesService: EmStatusesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emStatusesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emStatuses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmStatuses) {
        return item.id;
    }
    registerChangeInEmStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('emStatusesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
