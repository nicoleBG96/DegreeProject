import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// Model
import { DonationsModel } from '../../../shared/models/donations.model';

// Service
import { DonationService } from '../../../shared/services/donation.service';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {
  myForm: FormGroup;

  @Input() donation: DonationsModel;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmit: EventEmitter<any>;

  constructor(private donationService: DonationService, private formBuilder: FormBuilder, 
    private router: Router) {
    this.onSubmit = new EventEmitter<any>();
   }

  ngOnInit() {
    this.donation = new DonationsModel();
  }

  saveDonation() {
    this.onSubmit.emit(this.donation);
  }

  goToDonations() {
    this.router.navigate(['finances/showDonations']);
  }

}
