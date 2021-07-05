import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { DonationService } from '../../../shared/services/donation.service';
import { ExportService } from '../../../shared/services/export.service';

import { tap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-donations-list',
  templateUrl: './donations-list.component.html',
  styleUrls: ['./donations-list.component.css']
})
export class DonationsListComponent implements OnInit {
  public donationsList: any[];
  public total = 0;
  public loading = false;
  private userList: any = [];
  public role: any = {};
  private isDisable = false;

  constructor(private donationService: DonationService, private route: Router, private exportService: ExportService,
    private userService: UserService, private authService: AuthentificationService) { }

  ngOnInit() {
    this.loading = true;
    this.active();
    setTimeout(() => {
      this.loading = false; 
      this.donationService.getDonations().subscribe(item => {
        this.donationsList = item;
      });      
    }, 500);
  }

  public createDonation(): void {
    this.route.navigate(['finances/registerDonation']);
  }

  public filterByDate(date?): void {
    this.total = 0;
    if (date) {
      const startDate = date[0];
      const endDate = date[1];
      const filtered: any = [];
      this.donationsList.forEach((event: any) => {
        if (new Date(event.date).getTime() >= startDate.getTime() &&
          new Date(event.date).getTime() <= endDate.getTime()) {
          filtered.push(event);
          this.total = this.total + parseInt(event.amount, 10);
        }
      });
      this.donationsList = filtered;
    } else {
      this.donationService.getDonations().subscribe(item => {
        this.donationsList = item;
        this.donationsList.forEach(donation => {
          this.total = this.total + parseInt(donation.amount, 10);
        });
      })
    }
  }

  public export(): void {
    const donationsAux: any = [];
    let donationAux: any = {};
    let totalDonation: any = {};
    this.donationsList.forEach(expense => {
      donationAux = {};
      donationAux.Fecha = expense.date;
      donationAux.Descripcion = expense.description;
      donationAux.Monto = expense.amount;
      donationsAux.push(donationAux);
    })
    totalDonation.Total = this.total;
    donationsAux.push(totalDonation)
    setTimeout(() => {
      this.exportService.exportExcel(donationsAux, 'donaciones');
    }, 2000);
  }

  private async active(): Promise<void> {
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
                this.getRole(element.position);
              }
            });
          });
      })
    ).subscribe();
  }

  private getRole(position: string): String {
    return (position === 'administrador') ? 'admin' : (position === 'medico') ? 'med' : (position === 'psiocolog') ? 'psico' : 'cont';
  }
}
