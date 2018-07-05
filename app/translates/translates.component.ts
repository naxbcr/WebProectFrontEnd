import { Component, Input, OnInit } from "@angular/core"
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthenticationService } from '../shared/service/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/service/user.service'
import { AlertService } from '../shared/service/alert.service'


@Component({
    selector: 'app-translates',
    templateUrl: './app/translates/translates.html',
    styles: [ '' ]

})

export class TranslatesComponent implements OnInit {

    Trans: string="I am page with translate components. Avaliable for signed in users.";
    username;
    role: string;
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService, private userService: UserService,private alertService: AlertService) { 
            window.scrollTo(0,0);
            
            this.username = JSON.parse(localStorage.getItem('currentUser')).username;

        }

    ngOnInit(){

        // проверим был ли скачен профиль прежде чем перенаправлять пользователя. 
        if(localStorage.getItem("currentProfile")){
            console.log("profile found. parsing.");
            this.role = JSON.parse(localStorage.getItem('currentProfile')).postionname;

            if(this.role == 'user'){this.router.navigate(['/translates/list']);}
            else if(this.role == 'translator'){this.router.navigate(['/translates/manage']);}
        }
        else{
            //получаем профиль вносим в локал сторедж. перенаправляем.
            console.log("profile not found. loading.");
        this.userService.getProfile(this.username).subscribe(
            data => {
                    localStorage.setItem('currentProfile',JSON.stringify(data));
                    console.log(JSON.parse(localStorage.getItem('currentProfile')));
                    console.log("succes?!");
                    this.role = JSON.parse(localStorage.getItem('currentProfile')).postionname;

                    if(this.role == 'user'){this.router.navigate(['/translates/list']);}
                    else if(this.role == 'translator'){this.router.navigate(['/translates/manage']);}
                    else if(this.role == 'administrator'){this.router.navigate(['/translates/administration']);}
            },
            error => {
                //без профиля работать не получиться.
                this.alertService.error(error);
                console.log("cannot download profile data!");
                this.router.navigate(['/home']);
                window.scrollTo(0,0);
            });
        
          }

        
        
    }



    logout(): void{
        this.authenticationService.logout();
    }


}