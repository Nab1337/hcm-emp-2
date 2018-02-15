import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmStatusesComponent } from './em-statuses.component';
import { EmStatusesDetailComponent } from './em-statuses-detail.component';
import { EmStatusesPopupComponent } from './em-statuses-dialog.component';
import { EmStatusesDeletePopupComponent } from './em-statuses-delete-dialog.component';

export const emStatusesRoute: Routes = [
    {
        path: 'em-statuses',
        component: EmStatusesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emStatuses.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'em-statuses/:id',
        component: EmStatusesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emStatuses.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emStatusesPopupRoute: Routes = [
    {
        path: 'em-statuses-new',
        component: EmStatusesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emStatuses.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-statuses/:id/edit',
        component: EmStatusesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emStatuses.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-statuses/:id/delete',
        component: EmStatusesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emStatuses.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
