import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MonthlyReportService {
  financesMonthlyList: any = [];

  constructor(private firebase: AngularFireDatabase) { }

  public getMonthly() {
    return this.financesMonthlyList;
  }

  public createFinancesReport(monthly: any): void {
    this.financesMonthlyList.push(monthly)
  }

  public resetFinanceReport(): void {
    this.financesMonthlyList = [];
  }
}
