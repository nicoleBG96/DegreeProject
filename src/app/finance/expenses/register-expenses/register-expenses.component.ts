import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ExpensesModel } from '../../../shared/models/expenses.model';

import { ExpensesService } from '../../../shared/services/expenses.service';

@Component({
  selector: 'app-register-expenses',
  templateUrl: './register-expenses.component.html',
  styleUrls: ['./register-expenses.component.css']
})
export class RegisterExpensesComponent {

  constructor(private expensesService: ExpensesService, private router: Router, private toastrService: ToastrService) { }

  public registerExpenses(event: ExpensesModel): void {
    if (this.validateExpenseForm(event)) {
      this.expensesService.createExpense(event);
      this.router.navigate(['/finances/showExpenses']);
      this.toastrService.success('exito al registrar', 'ÉXITO');
    } else {
      this.toastrService.error('error al registrar existen campos vacios, ERROR');
    }
  }

  private validateExpenseForm(event: any): boolean {
    let correct = true;
    if (event.date === null || event.amount === '' || event.description === '' || event.date === undefined) {
      correct = false;
    }
    return correct;
  }
}
