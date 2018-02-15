import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpSalariesComponent } from './em-emp-salaries.component';
import { EmEmpSalariesDetailComponent } from './em-emp-salaries-detail.component';
import { EmEmpSalariesPopupComponent } from './em-emp-salaries-dialog.component';
import { EmEmpSalariesDeletePopupComponent } from './em-emp-salaries-delete-dialog.component';

export const emEmpSalariesRoute: Routes = [
    {
        path: 'em-emp-salaries',
        component: EmEmpSalariesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSalaries.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'em-emp-salaries/:id',
        component: EmEmpSalariesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSalaries.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emEmpSalariesPopupRoute: Routes = [
    {
        path: 'em-emp-salaries-new',
        component: EmEmpSalariesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSalaries.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-salaries/:id/edit',
        component: EmEmpSalariesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSalaries.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-salaries/:id/delete',
        component: EmEmpSalariesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSalaries.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
