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
var trans_model_1 = require("../../shared/model/trans.model");
var remainingtime_model_1 = require("../../shared/model/remainingtime.model");
var Transitemneworder = (function () {
    function Transitemneworder() {
    }
    Transitemneworder.prototype.ngOnInit = function () {
        this.time = new remainingtime_model_1.RemainingTime(this.trans);
    };
    return Transitemneworder;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", trans_model_1.Translate)
], Transitemneworder.prototype, "trans", void 0);
Transitemneworder = __decorate([
    core_1.Component({
        selector: 'trans-item-new-order',
        templateUrl: './app/components/trans-item-new-order/trans-item-new-order.html'
    }),
    __metadata("design:paramtypes", [])
], Transitemneworder);
exports.Transitemneworder = Transitemneworder;
//# sourceMappingURL=trans-item-new-order.component.js.map