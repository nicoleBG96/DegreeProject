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
  public myForm: FormGroup;

  @Input() public donation: DonationsModel;
  @Output() public onSubmit: EventEmitter<any>;

  constructor(private donationService: DonationService, private formBuilder: FormBuilder, 
    private router: Router) {
    this.onSubmit = new EventEmitter<any>();
   }

  ngOnInit() {
    this.donation = new DonationsModel();
  }

  public saveDonation(): void {
    this.onSubmit.emit(this.donation);
  }

  public goToDonations(): void {
    this.router.navigate(['finances/showDonations']);
  }

}
