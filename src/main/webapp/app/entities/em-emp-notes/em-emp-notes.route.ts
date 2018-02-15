import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpNotesComponent } from './em-emp-notes.component';
import { EmEmpNotesDetailComponent } from './em-emp-notes-detail.component';
import { EmEmpNotesPopupComponent } from './em-emp-notes-dialog.component';
import { EmEmpNotesDeletePopupComponent } from './em-emp-notes-delete-dialog.component';

export const emEmpNotesRoute: Routes = [
    {
        path: 'em-emp-notes',
        component: EmEmpNotesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpNotes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'em-emp-notes/:id',
        component: EmEmpNotesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpNotes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emEmpNotesPopupRoute: Routes = [
    {
        path: 'em-emp-notes-new',
        component: EmEmpNotesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpNotes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-notes/:id/edit',
        component: EmEmpNotesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpNotes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-notes/:id/delete',
        component: EmEmpNotesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpNotes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
