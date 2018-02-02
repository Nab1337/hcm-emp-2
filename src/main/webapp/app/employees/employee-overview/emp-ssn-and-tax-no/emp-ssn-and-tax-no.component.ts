import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-emp-ssn-and-tax-no',
  templateUrl: './emp-ssn-and-tax-no.component.html',
  styles: []
})
export class EmpSsnAndTaxNoComponent implements OnInit {
    @Input() employee;
    @Input() isEditable;

  constructor() { }

  ngOnInit() {

  }

}
