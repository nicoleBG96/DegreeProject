import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: any;
  user = new UserModel();
  userList: any = [];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: any) => {
      this.view(paramMap.params.id);
    });
  }

  view(id: string) {
    this.userId = id;
    this.userService.getUserByID(id).then(user => this.user = user);
  }

  status(event: any, state: boolean) {
    event.isDisable = state;
    this.userService.updateUser(this.userId, event);
  }

  getStatus(event: any) {
    if (event.isDisable) {
      return 'Habilitado';
    } else {
      return 'Inhabilitado';
    }
  }

  goToUsers() {
    this.router.navigate(['users/userList']);
  }
}
