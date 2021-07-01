import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MensualityService } from '../../../shared/services/mensuality.service';

import { MensualityModel } from '../../../shared/models/mensuality.model';


@Component({
  selector: 'app-show-mensuality',
  templateUrl: './show-mensuality.component.html',
  styleUrls: ['./show-mensuality.component.css']
})
export class ShowMensualityComponent implements OnInit {
  mensualityID: any;
  mensuality= new MensualityModel();
  childID: any;
  loading = false;

  constructor(private mensualityService: MensualityService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.route.paramMap.subscribe((paramMap: any) => {
        this.view(paramMap.params.id);
      });
    }, 500);
  }

  view(id: string) {
    this.mensualityID = id;
    console.log(this.mensualityID)
    this.mensualityService.getMensualitybyId(id).then(child => this.mensuality = child);
    this.childID = this.mensualityService.getChildKey()
  }

  goToMensualities() {
    this.mensualityService.setMensuality(this.childID);
    this.router.navigate(['finances/showMensuality']);
  }

  goToProfile() {
    this.mensualityService.setMensuality(this.childID);
    this.router.navigate(['child/showProfile/' + this.childID]);
  }
}
