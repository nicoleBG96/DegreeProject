import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DonationService } from '../../../shared/services/donation.service';

import { DonationsModel } from '../../../shared/models/donations.model';

@Component({
  selector: 'app-register-donation',
  templateUrl: './register-donation.component.html',
  styleUrls: ['./register-donation.component.css']
})
export class RegisterDonationComponent {

  constructor(private donationService: DonationService, private router: Router, private toastrService: ToastrService) { }

  public registerDonation(event: DonationsModel): void {
    if (this.validateDonationForm(event)) {
      this.donationService.createDonation(event);
      this.router.navigate(['/finances/showDonations']);
      this.toastrService.success('exito al registrar', 'ÉXITO');
    } else {
      this.toastrService.error('error al registrar existen campos vacios, ERROR');
    }
  }

  private validateDonationForm(event: any): boolean {
    let correct = true;
    if (event.date === null || event.amount === '' || event.description === '' || event.date === undefined) {
      correct = false;
    }
    return correct;
  }

}
