import { Component, Input, Output, OnDestroy, OnInit } from "@angular/core"
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import { Translate } from '../../shared/model/trans.model';
import { Comment } from '../../shared/model/comment.model';
import {Subscription} from 'rxjs/Subscription';
import { TransService } from "../../shared/service/trans.service"
import { CommentService } from "../../shared/service/comment.service"
import { AlertService } from '../../shared/service/alert.service'


@Component({
    selector: 'trans-info',
    templateUrl: './app/components/trans-info/trans-info.html',
    styles: [ '']

})



export class TransInfoComponent implements OnDestroy, OnInit {

    id: number; // id of translate
    private translate: Translate;
    private comments: Comment[];
    private subscription: Subscription;
    id_user: number; // id of user
    status: string;
    
    form: FormGroup = new FormGroup({
       comment: new FormControl('',[Validators.required, Validators.minLength(2)]),
    });;


    today :Date;
    end_date: Date;
    remains: number;

    days: number;
    hours: number;
    minutes: number;

    

     constructor(private activateRoute: ActivatedRoute,private router: Router,private transervice: TransService,private commentService: CommentService, private alertService: AlertService){
         
         this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
         this.today = new Date();
         this.comments = new Array<Comment>();
         this.id_user = JSON.parse(localStorage.getItem('currentProfile')).id;
         this.status = JSON.parse(localStorage.getItem('currentProfile')).postionname;
          
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
    refreshPage() {

        this.translate = null;
        this.transervice.getTranslateById(this.id).subscribe(data => {this.translate = data;
          console.log(this.translate);

          // вычисляем время до конца
         this.end_date = new Date(this.translate.end_date);
         this.remains = this.end_date.getTime() - this.today.getTime();

         this.hours = Math.ceil(((this.remains / (1000*60*60)) % 24));
         this.minutes = Math.ceil(((this.remains / (1000*60)) % 60));
         this.days = Math.ceil((this.remains / (1000*60*60*24)));

            }, error =>{
                console.log("wtf is going wrong ?");
                console.log(JSON.stringify(error));
                

            });
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

    downloadFile(name: string){
        this.transervice.getFile(name);
    }

            //On the component
        // downloadfile(){

        // var thefile = new Blob(["hello world"],{type:'text/plain'});
        // console.log("GO!");

        // this.transervice.downloadfile2()
        //     .subscribe(res => {
                
        //     },
        //                 error => console.log("Error downloading the file."+error),
        // () => {console.log('Completed file download.');
        //         //var url = window.URL.createObjectURL(thefile);
        //         //window.open(url);
        //         //window['saveAs'](thefile, 'test.pdf');
        //     });

        
        // }


// getFile(path:String) {
// this.autthHttp.get(`some_path', {responseType: ResponseContentType.Blob})
//     .map((response) => {
//         let blob = response.blob();
//         return {
//             data: new Blob([blob], {type: 'application/octet-stream'}), 
//             filename: response.headers.get('FILE_NAME')
//         }
//     })
//     .subscribe(res => saveAs(res.data, res.filename))

        

}