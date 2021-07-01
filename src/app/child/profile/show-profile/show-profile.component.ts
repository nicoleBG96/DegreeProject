import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../shared/services/profile.service';
import { ProfileModel } from '../../../shared/models/profile.model';
import { MensualityService } from 'src/app/shared/services/mensuality.service';

import { tap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
  profile = new ProfileModel();
  childId: any;
  userList: any = [];
  role: any = {};
  isDisable = false;

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private router: Router,
    private mensualityService: MensualityService, private userService: UserService, private authService: AuthentificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: any) => {
      this.view(paramMap.params.id);
    });
    this.active();
  }

  

  view(id: string) {
    this.childId = id;
    this.profileService.getProfilebyId(id).then(child => this.profile = child);

  }

  status(child: any, state: boolean) {
    child.isDisable = state;
    this.profileService.updateProfile(this.childId, child);
  }

  getStatus(child: any) {
    if (child.isDisable) {
      return 'Inhabilitado';
    } else {
      return 'Habilitado';
    }
  }

  goToProfiles() {
    this.router.navigate(['child/profiles']);
  }

  goToRegister(child: any) {
    this.router.navigate(['child/showRegisterProfile/' + this.childId]);
  }

  goToMedicalRecord(child: any) {
    this.router.navigate(['child/showMedicalRecordProfile/' + this.childId]);
  }

  goToProgress(child: any) {
    this.router.navigate(['child/showProgressProfile/' + this.childId]);
  }

  goToMensualities(child: any) {
    child.isPayMensuality = true;
    this.profileService.updateProfile(this.childId, child);
    this.mensualityService.setMensuality(this.childId);
    this.router.navigate(['finances/showMensuality']);
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
