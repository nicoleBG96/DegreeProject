import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChildProgressModel } from '../../../shared/models/child-progress.model';

import { ChildProgressService } from '../../../shared/services/child-progress.service';

import { tap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/authentification.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-show-progress-profile',
  templateUrl: './show-progress-profile.component.html',
  styleUrls: ['./show-progress-profile.component.css']
})
export class ShowProgressProfileComponent implements OnInit {

  constructor(private childProgressService: ChildProgressService, private route: ActivatedRoute, 
    private router: Router,  private userService: UserService, private authService: AuthentificationService) { }

  child = new ChildProgressModel();
  childId: any;
  userList: any = [];
  role: any = {};
  isDisable = false;
  loading = false;

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
    this.childProgressService.getChildProgressbyId(id).then(child => this.child = child);
  }

  calculateAgeIntMonths() {
    const today = new Date();
    const childBirth = new Date(this.child.birthDate);
    let months = (today.getFullYear() - childBirth.getFullYear()) * 12;
    months -= childBirth.getMonth() + 1;
    months += today.getMonth();
    return months+1;
  }

  calculateTotal(point1: string, point2: string, point3: string, point4: string) {
    if (point1 == null || point2 == null || point3 == null || point4 == null) {
      return 0;
    } else {
      this.child.total = parseFloat((parseFloat(point1) + parseFloat(point2) + parseFloat(point3) + parseFloat(point4)).toFixed(0));
      return (parseFloat(point1) + parseFloat(point2) + parseFloat(point3) + parseFloat(point4)).toFixed(0);
    }
  }

  editProgress(child: any) {
    this.childProgressService.setCreatedObject(child);
    this.router.navigate (['child/editProgress/' + this.childId]);
  }

  goToProfiles() {
    this.router.navigate(['child/showProfile/' + this.childId]);
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

  rangeAge(age:any) {
    let childAge = parseInt(age, 10);
    if(childAge>=1 && childAge<=3)
      return '1';
    else 
      if(childAge>=4 && childAge<=6)
        return '2';
      else 
        if(childAge>=7 && childAge<=9)
          return '3';
        else 
          if(childAge>=10 && childAge<=12)
            return '4';
          else 
            if(childAge>=13 && childAge<=18)
              return '5';
            else 
              if(childAge>=19 && childAge<=24)
                return '6';
              else 
                if(childAge>=25 && childAge<=36)
                  return '7';
                else 
                  if(childAge>=37 && childAge<=48)
                    return '8';
                  else 
                    if(childAge>=49 && childAge<=60)
                      return '9';
                    else 
                      if(childAge>=61 && childAge<=72)
                        return '10';
                      else 
                        if(childAge>=73 && childAge<=84)
                          return '11';
                  
  }

  calculateLevel(age:any, points:any, item:string) {
    if(this.rangeAge(age) == '1') {
      if(points>=0 && points<=1)
        return 'A';
      if(points>=2 && points<=3)
        return 'ML';
      if(points>=4 && points<=5)
        return 'MH';
      else return 'H';
    }
    if(this.rangeAge(age) == '2') {
      if(points>=0 && points<=4)
        return 'A';
      if(points>=5 && points<=6)
        return 'ML';
      if(points>=7 && points<=9)
        return 'MH';
      else return 'H';
    }
    if(this.rangeAge(age) == '3') {
      if(points>=0 && points<=7)
        return 'A';
      if(points>=8 && points<=10 && (item=='A' || item=='B'))
        return 'ML';
      if(points>=8 && points<=9 && (item=='C'||item =='D'))
        return 'ML';
      if(item=='A') {
        if(points>=11 && points<=13)
          return 'MH';
        else return 'H';
      }
      if(points>=11 && points<=12 && item=='B')
        return 'MH';
      if(points>=10 && points<=12)
        return 'MH';
      else return 'H';
    }
    if(this.rangeAge(age) == '4') {
      if(item=='A') {
        if(points>=0 && points<=11)
          return 'A';
        else 
          if(points>=12 && points<=13)
            return 'ML';
          else
            if(points>=14 && points<=16)
              return 'MH';
            else return 'H';
      } else {
        if(points>=0 && points<=9)
          return 'A';
        else 
          if(points>=10 && points<=12)
            return 'ML';
          else
            if(points>=13 && points<=14)
              return 'MH';
            else return 'H';
      }
    }
    if(this.rangeAge(age) == '5') {
      if(item=='A') {
        if(points>=0 && points<=13)
          return 'A';
        else 
          if(points>=14 && points<=16)
            return 'ML';
          if(points>=17 && points<=19)
            return 'MH';
          else return 'H';
      }
      if(points>=0 && points<=12)
        return 'A';
      if(item=='B') {
        if(points>=13 && points<=15)
          return 'ML';
        if(points>=16 && points<=18)
          return 'MH';
        else return 'H';
      } else {
        if(points>=13 && points<=14)
          return 'ML';
        if(points>=15 && points<=17)
          return 'MH';
        else return 'H';
      }
    }
    if(this.rangeAge(age)=='6') {
      if(item=='A') {
        if(points>=0 && points<=16)
          return 'A';
        else 
          if(points<=17 && points<=19)
            return 'ML';
          else
            if(points>=20 && points<=24)
              return 'MH';
            else return 'H';
      }
      if(item=='B') {
        if(points>=0 && points<=14)
          return 'A';
        else 
          if(points>=15 && points<=18)
            return 'ML';
          else 
            if(points>=19 && points<=20)
              return 'MH';
            else return 'H';
      }
      if(item=='C') {
        if(points>=0 && points<=13)
          return 'A';
        else 
          if(points>=14 && points<=17)
            return 'ML';
          else 
            if(points>=18 && points<=20)
              return 'MH';
            else return 'H';
      }
      if(item=='D') {
        if(points>=0 && points<=14)
          return 'A';
        else  
          if(points>=15 && points<=17)
            return 'ML';
          else 
            if(points>=18 && points<=22)
              return 'MH';
            else return 'H';

      }
    }
    if(this.rangeAge(age) == '7') {
      if(item=='A') {
        if(points>=0 && points<=19)
          return 'A';
        else 
          if(points>=20 && points<=23)
            return 'ML';
          else 
            if(points>=24 && points<=27)
              return 'MH';
            else return 'H';
      }
      if(points>=0 && points<=18 && (item=='B' || item=='D'))
        return 'A';
      if(points>=0 && points<=17 && item=='C')
        return 'A';
      if(points>=19 && points<=21 && item=='B')
        return 'ML';
      if(points>=18 && points<=21 && item=='C')
        return 'ML';
      if(item=='B' || item=='C') {
        if(points>=22 && points<=24)
          return 'MH';
        else return 'H';
      }
      if(item=='D') {
        if(points>=19 && points<=22)
          return 'ML';
        else
          if(points>=23 && points<=27)
            return 'MH';
          else return 'H';
      }
    }
    if(this.rangeAge(age)=='8') {
      if(item=='A' || item=='D') {
        if(points>=0 && points<=22)
          return 'A';
        else 
          if(points>=23 && points<=26)
            return 'ML';
          else 
            if(points>=27 && points<=29)
              return 'MH';
            else return 'H';
      }
      if(item=='B') {
        if(points>=0 && points<=21)
          return 'A';
        else 
          if(points>=22 && points<=24)
            return 'ML';
          else 
            if(points>=25 && points<=28)
              return 'MH';
            else return 'H';
      }
      if(item=='C') {
        if(points>=0 && points<=21)
          return 'A';
        else 
          if(points>=22 && points<=25)
            return 'ML';
          else 
            if(points>=26 && points<=29)
              return 'MH';
            else return 'H';
      }
    }
    if(this.rangeAge(age)=='9') {
      if(item=='A') {
        if(points>=0 && points<=26)
          return 'A';
        else
          if(points>=27 && points<=29)
            return 'ML';
          else return 'MH';
      }
      if(points==29)
        return 'MH';
      if(item =='B') {
        if(points>=0 && points<=23)
          return 'A';
        else return 'ML';
      }
      if(item=='C') {
        if(points>=0 && points<=24)
          return 'A';
        else return 'ML';
      }
      if(item=='D') {
        if(points>=0 && points<=25)
          return 'A';
        else return 'ML';
      }
    }
    if(this.rangeAge(age)=='10') {
      if(item=='A') {
        if(points>=0 && points<=22)
          return 'A';
        else
          if(points>=23 && points<=28)
            return 'ML';
          else
            if(points>=29 && points<=35)
              return 'MH';
            else return 'H';
      }
      if(item=='B') {
        if(points>=0 && points<=27)
          return 'A';
        else 
          if(points>=28 && points<=32)
            return 'ML';
          else 
            if(points>=33 && points<=35)
              return 'ML';
            else return 'H';
      }
      if(item=='C') {
        if(points>=0 && points<=23)
          return 'A';
        else 
          if(points>=24 && points<=30)
            return 'ML';
          else 
            if(points>=31 && points<=33)
              return 'ML';
            else return 'H';
      }
      if(item=='D') {
        if(points>=0 && points<=26)
          return 'A';
        else 
          if(points>=27 && points<=31)
            return 'ML';
          else 
            if(points>=32 && points<=35)
              return 'ML';
            else return 'H';
      }
    }
    if(this.rangeAge(age)=='11') {
      if(item=='A') {
        if(points>=0 && points<=25)
          return 'A';
        else
          if(points>=26 && points<=32)
            return 'ML';
          else
            if(points>=33 && points<=36)
              return 'MH';
      }
      if(item=='B') {
        if(points>=0 && points<=30)
          return 'A';
        else 
          if(points>=31 && points<=33)
            return 'ML';
          else 
            if(points>=34 && points<=36)
              return 'ML';
            else return 'H';
      }
      if(item=='C') {
        if(points>=0 && points<=27)
          return 'A';
        else 
          if(points>=28 && points<=32)
            return 'ML';
          else 
            if(points>=33 && points<=35)
              return 'ML';
            else return 'H';
      }
      if(item=='D') {
        if(points>=0 && points<=28)
          return 'A';
        else 
          if(points>=29 && points<=33)
            return 'ML';
          else 
            if(points>=34 && points<=36)
              return 'ML';
      }
    }

  }

  calculateTotalLevel(age:any, points:any) {
    if(this.rangeAge(age)=='1') {
      if(points>=0 && points<=6)
        return 'A';
      else
        if(points>=7 && points<=13)
          return 'ML';
        else 
          if(points>=14 && points<=22)
            return 'MH';
          else return 'H';
    }
    if(this.rangeAge(age)=='2') {
      if(points>=0 && points<=19)
        return 'A';
      else 
        if(points>=20 && points<=27)
          return 'ML';
        else  
          if(points>=28 && points<=34)
            return 'MH';
          else return 'H';
    }
    if(this.rangeAge(age)=='3') {
      if(points>=0 && points<=31)
        return 'A';
      else 
        if(points>=32 && points<=39)
          return 'ML';
        else  
          if(points>=40 && points<=48)
            return 'MH';
          else return 'H';
    }
    if(this.rangeAge(age)=='4') {
      if(points>=0 && points<=42)
        return 'A';
      else 
        if(points>=43 && points<=49)
          return 'ML';
        else  
          if(points>=50 && points<=56)
            return 'MH';
          else return 'H';
    }
    if(this.rangeAge(age)=='5') {
      if(points>=0 && points<=51)
        return 'A';
      else 
        if(points>=52 && points<=60)
          return 'ML';
        else  
          if(points>=61 && points<=69)
            return 'MH';
          else return 'H';
    }
    if(this.rangeAge(age)=='6') {
      if(points>=0 && points<=61)
        return 'A';
      else 
        if(points>=62 && points<=71)
          return 'ML';
        else  
          if(points>=72 && points<=83)
            return 'MH';
          else return 'H';
    }
    if(this.rangeAge(age)=='7') {
      if(points>=0 && points<=74)
        return 'A';
      else 
        if(points>=75 && points<=86)
          return 'ML';
        else  
          if(points>=87 && points<=100)
            return 'MH';
          else return 'H';
    }
    if(this.rangeAge(age)=='8') {
      if(points>=0 && points<=89)
        return 'A';
      else 
        if(points>=90 && points<=100)
          return 'ML';
        else  
          if(points>=101 && points<=114)
            return 'MH';
          else return 'H';
    }
    if(this.rangeAge(age)=='9') {
      if(points>=0 && points<=101)
        return 'A';
      else 
        if(points>=102 && points<=113)
          return 'ML';
        else return 'MH';
    }
    if(this.rangeAge(age)=='10') {
      if(points>=0 && points<=101)
        return 'A';
      else 
        if(points>=102 && points<=122)
          return 'ML';
        else  
          if(points>=123 && points<=137)
            return 'MH';
          else return 'H';
    }
    if(this.rangeAge(age)=='11') {
      if(points>=0 && points<=116)
        return 'A';
      else 
        if(points>=17 && points<=132)
          return 'ML';
        else  
          if(points>=133 && points<=141)
            return 'MH';
          else return 'H';
    }
  }

  levelItem(points:any, item:string, age: any) {
    let level = this.calculateLevel(age,points,item);
    switch (level) {
      case 'A':
        return "ALERTA";
        break;
      case 'ML':
        return "MEDIO BAJO";
        break;
      case 'MH':
        return "MEDIO ALTO";
        break;
      case  'H':
        return "ALTO";
        break;
      default:
        break;
    }
  }

  levelTotal(points:any, age:any) {
    let level = this.calculateTotalLevel(age,points);
    switch (level) {
      case 'A':
        return "ALERTA";
        break;
      case 'ML':
        return "MEDIO BAJO";
        break;
      case 'MH':
        return "MEDIO ALTO";
        break;
      case  'H':
        return "ALTO";
        break;
      default:
        break;
    }
  }

}
