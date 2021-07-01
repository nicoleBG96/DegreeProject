import { Component, OnInit } from '@angular/core';

import { MonthlyReportService } from '../../../shared/services/monthly-report.service';
import { MensualityService } from '../../../shared/services/mensuality.service';
import { ExpensesService } from '../../../shared/services/expenses.service';
import { DonationService } from '../../../shared/services/donation.service';
import { ExportService } from '../../../shared/services/export.service';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent implements OnInit {
  monthlyList: any = [];
  totalExpense = 0;
  totalIncome = 0;
  filterDate: any;
  loading = false;

  constructor(private mensualityService: MensualityService, private monthlyService: MonthlyReportService, private expenseService: ExpensesService,
    private donationService: DonationService, private exportService: ExportService) { }

  ngOnInit() {
    this.loading = true;
    this.monthlyService.resetFinanceReport();
    setTimeout(() => {
      this.loading = false;
      this.monthlyService.resetFinanceReport();
      this.registerExpense();
      this.registerDonations();
      this.registerMensuality();
      setTimeout(() => {
        this.monthlyList = this.monthlyService.getMonthly();
        this.monthlyList.forEach(element => {
          if (element.type !== 'expense')
            this.totalIncome = this.totalIncome + parseInt(element.amount);
          else
            this.totalExpense = this.totalExpense + parseInt(element.amount);
        });
      }, 700);
    }, 500);
  }

  registerMensuality() {
    this.monthlyList = [];
    this.mensualityService.getMensualities().subscribe(item => {
      this.monthlyList = item;
      this.monthlyList.forEach(aux => {
        this.monthlyService.createFinancesReport(aux);
      })
    });
  }

  registerExpense() {
    this.monthlyList = [];
    this.expenseService.getExpenses().subscribe(item => {
      this.monthlyList = item;
      this.monthlyList.forEach(aux => {
        this.monthlyService.createFinancesReport(aux);
      })
    })
  }

  registerDonations() {
    this.monthlyList = [];
    this.donationService.getDonations().subscribe(item => {
      this.monthlyList = item;
      this.monthlyList.forEach(aux => {
        this.monthlyService.createFinancesReport(aux);
      })
    })
  }

  calculateBalance() {
    let balance = this.totalIncome - this.totalExpense;
    return balance
  }

  isExpense(aux: any) {
    let type = false;
    if (aux.type === 'expense')
      type = true;
    else type = false
    return type;
  }

  filterByDate(date?) {
    this.totalExpense = 0;
    this.totalIncome = 0;
    if (date) {
      const startDate = date[0];
      const endDate = date[1];
      const filtered: any = [];
      this.monthlyList.forEach((event: any) => {
        if (new Date(event.date).getTime() >= startDate.getTime() &&
          new Date(event.date).getTime() <= endDate.getTime()) {
          filtered.push(event);
          if (event.type === 'expense')
            this.totalExpense = this.totalExpense + parseInt(event.amount, 10);
          else this.totalIncome = this.totalIncome + parseInt(event.amount, 10);
        }
      });
      this.monthlyList = filtered;
    } else {
      this.monthlyList = this.monthlyService.getMonthly();
      this.monthlyList.forEach(element => {
        if (element.type !== 'expense')
          this.totalIncome = this.totalIncome + parseInt(element.amount);
        else
          this.totalExpense = this.totalExpense + parseInt(element.amount);
      });
    }
  }

  export() {
    const monthlyAux: any = [];
    let elementAux: any = {};
    let totalMonthly: any = {};
    this.monthlyList.forEach(element => {
      elementAux = {};
      elementAux.Fecha = element.date;
      if (element.type !== 'mensuality')
        elementAux.Descripcion = element.description;
      else
        elementAux.Descripcion = element.firstName + " " + element.lastName + " " + 'pago de' + " " + element.month + " " + element.year;
      if (element.type !== 'expense') {
        elementAux.MontoIngreso = element.amount;
        elementAux.MontoEgreso = 0;
      } else {
        elementAux.MontoIngreso = 0;
        elementAux.MontoEgreso = element.amount;
      }
      monthlyAux.push(elementAux);
    });
    totalMonthly.MontoIngreso = this.totalIncome;
    totalMonthly.MontoEgreso = this.totalExpense;
    totalMonthly.Total = this.calculateBalance();
    monthlyAux.push(totalMonthly);
    this.exportService.exportExcel(monthlyAux, 'registro mensual');
  }
}
