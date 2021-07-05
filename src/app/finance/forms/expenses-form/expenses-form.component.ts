import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ExpensesModel } from '../../../shared/models/expenses.model';

import { ExpensesService } from '../../../shared/services/expenses.service';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.css']
})
export class ExpensesFormComponent implements OnInit {
  public myForm: FormGroup;

  @Input() public expenses: ExpensesModel;
  @Output() public onSubmit: EventEmitter<any>;

  constructor(private expensesService: ExpensesService, private formBuilder: FormBuilder,
    private router: Router) { 
    this.onSubmit = new EventEmitter<any>();
  }

  ngOnInit() {
    this.expenses = new ExpensesModel();
  }

  public saveExpenses(): void {
    this.onSubmit.emit(this.expenses);
  }

  public goToExpenses(): void {
    this.router.navigate(['/finances/showExpenses']);
  }
}
