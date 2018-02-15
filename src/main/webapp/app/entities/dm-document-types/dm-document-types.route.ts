import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DmDocumentTypesComponent } from './dm-document-types.component';
import { DmDocumentTypesDetailComponent } from './dm-document-types-detail.component';
import { DmDocumentTypesPopupComponent } from './dm-document-types-dialog.component';
import { DmDocumentTypesDeletePopupComponent } from './dm-document-types-delete-dialog.component';

export const dmDocumentTypesRoute: Routes = [
    {
        path: 'dm-document-types',
        component: DmDocumentTypesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dm-document-types/:id',
        component: DmDocumentTypesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dmDocumentTypesPopupRoute: Routes = [
    {
        path: 'dm-document-types-new',
        component: DmDocumentTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dm-document-types/:id/edit',
        component: DmDocumentTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dm-document-types/:id/delete',
        component: DmDocumentTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
