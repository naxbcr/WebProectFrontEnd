import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            console.log("Found currentUser");
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/home']);
        console.log("router navigate to home! cant find currentUser")
        return false;
    }

}