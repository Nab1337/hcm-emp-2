import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AtAccomplishmentTypesComponent } from './at-accomplishment-types.component';
import { AtAccomplishmentTypesDetailComponent } from './at-accomplishment-types-detail.component';
import { AtAccomplishmentTypesPopupComponent } from './at-accomplishment-types-dialog.component';
import { AtAccomplishmentTypesDeletePopupComponent } from './at-accomplishment-types-delete-dialog.component';

export const atAccomplishmentTypesRoute: Routes = [
    {
        path: 'at-accomplishment-types',
        component: AtAccomplishmentTypesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.atAccomplishmentTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'at-accomplishment-types/:id',
        component: AtAccomplishmentTypesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.atAccomplishmentTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const atAccomplishmentTypesPopupRoute: Routes = [
    {
        path: 'at-accomplishment-types-new',
        component: AtAccomplishmentTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.atAccomplishmentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'at-accomplishment-types/:id/edit',
        component: AtAccomplishmentTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.atAccomplishmentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'at-accomplishment-types/:id/delete',
        component: AtAccomplishmentTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.atAccomplishmentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
