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
var router_1 = require("@angular/router");
var TranslatorGuard = (function () {
    function TranslatorGuard(router) {
        this.router = router;
    }
    TranslatorGuard.prototype.canActivate = function () {
        if (JSON.parse(localStorage.getItem('currentProfile')).postionname == 'translator') {
            // logged in so return true
            console.log("Role is translator");
            return true;
        }
        this.router.navigate(['/home']);
        console.log("router navigate to home! cant find currentUser");
        return false;
    };
    return TranslatorGuard;
}());
TranslatorGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], TranslatorGuard);
exports.TranslatorGuard = TranslatorGuard;
//# sourceMappingURL=translator.guards.js.map