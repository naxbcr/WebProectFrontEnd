import { Component, Input, Output,ViewChild,OnInit  } from "@angular/core"
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Translate } from '../../shared/model/trans.model';
import { AuthenticationService } from '../../shared/service/authentication.service';
import { Router } from '@angular/router';
import { TransService } from "../../shared/service/trans.service"
import { AlertService } from '../../shared/service/alert.service'
import {Subscription} from 'rxjs/Subscription';

import { NgClass, NgStyle } from '@angular/common';
import {FileSelectDirective, FileDropDirective, FileUploader, Headers} from 'ng2-file-upload/ng2-file-upload';
import { ActivatedRoute} from '@angular/router';
import { FileItem } from 'ng2-file-upload/file-upload/file-item.class';

const URL = 'http://localhost:50528/api/Upload';



@Component({
    selector: 'trans-formforedit',
    templateUrl: './app/components/trans-formforedit/trans-formforedit.html',
    styles: [ `#createform { margin-top: 60px; } .col-lg-10 {margin-bottom: 2rem;} .col-mg-10 { margin-bottom: 2rem;} `]
    
})


export class TransFormForEditComponent implements OnInit {
    
    private translates: Translate[];
    private translateforedit: Translate;
    id_user: number; // id of user
    cs_userfname: string;
    cs_userlname:string;
    id: number; // id of translate
    private subscription: Subscription;
    mindate: Date;

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
    today :Date;
    end_date: Date;
    remains: number;

    days: number;
    hours: number;
    minutes: number;

     
    form: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(5)]),
       deadline: new FormControl('',[Validators.required]),
        textgenre: new FormControl('',[Validators.required]),
        sourcelanguage: new FormControl('',[Validators.required]),
        destinationlanguage: new FormControl('',[Validators.required]),
        //chosenfile: new FormControl(''), // [Validators.required] - пришлось убрать, багует файл есть но пишет что его нет. нельзя поэтому сабмит сделать, хотя requred через HTML работает прекрастно!
        description: new FormControl('')
        
        
    }
    
    );

     constructor(private activateRoute: ActivatedRoute,private router: Router,private transervice: TransService,private alertService: AlertService){

         
         this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
         this.id_user = JSON.parse(localStorage.getItem('currentProfile')).id;
         //this.translateforedit = new Translate;
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
    } 

   onFileChange() {
       if(this.uploader.queue.length > 1){
           this.uploader.queue[0].remove(); //чтобы не заливали кучу файлов
           
       }
       this.uploaded = false;
   }

   ngOnInit(){

        console.log("Translate: "+this.id);
         this.transervice.getTranslateById(this.id).subscribe(data => 
         {    
             
              this.form.controls['deadline'].setValue(data.end_date.toString().substring(0,10));
              this.translateforedit = data;
              this.translateforedit.end_date = new Date(data.end_date);
              this.end_date = new Date(this.translateforedit.end_date);
              this.form.patchValue({
                title: this.translateforedit.title, 
                //deadline:this.translateforedit.end_date,
                textgenre: this.translateforedit.id_type,
                sourcelanguage: this.translateforedit.dest_lang,
                destinationlanguage: this.translateforedit.src_lang,
                description: this.translateforedit.decription
                
                });             
            }, error =>{
               
                console.log(JSON.stringify(error));

            }); 
              
   }

   saveTranslate() {
      if(this.form.valid){
        let destlanguage = this.languages.find(language => language.id === parseInt(this.form.value.destinationlanguage));
        let srclanguage = this.languages.find(language => language.id === parseInt(this.form.value.sourcelanguage));
        let genretype = this.types.find(type => type.id === parseInt(this.form.value.textgenre));
        let link;
        if(this.uploaded)
        {
            link = this.filelink;
        }
        else
        {
            link = this.translateforedit.link_customer;
        }
      let translate = JSON.stringify({created_date:new Date(),title:this.form.value.title,id_customer:this.id_user,decription:this.form.value.description,end_date:this.form.value.deadline,destlang_name:srclanguage.name,srclang_name:destlanguage.name,status_name:"Posted",typename:genretype.name,link_customer:link,cs_userfname:this.cs_userfname,cs_userlname:this.cs_userlname,id_type:genretype.id,src_lang:destlanguage.id,dest_lang:srclanguage.id,translate_status:1,update_date:new Date()});
      console.log(translate);
      this.transervice.putTranslateById(this.id,translate).subscribe( data => {

          console.log("translate change");
          var trans:Translate =  JSON.parse(JSON.stringify(data));
          this.translates.push(trans);
          this.alertService.success("Translate change!",true);
          window.scrollTo(0,0);
          this.form.reset();
          this.router.navigate(['/translates/list']);
          
      }, error => {
            this.alertService.error(error);
            window.scrollTo(0,0);
      });

      }else{ console.log("form is not valid!");
        } 
    }

}

