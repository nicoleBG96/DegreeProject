import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

// Model
import { DonationsModel } from '../models/donations.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  donationsList: AngularFireList<any>;
  donation: DonationsModel;

  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  public getDonations(): Observable<any[]> {
    return this.firebase.list('donations').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  public createDonation(donation: DonationsModel): void {
    this.firebase.list('donations').push(donation);
  }

}
