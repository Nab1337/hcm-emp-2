import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpSalaries } from './em-emp-salaries.model';
import { EmEmpSalariesService } from './em-emp-salaries.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-salaries',
    templateUrl: './em-emp-salaries.component.html'
})
export class EmEmpSalariesComponent implements OnInit, OnDestroy {
emEmpSalaries: EmEmpSalaries[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpSalariesService: EmEmpSalariesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpSalariesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpSalaries = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpSalaries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpSalaries) {
        return item.id;
    }
    registerChangeInEmEmpSalaries() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpSalariesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
