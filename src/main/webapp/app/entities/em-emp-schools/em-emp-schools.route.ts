import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpSchoolsComponent } from './em-emp-schools.component';
import { EmEmpSchoolsDetailComponent } from './em-emp-schools-detail.component';
import { EmEmpSchoolsPopupComponent } from './em-emp-schools-dialog.component';
import { EmEmpSchoolsDeletePopupComponent } from './em-emp-schools-delete-dialog.component';

export const emEmpSchoolsRoute: Routes = [
    {
        path: 'em-emp-schools',
        component: EmEmpSchoolsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSchools.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'em-emp-schools/:id',
        component: EmEmpSchoolsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSchools.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emEmpSchoolsPopupRoute: Routes = [
    {
        path: 'em-emp-schools-new',
        component: EmEmpSchoolsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSchools.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-schools/:id/edit',
        component: EmEmpSchoolsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSchools.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-schools/:id/delete',
        component: EmEmpSchoolsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSchools.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
