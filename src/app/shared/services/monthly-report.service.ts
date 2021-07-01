import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MonthlyReportService {
  financesMonthlyList: any = [];

  constructor(private firebase: AngularFireDatabase) { }

  getMonthly() {
    return this.financesMonthlyList;
  }

  createFinancesReport(monthly: any) {
    this.financesMonthlyList.push(monthly)
  }

  resetFinanceReport() {
    this.financesMonthlyList = [];
  }
}
