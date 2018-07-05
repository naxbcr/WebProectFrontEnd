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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAllUsers = function () {
        return this.http.get('http://localhost:50528/api/user', this.jwt()).map(function (response) {
            return response.json();
        });
    };
    UserService.prototype.DeleteUser = function (id) {
        return this.http.delete('http://localhost:50528/api/user/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        //localhost:50528
        console.log("model: " + user);
        return this.http.post('http://localhost:50528/api/user/register', JSON.parse(user), this.contenttype()).map(function (response) { return response.json(); });
    };
    // under construction...
    UserService.prototype.getProfile = function (email) {
        return this.http.get('http://localhost:50528/api/user/email/' + email + "/", this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.update = function (user, id) {
        console.log("upd model:" + user);
        return this.http.put('http://localhost:50528/api/user/' + id, JSON.parse(user), this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'Content-Type': 'application/json' });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    UserService.prototype.contenttype = function () {
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Accept', 'application/json');
        console.log("headers:" + headers.toJSON());
        return new http_1.RequestOptions({ headers: headers });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map