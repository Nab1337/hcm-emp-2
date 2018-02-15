import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpTypesComponent } from './em-emp-types.component';
import { EmEmpTypesDetailComponent } from './em-emp-types-detail.component';
import { EmEmpTypesPopupComponent } from './em-emp-types-dialog.component';
import { EmEmpTypesDeletePopupComponent } from './em-emp-types-delete-dialog.component';

export const emEmpTypesRoute: Routes = [
    {
        path: 'em-emp-types',
        component: EmEmpTypesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'em-emp-types/:id',
        component: EmEmpTypesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emEmpTypesPopupRoute: Routes = [
    {
        path: 'em-emp-types-new',
        component: EmEmpTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-types/:id/edit',
        component: EmEmpTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-types/:id/delete',
        component: EmEmpTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
