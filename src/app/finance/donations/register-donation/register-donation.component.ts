import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DonationService } from '../../../shared/services/donation.service';

import { DonationsModel } from '../../../shared/models/donations.model';

@Component({
  selector: 'app-register-donation',
  templateUrl: './register-donation.component.html',
  styleUrls: ['./register-donation.component.css']
})
export class RegisterDonationComponent implements OnInit {

  constructor(private donationService: DonationService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  registerDonation(event: DonationsModel) {
    if (this.validate(event)) {
      this.donationService.createDonation(event);
      this.router.navigate(['/finances/showDonations']);
      this.toastrService.success('exito al registrar', 'ÉXITO');
    } else {
      this.toastrService.error('error al registrar existen campos vacios, ERROR');
    }
  }

  validate(event: any) {
    let correct = true;
    if (event.date === null || event.amount === '' || event.description === '' || event.date === undefined) {
      correct = false;
    }
    return correct;
  }

}
