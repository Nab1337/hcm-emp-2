import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpBankAccountsComponent } from './em-emp-bank-accounts.component';
import { EmEmpBankAccountsDetailComponent } from './em-emp-bank-accounts-detail.component';
import { EmEmpBankAccountsPopupComponent } from './em-emp-bank-accounts-dialog.component';
import { EmEmpBankAccountsDeletePopupComponent } from './em-emp-bank-accounts-delete-dialog.component';

export const emEmpBankAccountsRoute: Routes = [
    {
        path: 'em-emp-bank-accounts',
        component: EmEmpBankAccountsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpBankAccounts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'em-emp-bank-accounts/:id',
        component: EmEmpBankAccountsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpBankAccounts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emEmpBankAccountsPopupRoute: Routes = [
    {
        path: 'em-emp-bank-accounts-new',
        component: EmEmpBankAccountsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpBankAccounts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-bank-accounts/:id/edit',
        component: EmEmpBankAccountsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpBankAccounts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-bank-accounts/:id/delete',
        component: EmEmpBankAccountsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpBankAccounts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
