import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class UserGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(){

        if (JSON.parse(localStorage.getItem('currentProfile')).postionname == 'user') {
                    // logged in so return true
                    console.log("Role is user");
                    return true;
                }
                this.router.navigate(['/home']);
        console.log("router navigate to home! cant find currentUser");
        return false;
    }


}