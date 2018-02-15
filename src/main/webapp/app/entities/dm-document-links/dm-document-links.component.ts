import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DmDocumentLinks } from './dm-document-links.model';
import { DmDocumentLinksService } from './dm-document-links.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dm-document-links',
    templateUrl: './dm-document-links.component.html'
})
export class DmDocumentLinksComponent implements OnInit, OnDestroy {
dmDocumentLinks: DmDocumentLinks[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dmDocumentLinksService: DmDocumentLinksService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dmDocumentLinksService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dmDocumentLinks = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDmDocumentLinks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DmDocumentLinks) {
        return item.id;
    }
    registerChangeInDmDocumentLinks() {
        this.eventSubscriber = this.eventManager.subscribe('dmDocumentLinksListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
