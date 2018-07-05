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
var trans_service_1 = require("../../shared/service/trans.service");
var comment_service_1 = require("../../shared/service/comment.service");
var alert_service_1 = require("../../shared/service/alert.service");
var TransInfoComponent = (function () {
    function TransInfoComponent(activateRoute, router, transervice, commentService, alertService) {
        var _this = this;
        this.activateRoute = activateRoute;
        this.router = router;
        this.transervice = transervice;
        this.commentService = commentService;
        this.alertService = alertService;
        this.form = new forms_1.FormGroup({
            comment: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2)]),
        });
        this.subscription = activateRoute.params.subscribe(function (params) { return _this.id = params['id']; });
        this.today = new Date();
        this.comments = new Array();
        this.id_user = JSON.parse(localStorage.getItem('currentProfile')).id;
        this.status = JSON.parse(localStorage.getItem('currentProfile')).postionname;
    }
    ;
    TransInfoComponent.prototype.deleteTranslate = function () {
        var _this = this;
        this.transervice.DeleteTranslate(this.id).subscribe(function (data) {
            console.log("Translate delete");
            _this.alertService.success("Translate deleted!");
        }, function (error) {
            _this.alertService.error(error);
            window.scrollTo(0, 0);
        });
    };
    TransInfoComponent.prototype.refreshPage = function () {
        var _this = this;
        this.translate = null;
        this.transervice.getTranslateById(this.id).subscribe(function (data) {
            _this.translate = data;
            console.log(_this.translate);
            // вычисляем время до конца
            _this.end_date = new Date(_this.translate.end_date);
            _this.remains = _this.end_date.getTime() - _this.today.getTime();
            _this.hours = Math.ceil(((_this.remains / (1000 * 60 * 60)) % 24));
            _this.minutes = Math.ceil(((_this.remains / (1000 * 60)) % 60));
            _this.days = Math.ceil((_this.remains / (1000 * 60 * 60 * 24)));
        }, function (error) {
            console.log("wtf is going wrong ?");
            console.log(JSON.stringify(error));
        });
    };
    TransInfoComponent.prototype.addComment = function () {
        var _this = this;
        console.log(this.form.value.comment);
        if (this.form.valid) {
            var comment = JSON.stringify({ created_date: new Date(), comment: this.form.value.comment, id_user: this.id_user, id_translate: this.id });
            this.commentService.PostComment(comment).subscribe(function (data) {
                //ответ на запрос ПОСТ коммента содержит уже содержит новый коммент и ссылку на него в заголовке, там уже есть новый ИД.
                console.log("comment posted");
                var com = JSON.parse(JSON.stringify(data));
                //добавим к комменту из респонса данные текушего пользователя, чтобы не запрашивать их отдельно
                com.postion = JSON.parse(localStorage.getItem('currentProfile')).postionname;
                com.userfname = JSON.parse(localStorage.getItem('currentProfile')).first_name;
                com.userlname = JSON.parse(localStorage.getItem('currentProfile')).last_name;
                _this.comments.push(com);
                _this.alertService.success("Message sended!");
            }, function (error) {
                _this.alertService.error(error);
                window.scrollTo(0, 0);
            });
            this.form.reset();
        }
    };
    TransInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Translate: " + this.id);
        this.transervice.getTranslateById(this.id).subscribe(function (data) {
            _this.translate = data;
            console.log(_this.translate);
            // вычисляем время до конца
            _this.end_date = new Date(_this.translate.end_date);
            _this.remains = _this.end_date.getTime() - _this.today.getTime();
            _this.hours = Math.ceil(((_this.remains / (1000 * 60 * 60)) % 24));
            _this.minutes = Math.ceil(((_this.remains / (1000 * 60)) % 60));
            _this.days = Math.ceil((_this.remains / (1000 * 60 * 60 * 24)));
            // загружаем комменты только если загрузился сам перевод
            console.log("Comment:");
            _this.commentService.GetAllForTranslate(_this.id).subscribe(function (data) {
                _this.comments = data;
                console.log(_this.comments);
            }, function (error) {
                if (error.status == 404) { }
            });
        }, function (error) {
            console.log("wtf is going wrong ?");
            console.log(JSON.stringify(error));
        });
    };
    TransInfoComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    TransInfoComponent.prototype.remove = function (id, index) {
        var _this = this;
        this.commentService.removeComment(id).subscribe(function (data) {
            _this.comments.splice(index, 1);
            _this.alertService.success("Removed!");
            window.scrollTo(0, 0);
        }, function (error) {
            _this.alertService.error(error);
            window.scrollTo(0, 0);
        });
    };
    TransInfoComponent.prototype.downloadFile = function (name) {
        this.transervice.getFile(name);
    };
    return TransInfoComponent;
}());
TransInfoComponent = __decorate([
    core_1.Component({
        selector: 'trans-info',
        templateUrl: './app/components/trans-info/trans-info.html',
        styles: ['']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, trans_service_1.TransService, comment_service_1.CommentService, alert_service_1.AlertService])
], TransInfoComponent);
exports.TransInfoComponent = TransInfoComponent;
//# sourceMappingURL=trans-info.component.js.map