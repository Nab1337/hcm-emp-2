import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DmDocumentLinksComponent } from './dm-document-links.component';
import { DmDocumentLinksDetailComponent } from './dm-document-links-detail.component';
import { DmDocumentLinksPopupComponent } from './dm-document-links-dialog.component';
import { DmDocumentLinksDeletePopupComponent } from './dm-document-links-delete-dialog.component';

export const dmDocumentLinksRoute: Routes = [
    {
        path: 'dm-document-links',
        component: DmDocumentLinksComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentLinks.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dm-document-links/:id',
        component: DmDocumentLinksDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentLinks.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dmDocumentLinksPopupRoute: Routes = [
    {
        path: 'dm-document-links-new',
        component: DmDocumentLinksPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentLinks.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dm-document-links/:id/edit',
        component: DmDocumentLinksPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentLinks.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dm-document-links/:id/delete',
        component: DmDocumentLinksDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentLinks.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
