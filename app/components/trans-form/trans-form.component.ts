import { Component, Input, Output,ViewChild  } from "@angular/core"
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Translate } from '../../shared/model/trans.model';
import { AuthenticationService } from '../../shared/service/authentication.service';
import { Router } from '@angular/router';
import { TransService } from "../../shared/service/trans.service"
import { AlertService } from '../../shared/service/alert.service'
import {Subscription} from 'rxjs/Subscription';

import { NgClass, NgStyle } from '@angular/common';
import {FileSelectDirective, FileDropDirective, FileUploader, Headers} from 'ng2-file-upload/ng2-file-upload';

import { FileItem } from 'ng2-file-upload/file-upload/file-item.class';

const URL = 'http://localhost:50528/api/Upload';



@Component({
    selector: 'trans-form',
    templateUrl: './app/components/trans-form/trans-form.html',
    styles: [ `#createform { margin-top: 60px; } .col-lg-10 {margin-bottom: 2rem;} .col-mg-10 { margin-bottom: 2rem;} `]
    
})


export class TransFormComponent {
    
    private translates: Translate[];
    id_user: number; // id of user
    cs_userfname: string;
    cs_userlname:string;

    mindate: Date;
    loading: boolean;

    // отслеживаем состояние файла. пришлось удалить поле chosenfile с ним были баги, не проходил валидацию.
    filelink: string; 
    uploaded: boolean;

  public uploader:FileUploader = new FileUploader(
  {
      url: URL
  });

  public languages:any[] = [
    {id:1,name:'Russian'},
    {id:2,name:'Estonian'},
    {id:4,name:'English'},
  ];
  public types:any[] = [
    {id:1,name:'Technical, Science'},
    {id:2,name:'Official bussiness'},
    {id:3,name:'Journalistic, Narrative'},
    {id:4,name:'Art, Historical'},
  ];

     
    form: FormGroup = new FormGroup({
       title: new FormControl('',[Validators.required, Validators.minLength(5)]),
       deadline: new FormControl('',[Validators.required]),
        textgenre: new FormControl('',[Validators.required]),
        sourcelanguage: new FormControl('',[Validators.required]),
        destinationlanguage: new FormControl('',[Validators.required]),
        //chosenfile: new FormControl(''), // [Validators.required] - пришлось убрать, багует файл есть но пишет что его нет. нельзя поэтому сабмит сделать, хотя requred через HTML работает прекрастно!
        description: new FormControl(''),
    });

     constructor(private router: Router,private transervice: TransService,private alertService: AlertService){

         this.loading = false;
         this.id_user = JSON.parse(localStorage.getItem('currentProfile')).id;
         this.translates = new Array<Translate>();
         this.cs_userfname = JSON.parse(localStorage.getItem('currentProfile')).first_name;
         this.cs_userlname = JSON.parse(localStorage.getItem('currentProfile')).last_name;
         //perevod mozno zakazivat min za 3 dnja.
         this.mindate = new Date(Date.now());this.mindate.setDate(this.mindate.getDate()+3);
         this.uploader._onCompleteItem = (item: FileItem, response:any, status:any, headers:any) => {
            console.log("file is uploaded ?", item, status);
            console.log(response);
            this.uploaded = true;
            this.filelink = item._file.name;
        };

        this.uploaded = false; // так как вырезали поле из обьекта  form, необходимо отслеживать загрузку текущего(выбранного) файла.
        //this.downloadfile();
    } 

   onFileChange() {
       if(this.uploader.queue.length > 1){
           this.uploader.queue[0].remove(); //чтобы не заливали кучу файлов
           
       }
       this.uploaded = false;
   }

   

   addTranslate() {
      if(this.form.valid && this.uploaded){
          this.loading=true;
        let destlanguage = this.languages.find(language => language.id === parseInt(this.form.value.destinationlanguage));
        let srclanguage = this.languages.find(language => language.id === parseInt(this.form.value.sourcelanguage));
        let genretype = this.types.find(type => type.id === parseInt(this.form.value.textgenre));
      let translate = JSON.stringify({created_date:new Date(),title:this.form.value.title,id_customer:this.id_user,decription:this.form.value.description,end_date:this.form.value.deadline,destlang_name:srclanguage.name,srclang_name:destlanguage.name,status_name:"Posted",typename:genretype.name,link_customer:this.filelink,cs_userfname:this.cs_userfname,cs_userlname:this.cs_userlname,id_type:genretype.id,src_lang:destlanguage.id,dest_lang:srclanguage.id,translate_status:1});
      console.log(translate);
      this.transervice.PostTranslate(translate).subscribe( data => {

          console.log("translate posted");
          var trans:Translate =  JSON.parse(JSON.stringify(data));
          this.translates.push(trans);
          this.alertService.success("Translate posted!");
          window.scrollTo(0,0);
          this.form.reset();
          this.loading = false;
          
      }, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);
            this.loading = false;
      });

      }else if(!this.uploaded){this.alertService.error("Please upload an document first!");this.loading = false;}
      else{ console.log("form is not valid!"); this.loading = false;
        //    console.log(this.form.controls["chosenfile"].valid);
        //    console.log(this.form.controls)
        } 
    }

//     download(){

        
//     }

//    downloadfile(){
//     this.transervice.getFile()
//         .subscribe(data => window.open(window.URL.createObjectURL(new Blob([data],{type:'application/octet-stream'}))),
//                     error => console.log("Error downloading the file."),
//                     () => console.log('Completed file download.'));
//   }



}

