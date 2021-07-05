import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MensualityService } from '../../../shared/services/mensuality.service';
import { ExportService } from '../../../shared/services/export.service';

import { tap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-mensuality-list',
  templateUrl: './mensuality-list.component.html',
  styleUrls: ['./mensuality-list.component.css']
})
export class MensualityListComponent implements OnInit {
  public mensualitiesList: any[];
  public total = 0;
  public loading = false;
  public loadingButton  = false;
  private userList: any = [];
  public role: any = {};
  private isDisable = false;

  constructor(private mensualityService: MensualityService, private router: Router, private exportService: ExportService,
    private userService: UserService, private authService: AuthentificationService) { }

  ngOnInit() {
    this.loading = true; 
    this.active();
    setTimeout(() => {
      this.loading = false;
      this.mensualityService.getMensualities().subscribe(item => {
        this.mensualitiesList = item;
      });
    }, 500);
  }

  public goToMensuality(mensuality: any): void {
    this.router.navigate(['finances/showMensuality/' + mensuality.key]);
  }

  public filterByDate(date?): void {
    this.total = 0;
    if (date) {
      const startDate = date[0];
      const endDate = date[1];
      const filtered: any = [];
      this.mensualitiesList.forEach((event: any) => {
        if (new Date(event.date).getTime() >= startDate.getTime() &&
        new Date(event.date).getTime() <= endDate.getTime()) {
          filtered.push(event);
          this.total = this.total + parseInt(event.amount, 10);
        }
      });
      this.mensualitiesList = filtered;
    } else {
      this.mensualityService.getMensualities().subscribe(item => {
        this.mensualitiesList = item;
        this.mensualitiesList.forEach(mensuality => {
          this.total = this.total + parseInt(mensuality.amount, 10);
        });
      })
    }
  }

  public export(): void {
    const mensualitiesAux: any = [];
    let mensualityAux: any = {};
    let totalMensuality: any = {};
    this.mensualitiesList.forEach(mensuality => {
      mensualityAux = {};
      mensualityAux.Nombre = mensuality.firstName;
      mensualityAux.ApellidoPaterno = mensuality.lastName;
      mensualityAux.ApellidoMaterno = mensuality.mothersLastName;
      mensualityAux.Fecha = mensuality.date;
      mensualityAux.MesAPagar = mensuality.monthToPay;
      mensualityAux.Monto = mensuality.amount;
      mensualitiesAux.push(mensualityAux);
    });
    totalMensuality.Total = this.total;
    mensualitiesAux.push(totalMensuality);
    setTimeout(() => {
      this.exportService.exportExcel(mensualitiesAux, 'mensualidades');
    }, 2000);
  }

  public createMensuality(): void {
    this.loadingButton = true;
    setTimeout(() => {
      this.router.navigate(['child/profiles']);
    }, 300);
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
