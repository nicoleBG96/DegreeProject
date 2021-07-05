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
  private mensualityID: any;
  public mensuality= new MensualityModel();
  private childID: any;
  public loading = false;

  constructor(private mensualityService: MensualityService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.route.paramMap.subscribe((paramMap: any) => {
        this.viewMensuality(paramMap.params.id);
      });
    }, 500);
  }

  private viewMensuality(id: string): void {
    this.mensualityID = id;
    this.mensualityService.getMensualitybyId(id).then(child => this.mensuality = child);
    this.childID = this.mensualityService.getChildKey()
  }

  public goToMensualities(): void {
    this.mensualityService.setMensuality(this.childID);
    this.router.navigate(['finances/showMensuality']);
  }

  public goToProfile(): void {
    this.mensualityService.setMensuality(this.childID);
    this.router.navigate(['child/showProfile/' + this.childID]);
  }
}
