import { Component, OnInit } from "@angular/core"

import { User } from "../../shared/model/user.model"
import { UserService } from '../../shared/service/user.service'
import { Router } from '@angular/router';
import { AlertService } from '../../shared/service/alert.service'
import {Observable} from 'rxjs/Observable';
import { PagerService } from '../../shared/service/pager.service.component'
import * as _ from 'underscore';

@Component({
    selector: 'admin-users',
    templateUrl: './app/components/admin-users/admin-users.html',
    styles: [' .gi-2x{font-size: 2em;}.gi-3x{font-size: 3em;}.gi-4x{font-size: 4em;}.gi-5x{font-size: 5em;}']  
})

export class AdminUsersComponent implements OnInit {

    // array of all items to be paged
    userlist: User[];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: User[];

    id: number;
    
    constructor(private router: Router,private userService: UserService,private alertService: AlertService,private pagerService: PagerService){
        this.id = JSON.parse(localStorage.getItem('currentProfile')).id;
    }

    ngOnInit() {

          this.userService.getAllUsers().subscribe(
              data => { this.userlist = data;
                        console.log(this.userlist);

                         // себя мы в списке видеть не должны!
                         var index = this.userlist.findIndex(x =>x.id == this.id);
                         this.userlist.splice(index,1);

                         this.setPage(1);
                           
                }
         );
    }
    
    removeUser(user) {
      this.userService.DeleteUser(user.id).subscribe( data => {

            this.userlist.splice(this.userlist.findIndex( x=>x.id == user.id),1);
        this.setPage(1);
            this.alertService.success(user.email + " Removed!");}, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);
        });
    }

    makeTranslator(user) {

      user.id_position = 2;
      user.postionname = "translator";
      //user.emailconfirm = true;
      let jsonuser = JSON.stringify(user);
      this.userService.update(jsonuser,user.id.toString()).subscribe( data => {
               this.alertService.success(user.email + " is translator now!");}, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);});
    }
    makeAdmin(user) {

      user.id_position = 3;
      user.postionname = "administrator";
      //user.emailconfirm = true;
      let jsonuser = JSON.stringify(user);
      this.userService.update(jsonuser,user.id.toString()).subscribe( data => {
               this.alertService.success(user.email + " is admin now!");}, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);});
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.userlist.length, page,8);
        // get current page of items
        this.pagedItems = this.userlist.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


}