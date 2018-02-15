import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LeLegalEntityTypesComponent } from './le-legal-entity-types.component';
import { LeLegalEntityTypesDetailComponent } from './le-legal-entity-types-detail.component';
import { LeLegalEntityTypesPopupComponent } from './le-legal-entity-types-dialog.component';
import { LeLegalEntityTypesDeletePopupComponent } from './le-legal-entity-types-delete-dialog.component';

export const leLegalEntityTypesRoute: Routes = [
    {
        path: 'le-legal-entity-types',
        component: LeLegalEntityTypesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntityTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'le-legal-entity-types/:id',
        component: LeLegalEntityTypesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntityTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const leLegalEntityTypesPopupRoute: Routes = [
    {
        path: 'le-legal-entity-types-new',
        component: LeLegalEntityTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntityTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'le-legal-entity-types/:id/edit',
        component: LeLegalEntityTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntityTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'le-legal-entity-types/:id/delete',
        component: LeLegalEntityTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntityTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
