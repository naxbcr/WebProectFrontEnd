import { Component, OnInit } from "@angular/core"
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AlertService } from '../../shared/service/alert.service'
import { AuthenticationService } from '../../shared/service/authentication.service';


@Component({
    selector: 'login',
    templateUrl: './app/components/login-form/login.html',
    styles: [ `.col-lg-10 { margin-bottom: 2rem; }
         #logtop { margin-top: 60px;}
    ` ]

})

export class Login implements OnInit {

    loading = false;
    error = '';
    
   
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { 

        }
        
        ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 

mygroup: FormGroup = new FormGroup({
       email: new FormControl('',[Validators.required, Validators.minLength(6)]),
       password: new FormControl('',[Validators.required, Validators.minLength(6)])
    });


    signIn(): void {
      if(this.mygroup.valid)
        console.log("Signing in with: "+this.mygroup.value.email+" / "+this.mygroup.value.password+" valid: "+this.mygroup.valid);
        

        this.loading = true;
        this.authenticationService.login(this.mygroup.value.email, this.mygroup.value.password)
            .subscribe(
                data => {
                    
                     this.loading = false;
                     //this.router.navigate(['/translates/list']); 
                      this.router.navigate(['/translates']); 
                     this.alertService.success("Successful logged in, with "+this.mygroup.value.email,true);
                     
                   
                },
                error => {

                    if(error.status==400){error = error.status+" "+error.json().error_description.toString();}
                    this.alertService.error(error);      
                    
                    this.loading = false;
                    window.scrollTo(0,0);
                });


    }


}