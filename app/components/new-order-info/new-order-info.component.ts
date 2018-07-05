import { Component, Input, Output, OnDestroy, OnInit } from "@angular/core"
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import { Translate } from '../../shared/model/trans.model';
import { Comment } from '../../shared/model/comment.model';
import {Subscription} from 'rxjs/Subscription';
import { TransService } from "../../shared/service/trans.service"
import { CommentService } from "../../shared/service/comment.service"
import { AlertService } from '../../shared/service/alert.service'

import { NgClass, NgStyle } from '@angular/common';
import {FileSelectDirective, FileDropDirective, FileUploader, Headers} from 'ng2-file-upload/ng2-file-upload';

import { FileItem } from 'ng2-file-upload/file-upload/file-item.class';

const URL = 'http://localhost:50528/api/Upload';
@Component({
    selector: 'new-order-info',
    templateUrl: './app/components/new-order-info/new-order-info.html',
    styles: [ '']

})



export class NewOrderInfoComponent implements OnDestroy, OnInit {

    id: number; // id of translate
    private translate: Translate;
    private translates: Translate[];
    private comments: Comment[];
    private subscription: Subscription;
    id_user: number; // id of user
    status: string;

    filelink: string; 
    uploaded: boolean;

  public uploader:FileUploader = new FileUploader(
  {
      url: URL
  });
    form: FormGroup = new FormGroup({
       comment: new FormControl('',[Validators.required, Validators.minLength(2)]),
    });;

    loading: boolean;
    today :Date;
    end_date: Date;
    remains: number;

    days: number;
    hours: number;
    minutes: number;


    

     constructor(private activateRoute: ActivatedRoute,private router: Router,private transervice: TransService,private commentService: CommentService, private alertService: AlertService){
         this.loading = false;

         this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
         this.today = new Date();
         this.comments = new Array<Comment>();
         this.translates = new Array<Translate>();
         this.id_user = JSON.parse(localStorage.getItem('currentProfile')).id;
         this.status = JSON.parse(localStorage.getItem('currentProfile')).postionname;
        this.uploader._onCompleteItem = (item: FileItem, response:any, status:any, headers:any) => {
            console.log("file is uploaded ?", item, status);
            console.log(response);
            this.uploaded = true;
            this.filelink = item._file.name;
        };
        this.uploaded = false; 
         
    } 
 onFileChange() {
       if(this.uploader.queue.length > 1){
           this.uploader.queue[0].remove(); //чтобы не заливали кучу файлов
           
       }
       this.uploaded = false;
   }
    deleteTranslate()
    {
        this.transervice.DeleteTranslate(this.id).subscribe( data => {
          console.log("Translate delete");
          this.alertService.success("Translate deleted!");
          
      }, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);
      });
        
    }

    acceptTranslate()
    {

      this.translate.id_translator = JSON.parse(localStorage.getItem('currentProfile')).id;
      this.translate.tr_userfname = JSON.parse(localStorage.getItem('currentProfile')).first_name;
      this.translate.tr_userlname = JSON.parse(localStorage.getItem('currentProfile')).last_name;
      this.translate.status_name= "In progress"; 
      this.translate.translate_status = 3;
      this.translate.update_date = new Date();

      let translatefinal = JSON.stringify(this.translate);
      this.transervice.putTranslateById(this.id,translatefinal).subscribe(data => {
          console.log("Translate accepted!");
          var trans:Translate =  JSON.parse(JSON.stringify(data));
          this.translates.push(trans);
          this.alertService.success("Translate accepted!");
          window.scrollTo(0,0);
          this.form.reset();
          
     }, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);
      });

    }

    saveFile()
    {
        if(this.uploaded){
      this.loading = true;
      this.translate.status_name= "Translated"; 
      this.translate.translate_status = 4;
      this.translate.link_translator = this.filelink;
      this.translate.update_date = new Date();
      let translatefinal = JSON.stringify(this.translate);
      this.transervice.putTranslateById(this.id,translatefinal).subscribe(data => {
          console.log("File Save");
          var trans:Translate =  JSON.parse(JSON.stringify(data));
          this.translates.push(trans);
          this.alertService.success("Updated!");
          window.scrollTo(0,0);
          this.form.reset();
          this.loading = false;
          
     }, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);
            this.loading = false;
      });

    }else{this.alertService.error("Please upload an file first!");}

    }

    downloadFile(name: string){
        this.transervice.getFile(name);
    }

   addComment() {
      
      
      console.log(this.form.value.comment);
      if(this.form.valid){
      let comment = JSON.stringify({created_date:new Date(),comment:this.form.value.comment,id_user:this.id_user,id_translate:this.id});
      this.commentService.PostComment(comment).subscribe( data => {
          //ответ на запрос ПОСТ коммента содержит уже содержит новый коммент и ссылку на него в заголовке, там уже есть новый ИД.
          console.log("comment posted");
          var com:Comment =  JSON.parse(JSON.stringify(data));
          //добавим к комменту из респонса данные текушего пользователя, чтобы не запрашивать их отдельно
          com.postion = JSON.parse(localStorage.getItem('currentProfile')).postionname;
          com.userfname = JSON.parse(localStorage.getItem('currentProfile')).first_name;
          com.userlname = JSON.parse(localStorage.getItem('currentProfile')).last_name;
          this.comments.push(com);
          this.alertService.success("Message sended!");
          
      }, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);
      });

      this.form.reset();

      }
      
    }
    ngOnInit(){

        console.log("Translate: "+this.id);
         this.transervice.getTranslateById(this.id).subscribe(data => {this.translate = data;
          console.log(this.translate);

          // вычисляем время до конца
         this.end_date = new Date(this.translate.end_date);
         this.remains = this.end_date.getTime() - this.today.getTime();

         this.hours = Math.ceil(((this.remains / (1000*60*60)) % 24));
         this.minutes = Math.ceil(((this.remains / (1000*60)) % 60));
         this.days = Math.ceil((this.remains / (1000*60*60*24)));

         // загружаем комменты только если загрузился сам перевод
         
         console.log("Comment:");
         this.commentService.GetAllForTranslate(this.id).subscribe(
            data => {this.comments = data;
              console.log(this.comments);
            },
            error => {
                if(error.status==404){  }
                
            });

            }, error =>{
                console.log("wtf is going wrong ?");
                console.log(JSON.stringify(error));
                

            });

    }

   

     ngOnDestroy(){
        this.subscription.unsubscribe();
    }


    remove(id: number,index: number){
        
        this.commentService.removeComment(id).subscribe( data => {
            this.comments.splice(index,1);
            this.alertService.success("Removed!");
            window.scrollTo(0,0);

        }, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);
        });

    }

    

}