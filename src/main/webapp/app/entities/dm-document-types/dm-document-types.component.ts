import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DmDocumentTypes } from './dm-document-types.model';
import { DmDocumentTypesService } from './dm-document-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dm-document-types',
    templateUrl: './dm-document-types.component.html'
})
export class DmDocumentTypesComponent implements OnInit, OnDestroy {
dmDocumentTypes: DmDocumentTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dmDocumentTypesService: DmDocumentTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dmDocumentTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dmDocumentTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDmDocumentTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DmDocumentTypes) {
        return item.id;
    }
    registerChangeInDmDocumentTypes() {
        this.eventSubscriber = this.eventManager.subscribe('dmDocumentTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
