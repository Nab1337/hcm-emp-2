import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpAccomplishmentsComponent } from './em-emp-accomplishments.component';
import { EmEmpAccomplishmentsDetailComponent } from './em-emp-accomplishments-detail.component';
import { EmEmpAccomplishmentsPopupComponent } from './em-emp-accomplishments-dialog.component';
import { EmEmpAccomplishmentsDeletePopupComponent } from './em-emp-accomplishments-delete-dialog.component';

export const emEmpAccomplishmentsRoute: Routes = [
    {
        path: 'em-emp-accomplishments',
        component: EmEmpAccomplishmentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpAccomplishments.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'em-emp-accomplishments/:id',
        component: EmEmpAccomplishmentsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpAccomplishments.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emEmpAccomplishmentsPopupRoute: Routes = [
    {
        path: 'em-emp-accomplishments-new',
        component: EmEmpAccomplishmentsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpAccomplishments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-accomplishments/:id/edit',
        component: EmEmpAccomplishmentsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpAccomplishments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-accomplishments/:id/delete',
        component: EmEmpAccomplishmentsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpAccomplishments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
