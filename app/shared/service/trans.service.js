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
var TransService = (function () {
    function TransService(http) {
        this.http = http;
    }
    TransService.prototype.getAllAvaliableForWork = function () {
        return this.http.get('http://localhost:50528/api/translate/avaliable', this.jwt()).map(function (response) {
            return response.json();
        });
    };
    TransService.prototype.getAllTranslate = function () {
        return this.http.get('http://localhost:50528/api/translate', this.jwt()).map(function (response) {
            return response.json();
        });
    };
    TransService.prototype.getTranslatesByTranslator = function (id) {
        //localhost:50528/api/translate/user
        return this.http.get('http://localhost:50528/api/translate/translator/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    TransService.prototype.putTranslateById = function (id, translate) {
        return this.http.put('http://localhost:50528/api/translate/' + id, JSON.parse(translate), this.jwt()).map(function (response) {
            console.log("response" + JSON.stringify(response));
            return response.json();
        });
    };
    TransService.prototype.getTranslatesOfUser = function (id) {
        //localhost:50528/api/translate/user
        return this.http.get('http://localhost:50528/api/translate/user/' + id + '/all', this.jwt()).map(function (response) { return response.json(); });
    };
    TransService.prototype.getTranslateById = function (id) {
        return this.http.get('http://localhost:50528/api/translate/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    TransService.prototype.PostTranslate = function (translate) {
        return this.http.post('http://localhost:50528/api/translate', JSON.parse(translate), this.jwt()).map(function (response) {
            console.log("response" + JSON.stringify(response));
            return response.json();
        });
    };
    TransService.prototype.DeleteTranslate = function (id) {
        return this.http.delete('http://localhost:50528/api/translate/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    TransService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'Content-Type': 'application/json' });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    TransService.prototype.getFile = function (myfilename) {
        return this.http.get('http://localhost:50528/api/Download/' + myfilename + "/", { responseType: http_1.ResponseContentType.Blob }).map(function (response) {
            var blob = response.blob();
            return {
                data: new Blob([blob], { type: 'application/octet-stream' }),
                filename: myfilename
            };
        })
            .subscribe(function (res) { saveAs(res.data, res.filename); }, function (error) { console.log(error); });
    };
    return TransService;
}());
TransService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TransService);
exports.TransService = TransService;
//# sourceMappingURL=trans.service.js.map