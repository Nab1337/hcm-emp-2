import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpBankAccounts } from './em-emp-bank-accounts.model';
import { EmEmpBankAccountsService } from './em-emp-bank-accounts.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-bank-accounts',
    templateUrl: './em-emp-bank-accounts.component.html'
})
export class EmEmpBankAccountsComponent implements OnInit, OnDestroy {
emEmpBankAccounts: EmEmpBankAccounts[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpBankAccountsService: EmEmpBankAccountsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpBankAccountsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpBankAccounts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpBankAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpBankAccounts) {
        return item.id;
    }
    registerChangeInEmEmpBankAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpBankAccountsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
