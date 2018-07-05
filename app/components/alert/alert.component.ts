import { Component, OnInit } from '@angular/core';
 
import { AlertService } from '../../shared/service/alert.service';
 
@Component({
    selector: 'alert',
    templateUrl: './app/components/alert/alert.component.html'
    
})
 
export class AlertComponent implements OnInit {
    message: any;
    hidden = false;
 
    constructor(private alertService: AlertService) { }
 
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message;}
       
        );
    }

        hide(){
               this.message = false;
        }

    


    }

    

     
    

    