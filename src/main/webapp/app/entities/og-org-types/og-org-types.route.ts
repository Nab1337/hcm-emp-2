import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OgOrgTypesComponent } from './og-org-types.component';
import { OgOrgTypesDetailComponent } from './og-org-types-detail.component';
import { OgOrgTypesPopupComponent } from './og-org-types-dialog.component';
import { OgOrgTypesDeletePopupComponent } from './og-org-types-delete-dialog.component';

export const ogOrgTypesRoute: Routes = [
    {
        path: 'og-org-types',
        component: OgOrgTypesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'og-org-types/:id',
        component: OgOrgTypesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ogOrgTypesPopupRoute: Routes = [
    {
        path: 'og-org-types-new',
        component: OgOrgTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-org-types/:id/edit',
        component: OgOrgTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-org-types/:id/delete',
        component: OgOrgTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
