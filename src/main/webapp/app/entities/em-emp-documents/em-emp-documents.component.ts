import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpDocuments } from './em-emp-documents.model';
import { EmEmpDocumentsService } from './em-emp-documents.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-documents',
    templateUrl: './em-emp-documents.component.html'
})
export class EmEmpDocumentsComponent implements OnInit, OnDestroy {
emEmpDocuments: EmEmpDocuments[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpDocumentsService: EmEmpDocumentsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpDocumentsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpDocuments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpDocuments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpDocuments) {
        return item.id;
    }
    registerChangeInEmEmpDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpDocumentsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
