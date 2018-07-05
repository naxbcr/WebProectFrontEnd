import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StatisticsService {

constructor(private http: Http) { }

 private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'Content-Type':'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }

getGlobalStatistics(): Observable<Response> {
             return this.http.get('http://localhost:50528/api/stats/admin',
              this.jwt()).map((response: Response) => response.json());
    }


getTranslatorStatistics(id: number): Observable<Response>{
     return this.http.get('http://localhost:50528/api/stats/translator/'+id,
              this.jwt()).map((response: Response) => response.json());
}


}