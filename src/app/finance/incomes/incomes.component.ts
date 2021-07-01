import { Component, OnInit } from '@angular/core';
import { DonationService } from 'src/app/shared/services/donation.service';
import { ExportService } from 'src/app/shared/services/export.service';
import { IncomesService } from 'src/app/shared/services/incomes.service';
import { MensualityService } from 'src/app/shared/services/mensuality.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit {
  incomeList: any = [];
  totalIncome = 0;
  filterDate: any;
  loading = false;

  constructor(private mensualityService: MensualityService, private incomesService: IncomesService,
    private donationService: DonationService, private exportService: ExportService) { }

  ngOnInit() {
    this.loading = true;
    this.incomesService.resetFinanceReport();
    setTimeout(() => {
      this.loading = false;
      this.incomesService.resetFinanceReport();
      this.registerDonations();
      this.registerMensuality();
      setTimeout(() => {
        this.incomeList = this.incomesService.getIncomes();
        this.incomeList.forEach(element => {
          this.totalIncome = this.totalIncome + parseInt(element.amount);
        });
      }, 800);
    }, 300);
  }

  registerMensuality() {
    this.mensualityService.getMensualities().subscribe(item => {
      this.incomeList = item;
      this.incomeList.forEach(element => {
        this.incomesService.createIncomesReport(element);
      });
    });
  }

  registerDonations() {
    this.donationService.getDonations().subscribe(item => {
      this.incomeList = item;
      this.incomeList.forEach(element => {
        this.incomesService.createIncomesReport(element);
      });
    })
  }

  filterByDate(date?) {
    this.totalIncome = 0;
    if (date) {
      const startDate = date[0];
      const endDate = date[1];
      const filtered: any = [];
      this.incomeList.forEach((event: any) => {
        if (new Date(event.date).getTime() >= startDate.getTime() &&
          new Date(event.date).getTime() <= endDate.getTime()) {
          filtered.push(event);
          this.totalIncome = this.totalIncome + parseInt(event.amount, 10);
        }
      });
      this.incomeList = filtered;
    } else {
      this.incomeList = this.incomesService.getIncomes();
        this.incomeList.forEach(element => {
          this.totalIncome = this.totalIncome + parseInt(element.amount);
        });
    }
  }

  export() {
    const incomeAux: any = [];
    let elementAux: any = {};
    let totalIncome: any = {};
    this.incomeList.forEach(element => {
      elementAux = {};
      elementAux.Fecha = element.date;
      if (element.type !== 'mensuality')
        elementAux.Descripcion = element.description;
      else
        elementAux.Descripcion = element.firstName + " " + element.lastName + " " + 'pago de' + " " + element.month + " " + element.year;
      elementAux.MontoIngreso = element.amount;
      incomeAux.push(elementAux);
    });
    totalIncome.MontoIngreso = this.totalIncome;
    incomeAux.push(totalIncome);
    this.exportService.exportExcel(incomeAux, 'ingresos');
  }

}
