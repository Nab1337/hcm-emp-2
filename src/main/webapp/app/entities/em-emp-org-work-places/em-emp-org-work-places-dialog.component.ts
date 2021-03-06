import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpOrgWorkPlaces } from './em-emp-org-work-places.model';
import { EmEmpOrgWorkPlacesPopupService } from './em-emp-org-work-places-popup.service';
import { EmEmpOrgWorkPlacesService } from './em-emp-org-work-places.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { EmContractTypes, EmContractTypesService } from '../em-contract-types';
import { OgOrgWorkPlaces, OgOrgWorkPlacesService } from '../og-org-work-places';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-org-work-places-dialog',
    templateUrl: './em-emp-org-work-places-dialog.component.html'
})
export class EmEmpOrgWorkPlacesDialogComponent implements OnInit {

    emEmpOrgWorkPlaces: EmEmpOrgWorkPlaces;
    isSaving: boolean;

    idemployees: EmEmployees[];

    idcontracttypes: EmContractTypes[];

    idorgworkplaces: OgOrgWorkPlaces[];
    dateFromDp: any;
    dateToDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpOrgWorkPlacesService: EmEmpOrgWorkPlacesService,
        private emEmployeesService: EmEmployeesService,
        private emContractTypesService: EmContractTypesService,
        private ogOrgWorkPlacesService: OgOrgWorkPlacesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'ememporgworkplaces-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpOrgWorkPlaces.idEmployee || !this.emEmpOrgWorkPlaces.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpOrgWorkPlaces.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.emContractTypesService
            .query({filter: 'ememporgworkplaces-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpOrgWorkPlaces.idContractType || !this.emEmpOrgWorkPlaces.idContractType.id) {
                    this.idcontracttypes = res.json;
                } else {
                    this.emContractTypesService
                        .find(this.emEmpOrgWorkPlaces.idContractType.id)
                        .subscribe((subRes: EmContractTypes) => {
                            this.idcontracttypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.ogOrgWorkPlacesService
            .query({filter: 'ememporgworkplaces-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpOrgWorkPlaces.idOrgWorkPlace || !this.emEmpOrgWorkPlaces.idOrgWorkPlace.id) {
                    this.idorgworkplaces = res.json;
                } else {
                    this.ogOrgWorkPlacesService
                        .find(this.emEmpOrgWorkPlaces.idOrgWorkPlace.id)
                        .subscribe((subRes: OgOrgWorkPlaces) => {
                            this.idorgworkplaces = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emEmpOrgWorkPlaces.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpOrgWorkPlacesService.update(this.emEmpOrgWorkPlaces));
        } else {
            this.subscribeToSaveResponse(
                this.emEmpOrgWorkPlacesService.create(this.emEmpOrgWorkPlaces));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpOrgWorkPlaces>) {
        result.subscribe((res: EmEmpOrgWorkPlaces) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpOrgWorkPlaces) {
        this.eventManager.broadcast({ name: 'emEmpOrgWorkPlacesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmEmployeesById(index: number, item: EmEmployees) {
        return item.id;
    }

    trackEmContractTypesById(index: number, item: EmContractTypes) {
        return item.id;
    }

    trackOgOrgWorkPlacesById(index: number, item: OgOrgWorkPlaces) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-org-work-places-popup',
    template: ''
})
export class EmEmpOrgWorkPlacesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpOrgWorkPlacesPopupService: EmEmpOrgWorkPlacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpOrgWorkPlacesPopupService
                    .open(EmEmpOrgWorkPlacesDialogComponent as Component, params['id']);
            } else {
                this.emEmpOrgWorkPlacesPopupService
                    .open(EmEmpOrgWorkPlacesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
