import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    DmDocumentLinksService,
    DmDocumentLinksPopupService,
    DmDocumentLinksComponent,
    DmDocumentLinksDetailComponent,
    DmDocumentLinksDialogComponent,
    DmDocumentLinksPopupComponent,
    DmDocumentLinksDeletePopupComponent,
    DmDocumentLinksDeleteDialogComponent,
    dmDocumentLinksRoute,
    dmDocumentLinksPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dmDocumentLinksRoute,
    ...dmDocumentLinksPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DmDocumentLinksComponent,
        DmDocumentLinksDetailComponent,
        DmDocumentLinksDialogComponent,
        DmDocumentLinksDeleteDialogComponent,
        DmDocumentLinksPopupComponent,
        DmDocumentLinksDeletePopupComponent,
    ],
    entryComponents: [
        DmDocumentLinksComponent,
        DmDocumentLinksDialogComponent,
        DmDocumentLinksPopupComponent,
        DmDocumentLinksDeleteDialogComponent,
        DmDocumentLinksDeletePopupComponent,
    ],
    providers: [
        DmDocumentLinksService,
        DmDocumentLinksPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpDmDocumentLinksModule {}
