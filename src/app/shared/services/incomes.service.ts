import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  incomesList: any = [];

  constructor(private firebase: AngularFireDatabase) { }

  getIncomes() {
    return this.incomesList;
  }

  createIncomesReport(incomes: any) {
    this.incomesList.push(incomes);
  }

  resetFinanceReport() {
    this.incomesList = [];
  }
}
