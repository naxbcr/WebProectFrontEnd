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
var Translistmanager = (function () {
    function Translistmanager(transervice, userService, router, alertService, statsService) {
        this.transervice = transervice;
        this.userService = userService;
        this.router = router;
        this.alertService = alertService;
        this.statsService = statsService;
        // Pie
        this.pieChartLabels = ['Total translated', 'Total in progress', 'Total expired'];
        this.pieChartData = [0, 0, 0];
        this.pieChartType = 'pie';
        // Doughnut
        this.doughnutChartLabels = ['Total income', 'Total future income', 'Total lost income'];
        this.doughnutChartData = [0, 0, 0];
        this.doughnutChartType = 'doughnut';
    }
    // events
    Translistmanager.prototype.chartClicked = function (e) {
        //console.log(e);
    };
    Translistmanager.prototype.chartHovered = function (e) {
        //console.log(e);
    };
    Translistmanager.prototype.chartClicked2 = function (e) {
        //console.log(e);
    };
    Translistmanager.prototype.chartHovered2 = function (e) {
        //console.log(e);
    };
    Translistmanager.prototype.ngOnInit = function () {
        var _this = this;
        this.id = JSON.parse(localStorage.getItem('currentProfile')).id;
        this.statsService.getTranslatorStatistics(this.id).subscribe(function (data) {
            var stats = JSON.parse(JSON.stringify(data));
            _this.tproceed = stats.translated + stats.inprogress;
            _this.apgain = stats.mediumprice;
            _this.pieChartData = [stats.translated, stats.inprogress, stats.expired];
            _this.doughnutChartData = [stats.totalgain, stats.futuregain, stats.lostgain];
        });
    };
    return Translistmanager;
}());
Translistmanager = __decorate([
    core_1.Component({
        selector: 'translist-manager',
        templateUrl: './app/components/translist-manager/translist-manager.html',
        styles: ['']
    }),
    __metadata("design:paramtypes", [trans_service_1.TransService, user_service_1.UserService, router_1.Router, alert_service_1.AlertService, stats_service_1.StatisticsService])
], Translistmanager);
exports.Translistmanager = Translistmanager;
//# sourceMappingURL=translist-manager.component.js.map