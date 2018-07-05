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
    templateUrl: './app/components/administration/administration.html',
    styles: ['']  
})

export class AdministrationComponent implements OnInit {

    // Pie
  public pieChartLabels:string[] = ['Total clients', 'Total traslators', 'Total admins'];
  public pieChartData:number[] = [0,0,0];
  public pieChartType:string = 'pie';

  // Doughnut
  public doughnutChartLabels:string[] = ['Total translated','Total posted','Total in progress'];
  public doughnutChartData:number[] = [0,0,0];
  public doughnutChartType:string = 'doughnut';

  
  totalusers: number = 0;
  totalnrd: number = 0;
  totalorders: number = 0;
  totalexpired: number= 0;

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
    
    
    constructor(private router: Router,private transervice: TransService,private userService: UserService,private alertService: AlertService, private statsService: StatisticsService){

    }

    ngOnInit() {
          this.statsService.getGlobalStatistics().subscribe( data =>
            {
                console.log(JSON.parse(JSON.stringify(data)));
                var stats = JSON.parse(JSON.stringify(data));
                    this.totalusers = stats.totalusers + stats.totaltranslators + stats.totaladmins;
                    this.totalnrd = stats.notredeemedusers;
                    this.totalorders = stats.translated + stats.posted+ stats.inprogress;
                    this.totalexpired = stats.expired;
                this.pieChartData = [stats.totalusers,stats.totaltranslators,stats.totaladmins];
                this.doughnutChartData = [stats.translated,stats.posted,stats.inprogress];
            });
    }


      
}