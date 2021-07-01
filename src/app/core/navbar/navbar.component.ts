import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profiles = false;
  home = false;
  report = false;
  user = false;
  isLogged = false;
  userList: any = [];
  role: any;
  isDisable = false;

  constructor(private router: Router, private authService: AuthentificationService,
    private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.active();
  }

  async active() {
    this.authService.getCurrentUser().pipe(
      tap(current => {
        if (current)
          this.isLogged = true;
          this.userService.getUser().subscribe(item => {
          this.userList = item;
          this.userList.forEach(element => {
            if (current.email == element.email) {
              if (element.isDisable)
                this.isDisable = true;
              if(!element.isDisable)
                this.toastrService.error('error cuenta no HABILITADA', 'ERROR');
              switch (element.position) {
                case 'administrador':
                  this.role = 'admin';
                  break;
                case 'medico':
                  this.role = 'med';
                  break;
                case 'psicologo':
                  this.role = 'psico';
                  break;
                case 'contador':
                  this.role = 'cont';
                  break;
                default:
                  break;
              }
            }
          });
          if (this.role == null)
            this.isLogged = false;
        });
      })
    ).subscribe();
  }

  goToMensualities() {
    this.report = true;
    this.router.navigate(['finances/showMensualities']);
    setTimeout(() => {
      this.report = false;
    }, 500);
  }

  goToDonations() {
    this.report = true;
    this.router.navigate(['finances/showDonations']);
    setTimeout(() => {
      this.report = false;
    }, 500);
  }

  goToExpenses() {
    this.report = true;
    this.router.navigate(['finances/showExpenses']);
    setTimeout(() => {
      this.report = false;
    }, 500);
  }

  goToReport() {
    this.report = true;
    this.router.navigate(['finances/showMonthlyReport']);
    setTimeout(() => {
      this.report = false;
    }, 500);
  }

  goToProfiles() {
    this.profiles = true;
    this.router.navigate(['child/profiles']);
    setTimeout(() => {
      this.profiles = false;
    }, 500);
  }

  goToIncomes() {
    this.report = true;
    this.router.navigate(['finances/showIncomes']);
    setTimeout(() => {
      this.report = false;
    }, 500);
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  goToUsers() {
    this.user = true;
    this.router.navigate(['users/userList']);
    setTimeout(() => {
      this.user = false;
    }, 500);
  }

  goHome() {
    this.home = true;
    this.router.navigate(['']);
    setTimeout(() => {
      this.home = false
    }, 500);
  }

  logout() {
    this.isLogged = false
    this.authService.logout();
  }
}
