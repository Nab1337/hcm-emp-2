import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpDocumentsComponent } from './em-emp-documents.component';
import { EmEmpDocumentsDetailComponent } from './em-emp-documents-detail.component';
import { EmEmpDocumentsPopupComponent } from './em-emp-documents-dialog.component';
import { EmEmpDocumentsDeletePopupComponent } from './em-emp-documents-delete-dialog.component';

export const emEmpDocumentsRoute: Routes = [
    {
        path: 'em-emp-documents',
        component: EmEmpDocumentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpDocuments.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'em-emp-documents/:id',
        component: EmEmpDocumentsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpDocuments.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emEmpDocumentsPopupRoute: Routes = [
    {
        path: 'em-emp-documents-new',
        component: EmEmpDocumentsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpDocuments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-documents/:id/edit',
        component: EmEmpDocumentsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpDocuments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-documents/:id/delete',
        component: EmEmpDocumentsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpDocuments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
