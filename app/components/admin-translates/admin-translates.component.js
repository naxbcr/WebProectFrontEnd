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
var remainingtime_model_1 = require("../../shared/model/remainingtime.model");
var trans_service_1 = require("../../shared/service/trans.service");
var user_service_1 = require("../../shared/service/user.service");
var router_1 = require("@angular/router");
var alert_service_1 = require("../../shared/service/alert.service");
var pager_service_component_1 = require("../../shared/service/pager.service.component");
var AdminTranslatesComponent = (function () {
    function AdminTranslatesComponent(router, transervice, userService, alertService, pagerService) {
        this.router = router;
        this.transervice = transervice;
        this.userService = userService;
        this.alertService = alertService;
        this.pagerService = pagerService;
        // pager object
        this.pager = {};
        this.time = []; // ja napisa dlja udobstva, smotri klass v papke model!
        this.today = new Date();
    }
    AdminTranslatesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transervice.getAllTranslate().subscribe(function (data) {
            _this.translatelist = data;
            console.log(_this.translatelist);
            _this.setPage(1);
            //Zapolnim vremja! 
            for (var _i = 0, _a = _this.translatelist; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.time.push(new remainingtime_model_1.RemainingTime(item));
            }
        });
    };
    AdminTranslatesComponent.prototype.removeTranslate = function (translate) {
        var _this = this;
        this.transervice.DeleteTranslate(translate.id).subscribe(function (data) {
            _this.translatelist.splice(_this.translatelist.findIndex(function (x) { return x.id == translate.id; }), 1);
            //this.pagedItems.splice(this.translatelist.findIndex( x=>x.id == translate.id),1);
            _this.setPage(1);
            _this.alertService.success(translate.title + " Removed!");
        }, function (error) {
            _this.alertService.error(error);
            window.scrollTo(0, 0);
        });
    };
    AdminTranslatesComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.translatelist.length, page, 10);
        // get current page of items
        this.pagedItems = this.translatelist.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    return AdminTranslatesComponent;
}());
AdminTranslatesComponent = __decorate([
    core_1.Component({
        selector: 'admin-translates',
        templateUrl: './app/components/admin-translates/admin-translates.html',
        styles: ['']
    }),
    __metadata("design:paramtypes", [router_1.Router, trans_service_1.TransService, user_service_1.UserService, alert_service_1.AlertService, pager_service_component_1.PagerService])
], AdminTranslatesComponent);
exports.AdminTranslatesComponent = AdminTranslatesComponent;
//# sourceMappingURL=admin-translates.component.js.map