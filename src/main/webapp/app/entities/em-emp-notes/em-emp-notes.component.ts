import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpNotes } from './em-emp-notes.model';
import { EmEmpNotesService } from './em-emp-notes.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-notes',
    templateUrl: './em-emp-notes.component.html'
})
export class EmEmpNotesComponent implements OnInit, OnDestroy {
emEmpNotes: EmEmpNotes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpNotesService: EmEmpNotesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpNotesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpNotes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpNotes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpNotes) {
        return item.id;
    }
    registerChangeInEmEmpNotes() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpNotesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
