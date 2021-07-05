import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MensualityModel } from '../../../shared/models/mensuality.model';

import { MensualityService } from '../../../shared/services/mensuality.service';

@Component({
  selector: 'app-register-mensuality',
  templateUrl: './register-mensuality.component.html',
  styleUrls: ['./register-mensuality.component.css']
})
export class RegisterMensualityComponent {

  constructor(private mensualityService: MensualityService, private router: Router, private toastrService: ToastrService) { }

  public registerMensuality(event: MensualityModel): void {
    if(this.validateMensualityForm (event)) {
      const latestKey = this.mensualityService.createMensuality(event);
      this.router.navigate(['finances/showMensuality/' + latestKey]);
      this.toastrService.success('exito al registrar', 'ÉXITO');
    } else {
      this.toastrService.error('error al registrar existen campos vacios, ERROR');
    }
  }

  private validateMensualityForm(event: MensualityModel): boolean {
    let correct = true;
    if (event.firstName === '' || event.lastName === '' || event.mothersLastName === '' || 
    event.month === '' || event.month === undefined || event.amount === '' || event.amount === undefined 
    || event.date === null || event.year === '' || event.year === undefined || event.date === undefined) {
      correct = false;
    }
    return correct;
  }
}
