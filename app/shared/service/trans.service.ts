import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response,ResponseContentType } from '@angular/http';

import { Translate } from "../model/trans.model"

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as FileSaver from "file-saver";



@Injectable()
export class TransService {

constructor(private http: Http) { }


    getAllAvaliableForWork(): Observable<Translate[]>{
        return this.http.get('http://localhost:50528/api/translate/avaliable',this.jwt()).map((response: Response) =>
        { //console.log("response"+JSON.stringify(response));
        return response.json(); });
    }
    getAllTranslate(): Observable<Translate[]>{
        return this.http.get('http://localhost:50528/api/translate',this.jwt()).map((response: Response) =>
        { //console.log("response"+JSON.stringify(response));
        return response.json(); });
    }
    getTranslatesByTranslator(id: number): Observable<Translate[]> {
            //localhost:50528/api/translate/user
             return this.http.get('http://localhost:50528/api/translate/translator/'+id,
              this.jwt()).map((response: Response) => response.json());
    }
    
    putTranslateById(id: number,translate: any): Observable<Translate> {
            return this.http.put('http://localhost:50528/api/translate/'+id,JSON.parse(translate),
                    this.jwt()).map((response: Response) => {
                    console.log("response"+JSON.stringify(response));
                    return response.json();});
    }
    
    getTranslatesOfUser(id: number): Observable<Translate[]> {
            //localhost:50528/api/translate/user
             return this.http.get('http://localhost:50528/api/translate/user/'+id+'/all',
              this.jwt()).map((response: Response) => response.json());
    }

    getTranslateById(id: number): Observable<Translate> {
            return this.http.get('http://localhost:50528/api/translate/'+id,
              this.jwt()).map((response: Response) => response.json());
    }

    PostTranslate(translate: any): Observable<Response>
    {
        return this.http.post('http://localhost:50528/api/translate',JSON.parse(translate),
    this.jwt()).map((response: Response) => {
        console.log("response"+JSON.stringify(response));
        return response.json();});
    }

    DeleteTranslate(id: number): Observable<Response>
    {
        return this.http.delete('http://localhost:50528/api/translate/'+id,
        this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'Content-Type':'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }


    getFile(myfilename: string){
        return this.http.get('http://localhost:50528/api/Download/'+myfilename+"/",{responseType: ResponseContentType.Blob}).map((response) => {
            let blob = response.blob();
            return {
                data: new Blob([blob], {type: 'application/octet-stream'}), 
                filename: myfilename
                //response.headers.get('FILE_NAME') --- NE VERNO, NADO SMOTRET CONTENT-DISPOSITION
            }
        })
        .subscribe(res => {saveAs(res.data, res.filename)},error => { console.log(error);})
    }



}