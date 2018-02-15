import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpSchools } from './em-emp-schools.model';
import { EmEmpSchoolsService } from './em-emp-schools.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-schools',
    templateUrl: './em-emp-schools.component.html'
})
export class EmEmpSchoolsComponent implements OnInit, OnDestroy {
emEmpSchools: EmEmpSchools[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpSchoolsService: EmEmpSchoolsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpSchoolsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpSchools = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpSchools();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpSchools) {
        return item.id;
    }
    registerChangeInEmEmpSchools() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpSchoolsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
