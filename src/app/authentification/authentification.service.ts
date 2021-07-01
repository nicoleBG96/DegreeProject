import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthentificationService {

  private user: Observable<firebase.User>;
  loginSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedIn());

  constructor(private fAuth: AngularFireAuth, private router: Router, private location: Location,
    private toastrService: ToastrService) {
    this.user = fAuth.authState;
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  loginWhitEmail(value) {
    return this.fAuth.auth.signInWithEmailAndPassword(value.email, value.password).then(res => {
      this.loginSubject.next(true);
      localStorage.setItem('user', JSON.stringify(this.fAuth.auth.currentUser));
    });
  }

  logout() {
    this.loginSubject.next(false);
    this.fAuth.auth.signOut().then((res) => this.router.navigate(['/home']));
    localStorage.clear();
  }

  register(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  edit(value) {
    firebase.auth().currentUser.updateEmail(value.email);
  }

  getCurrentUser() {
    return this.fAuth.authState.pipe(first());
  }

}
