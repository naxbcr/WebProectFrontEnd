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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var alert_service_1 = require("../../shared/service/alert.service");
var authentication_service_1 = require("../../shared/service/authentication.service");
var Login = (function () {
    function Login(router, authenticationService, alertService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.loading = false;
        this.error = '';
        this.mygroup = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)])
        });
    }
    Login.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
    };
    Login.prototype.signIn = function () {
        var _this = this;
        if (this.mygroup.valid)
            console.log("Signing in with: " + this.mygroup.value.email + " / " + this.mygroup.value.password + " valid: " + this.mygroup.valid);
        this.loading = true;
        this.authenticationService.login(this.mygroup.value.email, this.mygroup.value.password)
            .subscribe(function (data) {
            _this.loading = false;
            //this.router.navigate(['/translates/list']); 
            _this.router.navigate(['/translates']);
            _this.alertService.success("Successful logged in, with " + _this.mygroup.value.email, true);
        }, function (error) {
            if (error.status == 400) {
                error = error.status + " " + error.json().error_description.toString();
            }
            _this.alertService.error(error);
            _this.loading = false;
            window.scrollTo(0, 0);
        });
    };
    return Login;
}());
Login = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './app/components/login-form/login.html',
        styles: [".col-lg-10 { margin-bottom: 2rem; }\n         #logtop { margin-top: 60px;}\n    "]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        authentication_service_1.AuthenticationService,
        alert_service_1.AlertService])
], Login);
exports.Login = Login;
//# sourceMappingURL=login.component.js.map