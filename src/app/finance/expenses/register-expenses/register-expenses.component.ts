import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ExpensesModel } from '../../../shared/models/expenses.model';

import { ExpensesService } from '../../../shared/services/expenses.service';

@Component({
  selector: 'app-register-expenses',
  templateUrl: './register-expenses.component.html',
  styleUrls: ['./register-expenses.component.css']
})
export class RegisterExpensesComponent implements OnInit {

  constructor(private expensesService: ExpensesService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  registerExpenses(event: ExpensesModel) {
    if (this.validate(event)) {
      this.expensesService.createExpense(event);
      this.router.navigate(['/finances/showExpenses']);
      this.toastrService.success('exito al registrar', 'ÉXITO');
    } else {
      this.toastrService.error('error al registrar existen campos vacios, ERROR');
    }
  }

  validate(event: any) {
    let correct = true;
    if (event.date === null || event.amount === '' || event.description === '' || event.date === undefined) {
      correct = false;
    }
    return correct;
  }

}
