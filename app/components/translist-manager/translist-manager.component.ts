import { Component, OnInit } from "@angular/core"

import { Translate } from "../../shared/model/trans.model"
import { Transitem } from "../trans-item/trans-item.component"
import { TransService } from "../../shared/service/trans.service"
import { UserService } from '../../shared/service/user.service'
import { Router } from '@angular/router';
import { AlertService } from '../../shared/service/alert.service'
import { StatisticsService } from '../../shared/service/stats.service'

@Component({
    selector: 'translist-manager',
    templateUrl: './app/components/translist-manager/translist-manager.html',
    styles: ['']
    
})

export class Translistmanager implements OnInit {

    id: number;
    apgain: number;
    tproceed: number;

    constructor(private transervice: TransService,private userService: UserService,private router: Router,private alertService: AlertService, private statsService: StatisticsService){

    }

    // Pie
  public pieChartLabels:string[] = ['Total translated', 'Total in progress', 'Total expired'];
  public pieChartData:number[] = [0,0,0];
  public pieChartType:string = 'pie';

  // Doughnut
  public doughnutChartLabels:string[] = ['Total income','Total future income','Total lost income'];
  public doughnutChartData:number[] = [0,0,0];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  public chartClicked2(e:any):void {
    //console.log(e);
  }

  public chartHovered2(e:any):void {
    //console.log(e);
  }

    ngOnInit() {
          this.id = JSON.parse(localStorage.getItem('currentProfile')).id;
          this.statsService.getTranslatorStatistics(this.id).subscribe( data => {
                
                 var stats = JSON.parse(JSON.stringify(data));
                 this.tproceed = stats.translated + stats.inprogress;
                 this.apgain = stats.mediumprice;
                this.pieChartData = [stats.translated,stats.inprogress,stats.expired];
                this.doughnutChartData = [stats.totalgain,stats.futuregain,stats.lostgain];
          });
    }


      
}