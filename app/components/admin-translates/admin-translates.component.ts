import { Component, OnInit } from "@angular/core"

import { RemainingTime } from '../../shared/model/remainingtime.model'
import { Translate } from "../../shared/model/trans.model"
import { Transitem } from "../trans-item/trans-item.component"
import { TransService } from "../../shared/service/trans.service"
import { UserService } from '../../shared/service/user.service'
import { Router } from '@angular/router';
import { AlertService } from '../../shared/service/alert.service'
import { PagerService } from '../../shared/service/pager.service.component'
import * as _ from 'underscore';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'admin-translates',
    templateUrl: './app/components/admin-translates/admin-translates.html',
    styles: ['']  
})

export class AdminTranslatesComponent implements OnInit {

    // array of all items to be paged
    translatelist: Translate[];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: Translate[];
    today: Date;
    time: RemainingTime[] = []; // ja napisa dlja udobstva, smotri klass v papke model!
   

    
    constructor(private router: Router,private transervice: TransService,private userService: UserService,private alertService: AlertService,private pagerService: PagerService){
        this.today = new Date();
    }

    ngOnInit() {

          this.transervice.getAllTranslate().subscribe(
              data => { this.translatelist = data;
                        console.log(this.translatelist);  
                        this.setPage(1);
         //Zapolnim vremja! 
         for(let item of this.translatelist){
             this.time.push(new RemainingTime(item));
         }
        }       
         );
         
    }
    
    removeTranslate(translate) {
      this.transervice.DeleteTranslate(translate.id).subscribe( data => {

        this.translatelist.splice(this.translatelist.findIndex( x=>x.id == translate.id),1);
        //this.pagedItems.splice(this.translatelist.findIndex( x=>x.id == translate.id),1);
        this.setPage(1);
            this.alertService.success(translate.title + " Removed!");
        
        }, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);
        });
        

     
    }

     setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.translatelist.length, page,10);
        // get current page of items
        this.pagedItems = this.translatelist.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

   
      
}