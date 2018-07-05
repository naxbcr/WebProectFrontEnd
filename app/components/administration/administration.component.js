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
var trans_service_1 = require("../../shared/service/trans.service");
var user_service_1 = require("../../shared/service/user.service");
var router_1 = require("@angular/router");
var alert_service_1 = require("../../shared/service/alert.service");
var stats_service_1 = require("../../shared/service/stats.service");
var AdministrationComponent = (function () {
    function AdministrationComponent(router, transervice, userService, alertService, statsService) {
        this.router = router;
        this.transervice = transervice;
        this.userService = userService;
        this.alertService = alertService;
        this.statsService = statsService;
        // Pie
        this.pieChartLabels = ['Total clients', 'Total traslators', 'Total admins'];
        this.pieChartData = [0, 0, 0];
        this.pieChartType = 'pie';
        // Doughnut
        this.doughnutChartLabels = ['Total translated', 'Total posted', 'Total in progress'];
        this.doughnutChartData = [0, 0, 0];
        this.doughnutChartType = 'doughnut';
        this.totalusers = 0;
        this.totalnrd = 0;
        this.totalorders = 0;
        this.totalexpired = 0;
    }
    // events
    AdministrationComponent.prototype.chartClicked = function (e) {
        //console.log(e);
    };
    AdministrationComponent.prototype.chartHovered = function (e) {
        //console.log(e);
    };
    AdministrationComponent.prototype.chartClicked2 = function (e) {
        //console.log(e);
    };
    AdministrationComponent.prototype.chartHovered2 = function (e) {
        //console.log(e);
    };
    AdministrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.statsService.getGlobalStatistics().subscribe(function (data) {
            console.log(JSON.parse(JSON.stringify(data)));
            var stats = JSON.parse(JSON.stringify(data));
            _this.totalusers = stats.totalusers + stats.totaltranslators + stats.totaladmins;
            _this.totalnrd = stats.notredeemedusers;
            _this.totalorders = stats.translated + stats.posted + stats.inprogress;
            _this.totalexpired = stats.expired;
            _this.pieChartData = [stats.totalusers, stats.totaltranslators, stats.totaladmins];
            _this.doughnutChartData = [stats.translated, stats.posted, stats.inprogress];
        });
    };
    return AdministrationComponent;
}());
AdministrationComponent = __decorate([
    core_1.Component({
        selector: 'translist-manager',
        templateUrl: './app/components/administration/administration.html',
        styles: ['']
    }),
    __metadata("design:paramtypes", [router_1.Router, trans_service_1.TransService, user_service_1.UserService, alert_service_1.AlertService, stats_service_1.StatisticsService])
], AdministrationComponent);
exports.AdministrationComponent = AdministrationComponent;
//# sourceMappingURL=administration.component.js.map