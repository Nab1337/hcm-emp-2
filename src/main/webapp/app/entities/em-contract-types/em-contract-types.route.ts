import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmContractTypesComponent } from './em-contract-types.component';
import { EmContractTypesDetailComponent } from './em-contract-types-detail.component';
import { EmContractTypesPopupComponent } from './em-contract-types-dialog.component';
import { EmContractTypesDeletePopupComponent } from './em-contract-types-delete-dialog.component';

export const emContractTypesRoute: Routes = [
    {
        path: 'em-contract-types',
        component: EmContractTypesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emContractTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'em-contract-types/:id',
        component: EmContractTypesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emContractTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emContractTypesPopupRoute: Routes = [
    {
        path: 'em-contract-types-new',
        component: EmContractTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emContractTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-contract-types/:id/edit',
        component: EmContractTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emContractTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-contract-types/:id/delete',
        component: EmContractTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emContractTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
