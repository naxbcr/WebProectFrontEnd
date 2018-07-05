"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var user_service_1 = require("../../shared/service/user.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var alert_service_1 = require("../../shared/service/alert.service");
var authentication_service_1 = require("../../shared/service/authentication.service");
var ProfileFormComponent = (function () {
    function ProfileFormComponent(authenticationService, userService, router, alertService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.router = router;
        this.alertService = alertService;
        this.editprofile = false;
        this.editpwd = false;
        this.EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.NAME_REGEXP = /^[a-z0-9'-]+$/i;
        this.PWD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i; // at least 1 number and 1 alphabetic symbol
        this.group = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.pattern(this.EMAIL_REGEXP)]),
            firstname: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2), forms_1.Validators.pattern(this.NAME_REGEXP)]),
            lastname: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2), forms_1.Validators.pattern(this.NAME_REGEXP)])
        });
        this.group2 = new forms_1.FormGroup({
            pass1: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.pattern(this.PWD_REGEXP)]),
            pass2: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.pattern(this.PWD_REGEXP)])
        });
    }
    ProfileFormComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('currentProfile'));
        console.log("profile user on /profile " + JSON.stringify(this.user));
        //данные юзера загружаются сразу при входе в систему, повторно делать это нет необходимости
        //  let mail = JSON.parse(localStorage.getItem('currentUser')).username;
        //  this.userService.getProfile(mail).subscribe(
        //       data => { this.user = JSON.parse(JSON.stringify(data));
        //                 console.log(this.user;  
        //         }
        //  );
    };
    ProfileFormComponent.prototype.logout = function () {
        this.authenticationService.logout();
    };
    ProfileFormComponent.prototype.modify = function () {
        this.editprofile = true;
        this.editpwd = false;
        this.group.controls['email'].setValue(this.user.email);
        this.group.controls['firstname'].setValue(this.user.first_name);
        this.group.controls['lastname'].setValue(this.user.last_name);
    };
    ProfileFormComponent.prototype.changepass = function () {
        this.editpwd = true;
        this.editprofile = false;
    };
    ProfileFormComponent.prototype.back = function () {
        this.editpwd = false;
        this.editprofile = false;
        this.group.reset();
        this.group2.reset();
    };
    ProfileFormComponent.prototype.updatePwd = function () {
        var _this = this;
        if (this.group2.valid && this.pwdAreEqual()) {
            // передаем не обьект юзер, так как обьект(класс юзер) не хранит пароль, хранить пароль юзера думаю не стоит нигде кроме БД.
            var user = JSON.stringify({ id: this.user.id, email: this.user.email, first_name: this.user.first_name, last_name: this.user.last_name, password: this.group2.value.pass1, id_position: this.user.id_position });
            this.userService.update(user, this.user.id.toString()).subscribe(function (data) {
                console.log(data);
                _this.alertService.success("Password changed.");
                window.scrollTo(0, 0);
                _this.back();
            }, function (error) {
                _this.alertService.error(error);
                window.scrollTo(0, 0);
            });
        }
        else {
            this.alertService.error("Password is invalid, please check input.");
            window.scrollTo(0, 0);
        }
    };
    ProfileFormComponent.prototype.updateProfile = function () {
        var _this = this;
        if (this.group.valid) {
            var user_1 = JSON.stringify({ id: this.user.id, email: this.group.value.email, first_name: this.group.value.firstname, last_name: this.group.value.lastname, id_position: this.user.id_position });
            console.log("upd user:" + user_1);
            this.userService.update(user_1, this.user.id.toString()).subscribe(function (data) {
                if (data == true) {
                    if (_this.user.email != JSON.parse(user_1).email) {
                        _this.router.navigate(['/home']); // придется выкинуть пользователя так как ТОКЕН содержит почту, мы не можем редактировать токен
                        _this.alertService.success("Email changed. Please re-login!");
                        window.scrollTo(0, 0);
                    }
                    else {
                        // емайл прежний, заменим данные из localstorage
                        _this.alertService.success("Profile changed.");
                        _this.user.first_name = JSON.parse(user_1).first_name;
                        _this.user.last_name = JSON.parse(user_1).last_name;
                        localStorage.setItem('currentProfile', JSON.stringify(_this.user));
                        window.scrollTo(0, 0);
                        _this.back();
                    }
                }
                else {
                    _this.alertService.error("Such email address has already taken by someone else.");
                    window.scrollTo(0, 0);
                }
            }, function (error) {
                _this.alertService.error(error);
                window.scrollTo(0, 0);
            });
        }
        else {
            this.alertService.error("Invalid input");
            window.scrollTo(0, 0);
        }
    };
    ProfileFormComponent.prototype.pwdAreEqual = function () {
        var valid = false;
        if (this.group2.value.pass1 == this.group2.value.pass2) {
            return valid = true;
        }
        return valid;
    };
    return ProfileFormComponent;
}());
ProfileFormComponent = __decorate([
    core_1.Component({
        selector: 'profile-form',
        templateUrl: './app/components/profile-form/profile-form.html',
        styles: [''],
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, user_service_1.UserService, router_1.Router, alert_service_1.AlertService])
], ProfileFormComponent);
exports.ProfileFormComponent = ProfileFormComponent;
//# sourceMappingURL=profile-form.component.js.map