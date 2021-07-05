import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import * as fb from 'firebase';

import { MensualityModel } from '../models/mensuality.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensualityService {
  mensualityList: AngularFireList<any>;
  childKey: any;


  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  public getMensualities(): Observable<any[]> {
    return this.firebase.list('mensualities').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  public createMensuality(mensuality: MensualityModel): string {
    return this.firebase.list('mensualities').push(mensuality).key;
  }

  public getMensualitybyId(id: string): Promise<any> {
    const ref = fb.database().ref('mensualities');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  public setMensuality( childKey: any): void {
    this.childKey = childKey;
  }

  public getChildKey() {
    return this.childKey;
  }

}
