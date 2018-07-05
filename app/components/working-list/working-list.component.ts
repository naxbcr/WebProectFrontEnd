import { Component, OnInit } from "@angular/core"

import { Translate } from "../../shared/model/trans.model"
import { Transitem } from "../trans-item/trans-item.component"
import { TransService } from "../../shared/service/trans.service"
import { UserService } from '../../shared/service/user.service'
import {Observable} from 'rxjs/Observable';
import { PagerService } from '../../shared/service/pager.service.component'

import * as _ from 'underscore';

@Component({
    selector: 'working-list',
    templateUrl: './app/components/working-list/working-list.html',
    styles: [ '']
    
})


export class WorkingList implements OnInit {

   // array of all items to be paged
    translist: Translate[];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: Translate[];

    
    private id;

    constructor(private pagerService: PagerService,private transservice: TransService,private userService: UserService){
     
    }

    ngOnInit() {
         this.id = JSON.parse(localStorage.getItem('currentProfile')).id;
         this.transservice.getTranslatesByTranslator(this.id).subscribe(
              data => { this.translist = data;
                        console.log(this.translist);  
                        this.setPage(1);
                }
         );
        
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.translist.length, page);
        // get current page of items
        this.pagedItems = this.translist.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


      
}