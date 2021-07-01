import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Service
import { ChildRegisterService } from '../../../shared/services/child-register.service';

// Model
import { ChildRegisterModel } from '../../../shared/models/child-register.model';
import { storage } from 'firebase';

import { tap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-show-register-form',
  templateUrl: './show-register-form.component.html',
  styleUrls: ['./show-register-form.component.css']
})
export class ShowRegisterFormComponent implements OnInit {
  child = new ChildRegisterModel();
  childId: any;
  userList: any = [];
  role: any = {};
  isDisable = false;
  loading = false;

  constructor(private childRegisterService: ChildRegisterService, private route: ActivatedRoute, private router: Router
    ,private userService: UserService, private authService: AuthentificationService) { }

  ngOnInit() {
    this.loading = true;
    this.active();
    setTimeout(() => {
      this.loading = false;
      this.route.paramMap.subscribe((paramMap: any) => {
      this.view(paramMap.params.id);
    });
    }, 300);
  }

  view(id: string) {
    this.childId = id;
    this.childRegisterService.getChildbyId(id).then(child => this.child = child);
  }

  goToProfiles() {
    this.router.navigate(['child/showProfile/' + this.childId]);
  }

  editRegister(child: any) {
    this.childRegisterService.setCreatedObject(child);
    this.router.navigate(['child/editRegisterChild/' + this.childId]);
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
