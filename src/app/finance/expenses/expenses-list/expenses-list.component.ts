import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ExpensesService } from '../../../shared/services/expenses.service';
import { ExportService } from '../../../shared/services/export.service';

import { tap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {
  expensesList: any[];
  total = 0;
  loading = false;
  userList: any = [];
  role: any = {};
  isDisable = false;

  constructor(private expensesService: ExpensesService, private router: Router, private exportService: ExportService,
    private userService: UserService, private authService: AuthentificationService) { }

  ngOnInit() {
    this.loading = true;
    this.active();
    setTimeout(() => {
      this.loading = false; 
      this.expensesService.getExpenses().subscribe(item => {
        this.expensesList = item;
      });      
    }, 500);
  }

  filterByDate(date?) {
    this.total = 0;
    if (date) {
      const startDate = date[0];
      const endDate = date[1];
      const filtered: any = [];
      this.expensesList.forEach((event: any) => {
        if (new Date(event.date).getTime() >= startDate.getTime() &&
          new Date(event.date).getTime() <= endDate.getTime()) {
          filtered.push(event);
          this.total = this.total + parseInt(event.amount, 10);
        }
      });
      this.expensesList = filtered;
    } else {
      this.expensesService.getExpenses().subscribe(item => {
        this.expensesList = item;
        this.expensesList.forEach(expense => {
          this.total = this.total + parseInt(expense.amount, 10);
        });
      })
    }
  }

  createExpense() {
    this.router.navigate(['finances/registerExpenses']);
  }

  export() {
    const expensesAux: any = [];
    let expenseAux: any = {};
    let totalExpense: any = {};
    this.expensesList.forEach(expense => {
      expenseAux = {};
      expenseAux.Fecha = expense.date;
      expenseAux.Descripcion = expense.description;
      expenseAux.Monto = expense.amount;
      expensesAux.push(expenseAux);
    })
    totalExpense.Total = this.total;
    expensesAux.push(totalExpense)
    setTimeout(() => {
      this.exportService.exportExcel(expensesAux, 'egresos');
    }, 2000);
  }

  async active() {
    this.authService.getCurrentUser().pipe(
      tap(current => {
        if(current)
          this.userService.getUser().subscribe(item => {
            this.userList = item;
            this.userList.forEach(element => {
              if(current.email == element.email)
              {
                if(element.isDisable)
                  this.isDisable = true;
                switch (element.position) {
                  case 'administrador':
                    this.role = 'admin';
                    break;
                  case 'medico':
                    this.role = 'med';
                    break;
                  case 'psicologo':
                    this.role = 'psico';
                    break;
                  case 'contador':
                    this.role = 'cont';
                    break;
                  default:
                    break;
                }
              }
            });
          });
      })
    ).subscribe();
  }
}
