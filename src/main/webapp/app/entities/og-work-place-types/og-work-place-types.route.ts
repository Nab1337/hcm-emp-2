import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OgWorkPlaceTypesComponent } from './og-work-place-types.component';
import { OgWorkPlaceTypesDetailComponent } from './og-work-place-types-detail.component';
import { OgWorkPlaceTypesPopupComponent } from './og-work-place-types-dialog.component';
import { OgWorkPlaceTypesDeletePopupComponent } from './og-work-place-types-delete-dialog.component';

export const ogWorkPlaceTypesRoute: Routes = [
    {
        path: 'og-work-place-types',
        component: OgWorkPlaceTypesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'og-work-place-types/:id',
        component: OgWorkPlaceTypesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ogWorkPlaceTypesPopupRoute: Routes = [
    {
        path: 'og-work-place-types-new',
        component: OgWorkPlaceTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-work-place-types/:id/edit',
        component: OgWorkPlaceTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-work-place-types/:id/delete',
        component: OgWorkPlaceTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
