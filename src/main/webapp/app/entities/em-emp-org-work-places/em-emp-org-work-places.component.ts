import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpOrgWorkPlaces } from './em-emp-org-work-places.model';
import { EmEmpOrgWorkPlacesService } from './em-emp-org-work-places.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-org-work-places',
    templateUrl: './em-emp-org-work-places.component.html'
})
export class EmEmpOrgWorkPlacesComponent implements OnInit, OnDestroy {
emEmpOrgWorkPlaces: EmEmpOrgWorkPlaces[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpOrgWorkPlacesService: EmEmpOrgWorkPlacesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpOrgWorkPlacesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpOrgWorkPlaces = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpOrgWorkPlaces();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpOrgWorkPlaces) {
        return item.id;
    }
    registerChangeInEmEmpOrgWorkPlaces() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpOrgWorkPlacesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
