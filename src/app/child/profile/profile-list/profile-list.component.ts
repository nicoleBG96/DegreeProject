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

  calculateAge(date: Date) {
    const today = new Date();
    const childBirth = new Date(date);
    let age = today.getFullYear() - childBirth.getFullYear();
    const months = today.getMonth() - childBirth.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < childBirth.getDate())) {
      age--;
    }
    return age;
  }

  registerProfile(childRegister: any) {
    this.router.navigate(['child/showRegisterProfile/' + childRegister.key]);
  }

  medicalRecordProfile(childMedicalRecord: any) {
    this.router.navigate(['child/showMedicalRecordProfile/' + childMedicalRecord.key]);
  }

  progressProfile(childProgress: any) {
    this.router.navigate(['child/showProgressProfile/' + childProgress.key]);
  }

  createChild() {
    this.router.navigate(['child/registerChild']);
  }

  goToProfile(childProfile: any) {
    this.router.navigate(['child/showProfile/' + childProfile.key]);
  }

  goToMensualities(child: any) {
    let childId = child.key;
    this.profileService.updateProfile(childId, child);
    this.mensualityService.setMensuality(childId);
    this.router.navigate(['finances/showMensuality']);
  }

  getStatus(child: any) {
    if (child.isDisable) {
      return 'Inhabilitado';
    } else {
      return 'Habilitado';
    }
  }

  filterByDate(date?) {
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

  async active() {
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
          });
      })
    ).subscribe();
  }
}

