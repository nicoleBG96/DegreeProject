import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  incomesList: any = [];

  constructor(private firebase: AngularFireDatabase) { }

  public getIncomes() {
    return this.incomesList;
  }

  public createIncomesReport(incomes: any): void {
    this.incomesList.push(incomes);
  }

  public resetFinanceReport(): void {
    this.incomesList = [];
  }
}
