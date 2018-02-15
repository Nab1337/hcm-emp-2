import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpOrgWorkPlacesComponent } from './em-emp-org-work-places.component';
import { EmEmpOrgWorkPlacesDetailComponent } from './em-emp-org-work-places-detail.component';
import { EmEmpOrgWorkPlacesPopupComponent } from './em-emp-org-work-places-dialog.component';
import { EmEmpOrgWorkPlacesDeletePopupComponent } from './em-emp-org-work-places-delete-dialog.component';

export const emEmpOrgWorkPlacesRoute: Routes = [
    {
        path: 'em-emp-org-work-places',
        component: EmEmpOrgWorkPlacesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'em-emp-org-work-places/:id',
        component: EmEmpOrgWorkPlacesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emEmpOrgWorkPlacesPopupRoute: Routes = [
    {
        path: 'em-emp-org-work-places-new',
        component: EmEmpOrgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-org-work-places/:id/edit',
        component: EmEmpOrgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-org-work-places/:id/delete',
        component: EmEmpOrgWorkPlacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
