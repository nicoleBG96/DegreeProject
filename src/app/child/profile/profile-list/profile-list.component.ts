import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { MensualityService } from 'src/app/shared/services/mensuality.service';
import { UserService } from 'src/app/shared/services/user.service';

import { ProfileService } from '../../../shared/services/profile.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  profileList: any = [];
  searchQuery: any;
  filterDate: any;
  loading = false;
  userList: any = [];
  role: any = {};
  isDisable = false;

  constructor(private profileService: ProfileService, private router: Router, private mensualityService: MensualityService,
    private userService: UserService, private authService: AuthentificationService) { }

  ngOnInit() {
    this.loading=true;
    this.active()
    setTimeout(() => {
      this.loading=false;
      this.profileService.getProfile().subscribe(item => {
        this.profileList = item;
      });
    }, 500);
  }

  public registerProfile(childRegister: any): void {
    this.router.navigate(['child/showRegisterProfile/' + childRegister.key]);
  }

  public medicalRecordProfile(childMedicalRecord: any): void {
    this.router.navigate(['child/showMedicalRecordProfile/' + childMedicalRecord.key]);
  }

  public progressProfile(childProgress: any): void {
    this.router.navigate(['child/showProgressProfile/' + childProgress.key]);
  }

  public createChild(): void {
    this.router.navigate(['child/registerChild']);
  }

  public goToProfile(childProfile: any): void {
    this.router.navigate(['child/showProfile/' + childProfile.key]);
  }

  public goToMensualities(child: any): void {
    let childId = child.key;
    this.profileService.updateProfile(childId, child);
    this.mensualityService.setMensuality(childId);
    this.router.navigate(['finances/showMensuality']);
  }

  public getStatusChild(child: any): string {
    if (child.isDisable) {
      return 'Inhabilitado';
    } else {
      return 'Habilitado';
    }
  }

  public filterByDate(date?): void {
    if (date) {
      const startDate = date[0];
      const endDate = date[1];
      const filtered: any = [];
      this.profileList.forEach((event: any) => {
        if (new Date(event.admissionDate).getTime() >= startDate.getTime() &&
          new Date(event.admissionDate).getTime() <= endDate.getTime()) {
          filtered.push(event);
        }
      });
      this.profileList = filtered;
    } else {
      this.profileService.getProfile().subscribe(item => {
        this.profileList = item;
      });
    }
  }

  private async active(): Promise<void> {
    this.authService.getCurrentUser().pipe(
      tap(current => {
        if(current)
          this.userService.getUser().subscribe(item => {
            this.userList = item;
            this.userList.forEach(element => {
              if(current.email == element.email)
              {
                if(element.isDisable)
                  this.isDisable = true;
                this.getRole(element.position);
              }
            });
          });
      })
    ).subscribe();
  }

  private getRole(position: string): String {
    return (position === 'administrador') ? 'admin' : (position === 'medico') ? 'med' : (position === 'psiocolog') ? 'psico' : 'cont';
  }
}

