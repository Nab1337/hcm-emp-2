import {Component, Input, OnInit} from '@angular/core';
import {EmEmpSalaries} from "../../../entities/em-emp-salaries/em-emp-salaries.model";
import {Subscription} from "rxjs/Subscription";
import {EmEmpSalariesService} from "../../../entities/em-emp-salaries/em-emp-salaries.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {Router} from "@angular/router";

@Component({
  selector: 'jhi-emp-payroll-changes',
  templateUrl: './emp-payroll-changes.component.html',
  styles: []
})
export class EmpPayrollChangesComponent implements OnInit {
    emEmpSalaries: EmEmpSalaries[];
    currentAccount: any;
    eventSubscriber: Subscription;
    @Input() employeeId;

    constructor(
        private emEmpSalariesService: EmEmpSalariesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    loadAll() {
        this.emEmpSalariesService.queryByEmployee(this.employeeId).subscribe(
            (res: ResponseWrapper) => {
                this.emEmpSalaries = res.json;
                console.log(this.emEmpSalaries);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.registerChangeInEmEmpSalaries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpSalaries) {
        return item.id;
    }
    registerChangeInEmEmpSalaries() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpSalariesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
