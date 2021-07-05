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
  public profile = new ProfileModel();
  private childId: any;
  private userList: any = [];
  public role: any = {};
  private isDisable = false;

  constructor(private profileService: ProfileService, private route: ActivatedRoute, 
    private router: Router, private mensualityService: MensualityService, 
    private userService: UserService, private authService: AuthentificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: any) => {
      this.viewChild(paramMap.params.id);
    });
    this.active();
  }

  private viewChild(id: string) {
    this.childId = id;
    this.profileService.getProfilebyId(id).then(child => this.profile = child);

  }

  public statusChild(child: any, state: boolean): void {
    child.isDisable = state;
    this.profileService.updateProfile(this.childId, child);
  }

  public getStatusChild(child: any) : string{
    if (child.isDisable) {
      return 'Inhabilitado';
    } else {
      return 'Habilitado';
    }
  }

  public goToProfiles(): void {
    this.router.navigate(['child/profiles']);
  }

  public goToRegister(): void {
    this.router.navigate(['child/showRegisterProfile/' + this.childId]);
  }

  public goToMedicalRecord(): void {
    this.router.navigate(['child/showMedicalRecordProfile/' + this.childId]);
  }

  public goToProgress(): void {
    this.router.navigate(['child/showProgressProfile/' + this.childId]);
  }

  public goToMensualities(child: any): void {
    child.isPayMensuality = true;
    this.profileService.updateProfile(this.childId, child);
    this.mensualityService.setMensuality(this.childId);
    this.router.navigate(['finances/showMensuality']);
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
