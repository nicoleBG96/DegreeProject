import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authentificationService: AuthentificationService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authentificationService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}
