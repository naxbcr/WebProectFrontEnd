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
var authentication_service_1 = require("../shared/service/authentication.service");
var router_1 = require("@angular/router");
var user_service_1 = require("../shared/service/user.service");
var alert_service_1 = require("../shared/service/alert.service");
var TranslatesComponent = (function () {
    function TranslatesComponent(router, authenticationService, userService, alertService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.alertService = alertService;
        this.Trans = "I am page with translate components. Avaliable for signed in users.";
        window.scrollTo(0, 0);
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    }
    TranslatesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // проверим был ли скачен профиль прежде чем перенаправлять пользователя. 
        if (localStorage.getItem("currentProfile")) {
            console.log("profile found. parsing.");
            this.role = JSON.parse(localStorage.getItem('currentProfile')).postionname;
            if (this.role == 'user') {
                this.router.navigate(['/translates/list']);
            }
            else if (this.role == 'translator') {
                this.router.navigate(['/translates/manage']);
            }
        }
        else {
            //получаем профиль вносим в локал сторедж. перенаправляем.
            console.log("profile not found. loading.");
            this.userService.getProfile(this.username).subscribe(function (data) {
                localStorage.setItem('currentProfile', JSON.stringify(data));
                console.log(JSON.parse(localStorage.getItem('currentProfile')));
                console.log("succes?!");
                _this.role = JSON.parse(localStorage.getItem('currentProfile')).postionname;
                if (_this.role == 'user') {
                    _this.router.navigate(['/translates/list']);
                }
                else if (_this.role == 'translator') {
                    _this.router.navigate(['/translates/manage']);
                }
                else if (_this.role == 'administrator') {
                    _this.router.navigate(['/translates/administration']);
                }
            }, function (error) {
                //без профиля работать не получиться.
                _this.alertService.error(error);
                console.log("cannot download profile data!");
                _this.router.navigate(['/home']);
                window.scrollTo(0, 0);
            });
        }
    };
    TranslatesComponent.prototype.logout = function () {
        this.authenticationService.logout();
    };
    return TranslatesComponent;
}());
TranslatesComponent = __decorate([
    core_1.Component({
        selector: 'app-translates',
        templateUrl: './app/translates/translates.html',
        styles: ['']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        authentication_service_1.AuthenticationService, user_service_1.UserService, alert_service_1.AlertService])
], TranslatesComponent);
exports.TranslatesComponent = TranslatesComponent;
//# sourceMappingURL=translates.component.js.map