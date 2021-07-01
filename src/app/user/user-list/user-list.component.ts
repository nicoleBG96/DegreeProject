import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  usersList: any [];

  constructor(private userService: UserService, private router: Router, private authService: AuthentificationService) { }

  ngOnInit() {
    this.usersList = [];
    this.userService.getUser().subscribe(item => {
      this.usersList = [];
      for (let index = 1; index < item.length; index++) {
        this.usersList.push(item[index])
      }
    });
  }

  changePosition(event: any) {
    if(event.isDisable == false)
      return 'Inhabilitado';
    else
      return 'Habilitado';
  }

  goToDetail(event: any) {
    this.router.navigate(['users/user/'+ event.key]);
  }

  deleteUser(event: any){
    this.userService.deleteUserById(event.key);
  }

}
