import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpPreviousJobs } from './em-emp-previous-jobs.model';
import { EmEmpPreviousJobsService } from './em-emp-previous-jobs.service';

@Injectable()
export class EmEmpPreviousJobsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpPreviousJobsService: EmEmpPreviousJobsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.emEmpPreviousJobsService.find(id).subscribe((emEmpPreviousJobs) => {
                    emEmpPreviousJobs.dateFrom = this.datePipe
                        .transform(emEmpPreviousJobs.dateFrom, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpPreviousJobs.dateTo = this.datePipe
                        .transform(emEmpPreviousJobs.dateTo, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpPreviousJobs.createdAt = this.datePipe
                        .transform(emEmpPreviousJobs.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpPreviousJobs.updatedAt = this.datePipe
                        .transform(emEmpPreviousJobs.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpPreviousJobsModalRef(component, emEmpPreviousJobs);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpPreviousJobsModalRef(component, new EmEmpPreviousJobs());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpPreviousJobsModalRef(component: Component, emEmpPreviousJobs: EmEmpPreviousJobs): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpPreviousJobs = emEmpPreviousJobs;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
