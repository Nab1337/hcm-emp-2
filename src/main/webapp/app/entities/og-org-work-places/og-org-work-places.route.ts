import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OgOrgWorkPlacesComponent } from './og-org-work-places.component';
import { OgOrgWorkPlacesDetailComponent } from './og-org-work-places-detail.component';
import { OgOrgWorkPlacesPopupComponent } from './og-org-work-places-dialog.component';
import { OgOrgWorkPlacesDeletePopupComponent } from './og-org-work-places-delete-dialog.component';

export const ogOrgWorkPlacesRoute: Routes = [
    {
        path: 'og-org-work-places',
        component: OgOrgWorkPlacesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'og-org-work-places/:id',
        component: OgOrgWorkPlacesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ogOrgWorkPlacesPopupRoute: Routes = [
    {
        path: 'og-org-work-places-new',
        component: OgOrgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-org-work-places/:id/edit',
        component: OgOrgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-org-work-places/:id/delete',
        component: OgOrgWorkPlacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
