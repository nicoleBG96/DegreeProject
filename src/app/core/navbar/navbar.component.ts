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

  public profiles = false;
  public home = false;
  public report = false;
  public user = false;
  public isLogged = false;
  private userList: any = [];
  public role: any;
  public isDisable = false;

  constructor(private router: Router, private authService: AuthentificationService,
    private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.active();
  }

  private async active(): Promise<void> {
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
              if (!element.isDisable)
                this.toastrService.error('error cuenta no HABILITADA', 'ERROR');
              this.role = this.getRole(element.position);
            }
          });
          if (this.role == null)
            this.isLogged = false;
        });
      })
    ).subscribe();
  }

  private getRole(position: string): String {
    return (position === 'administrador') ? 'admin' : (position === 'medico') ? 'med' : (position === 'psiocolog') ? 'psico' : 'cont';
  }

  public goToMensualities(): void {
    this.report = true;
    this.router.navigate(['finances/showMensualities']);
    setTimeout(() => {
      this.report = false;
    }, 500);
  }

  public goToDonations(): void {
    this.report = true;
    this.router.navigate(['finances/showDonations']);
    setTimeout(() => {
      this.report = false;
    }, 500);
  }

  public goToExpenses(): void {
    this.report = true;
    this.router.navigate(['finances/showExpenses']);
    setTimeout(() => {
      this.report = false;
    }, 500);
  }

  public goToReport(): void {
    this.report = true;
    this.router.navigate(['finances/showMonthlyReport']);
    setTimeout(() => {
      this.report = false;
    }, 500);
  }

  public goToProfiles(): void {
    this.profiles = true;
    this.router.navigate(['child/profiles']);
    setTimeout(() => {
      this.profiles = false;
    }, 500);
  }

  public goToIncomes(): void {
    this.report = true;
    this.router.navigate(['finances/showIncomes']);
    setTimeout(() => {
      this.report = false;
    }, 500);
  }

  public goToLogin(): void {
    this.router.navigate(['auth/login']);
  }

  public goToUsers(): void {
    this.user = true;
    this.router.navigate(['users/userList']);
    setTimeout(() => {
      this.user = false;
    }, 500);
  }

  public goHome(): void{
    this.home = true;
    this.router.navigate(['']);
    setTimeout(() => {
      this.home = false
    }, 500);
  }

  public logout(): void{
    this.isLogged = false
    this.authService.logout();
  }
}
