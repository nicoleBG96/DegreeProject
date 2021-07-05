import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExportService } from 'src/app/shared/services/export.service';

import { MensualityModel } from '../../../shared/models/mensuality.model';
import { MensualityService } from '../../../shared/services/mensuality.service';

import { tap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-show-mensuality-child',
  templateUrl: './show-mensuality-child.component.html',
  styleUrls: ['./show-mensuality-child.component.css']
})
export class ShowMensualityChildComponent implements OnInit {

  public mensuality = new MensualityModel();
  public mensualitiesList: any[];
  private childKey: any;
  public total = 0;
  public loading = false;
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
      this.mensuality = new MensualityModel();
      this.childKey = this.mensualityService.getChildKey();
      const filtered: any = [];
      this.mensualityService.getMensualities().subscribe(item => {
        this.mensualitiesList = item;
        this.mensualitiesList.forEach(mensuality => {
          if (mensuality.childKey == this.childKey) {
            filtered.push(mensuality);
          }
        });
        this.mensualitiesList = filtered;
      });
    }, 300);
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
    this.mensualityService.setMensuality(this.childKey);
    this.router.navigate(['finances/registerMensuality']);
  }

  public goToProfile(): void {
    this.router.navigate(['child/showProfile/' + this.childKey]);
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
      this.childKey = this.mensualityService.getChildKey();
      const filtered: any = [];
      this.mensualityService.getMensualities().subscribe(item => {
        this.mensualitiesList = item;
        console.log(this.mensualitiesList)
        this.mensualitiesList.forEach(mensuality => {
          if (mensuality.childKey == this.childKey) {
            filtered.push(mensuality);
            this.total = this.total + parseInt(mensuality.amount, 10);
          }
        });
        this.mensualitiesList = filtered;
      });
    }
  }

  private async active(): Promise<void> {
    this.authService.getCurrentUser().pipe(
      tap(current => {
        if (current)
          this.userService.getUser().subscribe(item => {
            this.userList = item;
            this.userList.forEach(element => {
              if (current.email == element.email) {
                if (element.isDisable)
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
