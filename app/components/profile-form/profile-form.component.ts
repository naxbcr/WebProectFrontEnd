import { Component, OnInit } from "@angular/core"
import { User } from "../../shared/model/user.model"
import { UserService } from '../../shared/service/user.service'
import {Observable} from 'rxjs/Observable';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import { AlertService } from '../../shared/service/alert.service'
import { AuthenticationService } from '../../shared/service/authentication.service';


@Component({
    selector: 'profile-form',
    templateUrl: './app/components/profile-form/profile-form.html',
    styles: [ ''],
    //providers: [TransService, UserService] // DI Type registration
    
})


export class ProfileFormComponent implements OnInit {

    user: User;

    editprofile: Boolean = false;
    editpwd: Boolean = false;

    EMAIL_REGEXP: RegExp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    NAME_REGEXP: RegExp = /^[a-z0-9'-]+$/i;
    PWD_REGEXP: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i; // at least 1 number and 1 alphabetic symbol
    
    
    group: FormGroup = new FormGroup({
       email: new FormControl('',[Validators.required, Validators.minLength(5), Validators.pattern(this.EMAIL_REGEXP)]),
       firstname: new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern(this.NAME_REGEXP)]),
       lastname: new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern(this.NAME_REGEXP)])
    });

    group2: FormGroup = new FormGroup({
       pass1: new FormControl('',[Validators.required, Validators.minLength(6), Validators.pattern(this.PWD_REGEXP)]),
       pass2: new FormControl('',[Validators.required, Validators.minLength(6), Validators.pattern(this.PWD_REGEXP)])

    });
    
    constructor(private authenticationService: AuthenticationService,private userService: UserService,private router: Router, private alertService: AlertService){
           
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('currentProfile'));
        console.log("profile user on /profile "+JSON.stringify(this.user));

        //данные юзера загружаются сразу при входе в систему, повторно делать это нет необходимости
        //  let mail = JSON.parse(localStorage.getItem('currentUser')).username;
        //  this.userService.getProfile(mail).subscribe(
        //       data => { this.user = JSON.parse(JSON.stringify(data));
        //                 console.log(this.user;  
        //         }
        //  );
        
    }

    logout(): void{
        this.authenticationService.logout();
    }

    modify(): void{
        this.editprofile = true; this.editpwd = false;
        this.group.controls['email'].setValue(this.user.email);
        this.group.controls['firstname'].setValue(this.user.first_name);
        this.group.controls['lastname'].setValue(this.user.last_name); 
    }

    changepass():void{ 
        this.editpwd = true; this.editprofile = false;
    }

    back(): void{
        this.editpwd = false; this.editprofile = false;
        this.group.reset();
        this.group2.reset();
    }

    updatePwd(): void{
         if(this.group2.valid && this.pwdAreEqual()){
            // передаем не обьект юзер, так как обьект(класс юзер) не хранит пароль, хранить пароль юзера думаю не стоит нигде кроме БД.
            let user = JSON.stringify({id:this.user.id,email:this.user.email,first_name: this.user.first_name,last_name:this.user.last_name,password:this.group2.value.pass1,id_position:this.user.id_position});
            this.userService.update(user,this.user.id.toString()).subscribe( data => {
                console.log(data);
                this.alertService.success("Password changed.");
                window.scrollTo(0,0);
                this.back();
            },
            error => {
                this.alertService.error(error);
                window.scrollTo(0,0);
            } );
        }else{ this.alertService.error("Password is invalid, please check input."); window.scrollTo(0,0);}
    }

    updateProfile(): void{
        
        if(this.group.valid){
            let user = JSON.stringify({id:this.user.id,email:this.group.value.email,first_name: this.group.value.firstname,last_name:this.group.value.lastname,id_position:this.user.id_position});
            console.log("upd user:"+user);

            this.userService.update(user,this.user.id.toString()).subscribe( data => {
                
                if(data == true){ //рест вернет ТРУ если апдейт прошел
                    if(this.user.email != JSON.parse(user).email){
                        this.router.navigate(['/home']); // придется выкинуть пользователя так как ТОКЕН содержит почту, мы не можем редактировать токен
                        this.alertService.success("Email changed. Please re-login!");
                        window.scrollTo(0,0);
                     }else{
                         // емайл прежний, заменим данные из localstorage
                    this.alertService.success("Profile changed.");
                    this.user.first_name = JSON.parse(user).first_name;
                    this.user.last_name = JSON.parse(user).last_name;
                    localStorage.setItem('currentProfile',JSON.stringify(this.user));
                    window.scrollTo(0,0);
                    this.back();
                }
            }else { //если апдейт не прошел, но ошибки нет, значит почта занета кем-то.
                this.alertService.error("Such email address has already taken by someone else.");
                window.scrollTo(0,0); }
                    
            }, error => { // какаято дичь случилась
                    this.alertService.error(error);
                    window.scrollTo(0,0);
            });
        }else{
            this.alertService.error("Invalid input"); window.scrollTo(0,0);
        }
    }

    pwdAreEqual(): boolean {
            var valid = false;
            if(this.group2.value.pass1 == this.group2.value.pass2){ return valid = true;}
            return valid;   
        }      
}