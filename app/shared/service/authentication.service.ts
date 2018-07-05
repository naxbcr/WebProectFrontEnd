import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 

     login(username: string, password: string) {

         var headers = new Headers();
         headers.append('Content-type','application/x-www-form-urlencoded');
         let options   = new RequestOptions({ headers: headers }); 

         //localhost:/50528/token
        return this.http.post('http://localhost:50528/token', "grant_type=password&username="+username+"&password="+password, options)
            .map((response: Response) => {

                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().access_token;
                console.log("trying get token!!!!!");
                if (token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token}));
                    console.log(JSON.parse(localStorage.getItem('currentUser')));
                    console.log("authorized !!!");
                    
                }

                
            });
    }


 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentProfile');
        console.log("currentUser and profile removed!!!");
    }



}