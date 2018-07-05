import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AdminGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(){

        if (JSON.parse(localStorage.getItem('currentProfile')).postionname == 'administrator') {
                    // logged in so return true
                    console.log("Role is administrator");
                    return true;
                }
                this.router.navigate(['/home']);
        console.log("router navigate to home! cant find currentUser");
        return false;
    }


}