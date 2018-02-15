import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {EmEmpAccomplishmentsService} from "../../../entities/em-emp-accomplishments/em-emp-accomplishments.service";
import {Subscription} from "rxjs/Subscription";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {EmEmpAccomplishments} from "../../../entities/em-emp-accomplishments/em-emp-accomplishments.model";
import {AtAccomplishmentTypes} from "../../../entities/at-accomplishment-types/at-accomplishment-types.model";
import {Router} from "@angular/router";

@Component({
    selector: 'jhi-emp-accomplishments',
    templateUrl: './emp-accomplishments.component.html',
    styles: []
})
export class EmpAccomplishmentsComponent implements OnInit,OnDestroy {
    @Input() employeeId;
    @Input() isEditable;
    emEmpAccomplishments: EmEmpAccomplishments[];
    eventSubscriber: Subscription;
    accomplishmentId: number;

    constructor(
        private emEmpAccomplishmentsService: EmEmpAccomplishmentsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private router: Router
    ) { }

    loadAll() {
        this.emEmpAccomplishmentsService.queryByEmployee(this.employeeId).subscribe(
            (res: ResponseWrapper) => {
                this.emEmpAccomplishments = res.json;
                console.log(this.emEmpAccomplishments);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.registerChangeInEmEmpAccomplishments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpAccomplishments() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpAccomplishmentsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    newAccomplishmentType(accomplishmentType: AtAccomplishmentTypes) {
        this.accomplishmentId = accomplishmentType.id;
        return accomplishmentType.name;
    }

    navigateEdit(id: number) {
        this.router.navigate(['/', { outlets: { popup: 'em-emp-accomplishments/'+ id + '/edit'} }]);
    }

    navigateAdd() {
        this.router.navigate(['/', { outlets: { popup: ['em-emp-accomplishments-new'] } }]);
    }
}
