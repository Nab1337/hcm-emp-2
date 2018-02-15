import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OgWorkPlacesComponent } from './og-work-places.component';
import { OgWorkPlacesDetailComponent } from './og-work-places-detail.component';
import { OgWorkPlacesPopupComponent } from './og-work-places-dialog.component';
import { OgWorkPlacesDeletePopupComponent } from './og-work-places-delete-dialog.component';

export const ogWorkPlacesRoute: Routes = [
    {
        path: 'og-work-places',
        component: OgWorkPlacesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'og-work-places/:id',
        component: OgWorkPlacesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ogWorkPlacesPopupRoute: Routes = [
    {
        path: 'og-work-places-new',
        component: OgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-work-places/:id/edit',
        component: OgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-work-places/:id/delete',
        component: OgWorkPlacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
