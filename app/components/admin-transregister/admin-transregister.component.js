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
var router_1 = require("@angular/router");
var alert_service_1 = require("../../shared/service/alert.service");
var pager_service_component_1 = require("../../shared/service/pager.service.component");
var forms_1 = require("@angular/forms");
var AdminTranslatorRegistration = (function () {
    function AdminTranslatorRegistration(router, userService, alertService, pagerService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.pagerService = pagerService;
        this.loading = false;
        this.error = '';
        this.hidden = true;
    }
    AdminTranslatorRegistration.prototype.ngOnInit = function () {
        this.formgroup = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]),
            pass1: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]),
            pass2: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]),
            fname: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2)]),
            lname: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2)])
        });
    };
    AdminTranslatorRegistration.prototype.areEqual = function () {
        var valid = false;
        if (this.formgroup.value.pass1 == this.formgroup.value.pass2) {
            return valid = true;
        }
        return valid;
    };
    AdminTranslatorRegistration.prototype.Register = function () {
        var _this = this;
        var z = 2; // 2 - translator
        if (this.formgroup.valid && this.areEqual()) {
            console.log("Registration: " + this.formgroup.value);
            this.user = JSON.stringify({ email: this.formgroup.value.email, first_name: this.formgroup.value.fname, last_name: this.formgroup.value.lname, password: this.formgroup.value.pass1, id_position: z });
            this.loading = true;
            this.userService.create(this.user)
                .subscribe(function (data) {
                _this.alertService.success('Registration successful, we have send a message to ' + _this.formgroup.value.email + ' with confirmation link.', true);
                window.scrollTo(0, 0);
                _this.loading = false;
                _this.formgroup.reset();
            }, function (error) {
                if (error.status == 409) {
                    error = "409 User with such email already exists";
                }
                _this.alertService.error(error);
                _this.loading = false;
                window.scrollTo(0, 0);
            });
            console.log("jsonparse: " + JSON.parse(this.user));
        }
        else if (!this.areEqual()) {
            this.alertService.error("Password doest not match!");
            window.scrollTo(0, 0);
        }
    };
    return AdminTranslatorRegistration;
}());
AdminTranslatorRegistration = __decorate([
    core_1.Component({
        selector: 'translator-registration',
        templateUrl: './app/components/admin-transregister/admin-transregister.html',
        styles: ['.col-lg-10 { margin-bottom: 2rem; }']
    }),
    __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService, alert_service_1.AlertService, pager_service_component_1.PagerService])
], AdminTranslatorRegistration);
exports.AdminTranslatorRegistration = AdminTranslatorRegistration;
//# sourceMappingURL=admin-transregister.component.js.map