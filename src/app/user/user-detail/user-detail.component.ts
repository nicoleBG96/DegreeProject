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
      this.viewUser(paramMap.params.id);
    });
  }

  public viewUser(id: string): void {
    this.userId = id;
    this.userService.getUserByID(id).then(user => this.user = user);
  }

  public updateStatus(event: any, state: boolean): void {
    event.isDisable = state;
    this.userService.updateUser(this.userId, event);
  }

  public getStatus(event: any): string {
    if (event.isDisable) {
      return 'Habilitado';
    } else {
      return 'Inhabilitado';
    }
  }

  public goToUsers(): void {
    this.router.navigate(['users/userList']);
  }
}
