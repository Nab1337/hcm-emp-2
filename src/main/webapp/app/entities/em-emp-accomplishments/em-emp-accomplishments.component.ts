import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpAccomplishments } from './em-emp-accomplishments.model';
import { EmEmpAccomplishmentsService } from './em-emp-accomplishments.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-accomplishments',
    templateUrl: './em-emp-accomplishments.component.html'
})
export class EmEmpAccomplishmentsComponent implements OnInit, OnDestroy {
emEmpAccomplishments: EmEmpAccomplishments[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpAccomplishmentsService: EmEmpAccomplishmentsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpAccomplishmentsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpAccomplishments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpAccomplishments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpAccomplishments) {
        return item.id;
    }
    registerChangeInEmEmpAccomplishments() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpAccomplishmentsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
