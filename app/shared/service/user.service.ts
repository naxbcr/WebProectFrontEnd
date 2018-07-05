import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../model/user.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    getAllUsers(): Observable<User[]>{
        return this.http.get('http://localhost:50528/api/user',this.jwt()).map((response: Response) =>
        { //console.log("response"+JSON.stringify(response));
        return response.json(); });
    }

     DeleteUser(id: number): Observable<Response>
    {
        return this.http.delete('http://localhost:50528/api/user/'+id,
        this.jwt()).map((response: Response) => response.json());
    }
    create(user: any) {
        //localhost:50528
        console.log("model: "+user);
        return this.http.post('http://localhost:50528/api/user/register', JSON.parse(user), this.contenttype()).map((response: Response) => response.json());
    }

    // under construction...
    getProfile(email: string){
            return this.http.get('http://localhost:50528/api/user/email/'+email+"/",this.jwt()).map((response: Response) => response.json());
    }

    update(user: any,id: string){
        console.log("upd model:"+user);
        return this.http.put('http://localhost:50528/api/user/'+id,JSON.parse(user),this.jwt()).map((response: Response) => response.json());
    }



    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'Content-Type':'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }

    private contenttype(){

         var headers = new Headers();
         headers.append('Content-type','application/json');
         headers.append('Accept','application/json');
         console.log("headers:"+headers.toJSON());
         return  new RequestOptions({ headers: headers });
    }
}