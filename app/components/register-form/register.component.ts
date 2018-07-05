import { Component, OnInit } from "@angular/core"
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AlertService } from '../../shared/service/alert.service'
import { UserService } from '../../shared/service/user.service';

@Component({
    selector: 'register',
    templateUrl: './app/components/register-form/register.html',
    styles: [ ".col-lg-10 { margin-bottom: 2rem; } #regtop { margin-top: 60px;}" ]

})

export class Register implements OnInit {

 formgroup: FormGroup;
 user: any;
 loading = false;
    error = '';
    hidden;



 constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { 
      
            this.hidden = true;
        }

        ngOnInit()
{

    this.formgroup = new FormGroup({
       email: new FormControl('',[Validators.required, Validators.minLength(6)]),
       pass1: new FormControl('',[Validators.required, Validators.minLength(6)]),
       pass2: new FormControl('',[Validators.required, Validators.minLength(6)]),
       fname: new FormControl('',[Validators.required, Validators.minLength(2)]),
       lname: new FormControl('',[Validators.required, Validators.minLength(2)])
    });
        }

        areEqual(): boolean {
            var valid = false;
            if(this.formgroup.value.pass1 == this.formgroup.value.pass2){ return valid = true;}
            return valid;
            
        }

   


    Register(): void{

        const z = 1; //1 - user, 2 - translator

        if(this.formgroup.valid && this.areEqual())
        {

            console.log("Registration: "+this.formgroup.value);
            this.user = JSON.stringify({email:this.formgroup.value.email,first_name: this.formgroup.value.fname,last_name:this.formgroup.value.lname,password:this.formgroup.value.pass1,id_position: z  })
            
            this.loading = true;
            this.userService.create(this.user)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful, we have send a message to '+this.formgroup.value.email+' with confirmation link.', true);
                    window.scrollTo(0,0);
                    this.loading = false;
                },
                error => {
                    
                    if(error.status==409){error="409 User with such email already exists";}
                    this.alertService.error(error);
                    this.loading = false;
                    window.scrollTo(0,0);
                }
               

           );

            console.log("jsonparse: "+JSON.parse(this.user));

        }else if(!this.areEqual()){
            this.alertService.error("Password doest not match!");
            window.scrollTo(0,0);  
              
        }
    }

}