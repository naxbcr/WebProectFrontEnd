import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Comment } from "../model/comment.model"
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';




@Injectable()
export class CommentService {
 constructor(private http: Http) { }

    
    GetAllForTranslate(id: number): Observable<Comment[]> {
             return this.http.get('http://localhost:50528/api/comment/translate/'+id+'/all',
              this.jwt()).map((response: Response) => response.json());
    }

    PostComment(comment: any): Observable<Response>
    {
      
        // заголовки уже есть в методе ниже, 2 раза ненадо.
        return this.http.post('http://localhost:50528/api/comment',JSON.parse(comment),
    this.jwt()).map((response: Response) => {
        console.log("response"+JSON.stringify(response));
        return response.json();});
    }

    removeComment(id: number): Observable<Response>
    {
        return this.http.delete('http://localhost:50528/api/comment/'+id,this.jwt()).map((response: Response) => response.json());
    }


    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'Content-Type':'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }   

}