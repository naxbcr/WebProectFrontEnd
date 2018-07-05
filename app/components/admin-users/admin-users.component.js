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
var AdminUsersComponent = (function () {
    function AdminUsersComponent(router, userService, alertService, pagerService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.pagerService = pagerService;
        // pager object
        this.pager = {};
        this.id = JSON.parse(localStorage.getItem('currentProfile')).id;
    }
    AdminUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getAllUsers().subscribe(function (data) {
            _this.userlist = data;
            console.log(_this.userlist);
            // себя мы в списке видеть не должны!
            var index = _this.userlist.findIndex(function (x) { return x.id == _this.id; });
            _this.userlist.splice(index, 1);
            _this.setPage(1);
        });
    };
    AdminUsersComponent.prototype.removeUser = function (user) {
        var _this = this;
        this.userService.DeleteUser(user.id).subscribe(function (data) {
            _this.userlist.splice(_this.userlist.findIndex(function (x) { return x.id == user.id; }), 1);
            _this.setPage(1);
            _this.alertService.success(user.email + " Removed!");
        }, function (error) {
            _this.alertService.error(error);
            window.scrollTo(0, 0);
        });
    };
    AdminUsersComponent.prototype.makeTranslator = function (user) {
        var _this = this;
        user.id_position = 2;
        user.postionname = "translator";
        //user.emailconfirm = true;
        var jsonuser = JSON.stringify(user);
        this.userService.update(jsonuser, user.id.toString()).subscribe(function (data) {
            _this.alertService.success(user.email + " is translator now!");
        }, function (error) {
            _this.alertService.error(error);
            window.scrollTo(0, 0);
        });
    };
    AdminUsersComponent.prototype.makeAdmin = function (user) {
        var _this = this;
        user.id_position = 3;
        user.postionname = "administrator";
        //user.emailconfirm = true;
        var jsonuser = JSON.stringify(user);
        this.userService.update(jsonuser, user.id.toString()).subscribe(function (data) {
            _this.alertService.success(user.email + " is admin now!");
        }, function (error) {
            _this.alertService.error(error);
            window.scrollTo(0, 0);
        });
    };
    AdminUsersComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.userlist.length, page, 8);
        // get current page of items
        this.pagedItems = this.userlist.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    return AdminUsersComponent;
}());
AdminUsersComponent = __decorate([
    core_1.Component({
        selector: 'admin-users',
        templateUrl: './app/components/admin-users/admin-users.html',
        styles: [' .gi-2x{font-size: 2em;}.gi-3x{font-size: 3em;}.gi-4x{font-size: 4em;}.gi-5x{font-size: 5em;}']
    }),
    __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService, alert_service_1.AlertService, pager_service_component_1.PagerService])
], AdminUsersComponent);
exports.AdminUsersComponent = AdminUsersComponent;
//# sourceMappingURL=admin-users.component.js.map