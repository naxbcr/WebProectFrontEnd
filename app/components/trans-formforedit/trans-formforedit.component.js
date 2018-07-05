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
var alert_service_1 = require("../../shared/service/alert.service");
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var router_2 = require("@angular/router");
var URL = 'http://localhost:50528/api/Upload';
var TransFormForEditComponent = (function () {
    function TransFormForEditComponent(activateRoute, router, transervice, alertService) {
        var _this = this;
        this.activateRoute = activateRoute;
        this.router = router;
        this.transervice = transervice;
        this.alertService = alertService;
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: URL
        });
        this.languages = [
            { id: 1, name: 'Russian' },
            { id: 2, name: 'Estonian' },
            { id: 4, name: 'English' },
        ];
        this.types = [
            { id: 1, name: 'Technical, Science' },
            { id: 2, name: 'Official bussiness' },
            { id: 3, name: 'Journalistic, Narrative' },
            { id: 4, name: 'Art, Historical' },
        ];
        this.form = new forms_1.FormGroup({
            title: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5)]),
            deadline: new forms_1.FormControl('', [forms_1.Validators.required]),
            textgenre: new forms_1.FormControl('', [forms_1.Validators.required]),
            sourcelanguage: new forms_1.FormControl('', [forms_1.Validators.required]),
            destinationlanguage: new forms_1.FormControl('', [forms_1.Validators.required]),
            //chosenfile: new FormControl(''), // [Validators.required] - пришлось убрать, багует файл есть но пишет что его нет. нельзя поэтому сабмит сделать, хотя requred через HTML работает прекрастно!
            description: new forms_1.FormControl('')
        });
        this.subscription = activateRoute.params.subscribe(function (params) { return _this.id = params['id']; });
        this.id_user = JSON.parse(localStorage.getItem('currentProfile')).id;
        //this.translateforedit = new Translate;
        this.translates = new Array();
        this.cs_userfname = JSON.parse(localStorage.getItem('currentProfile')).first_name;
        this.cs_userlname = JSON.parse(localStorage.getItem('currentProfile')).last_name;
        //perevod mozno zakazivat min za 3 dnja.
        this.mindate = new Date(Date.now());
        this.mindate.setDate(this.mindate.getDate() + 3);
        this.uploader._onCompleteItem = function (item, response, status, headers) {
            console.log("file is uploaded ?", item, status);
            console.log(response);
            _this.uploaded = true;
            _this.filelink = item._file.name;
        };
        this.uploaded = false; // так как вырезали поле из обьекта  form, необходимо отслеживать загрузку текущего(выбранного) файла.
    }
    TransFormForEditComponent.prototype.onFileChange = function () {
        if (this.uploader.queue.length > 1) {
            this.uploader.queue[0].remove(); //чтобы не заливали кучу файлов
        }
        this.uploaded = false;
    };
    TransFormForEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Translate: " + this.id);
        this.transervice.getTranslateById(this.id).subscribe(function (data) {
            _this.form.controls['deadline'].setValue(data.end_date.toString().substring(0, 10));
            _this.translateforedit = data;
            _this.translateforedit.end_date = new Date(data.end_date);
            _this.end_date = new Date(_this.translateforedit.end_date);
            _this.form.patchValue({
                title: _this.translateforedit.title,
                //deadline:this.translateforedit.end_date,
                textgenre: _this.translateforedit.id_type,
                sourcelanguage: _this.translateforedit.dest_lang,
                destinationlanguage: _this.translateforedit.src_lang,
                description: _this.translateforedit.decription
            });
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    TransFormForEditComponent.prototype.saveTranslate = function () {
        var _this = this;
        if (this.form.valid) {
            var destlanguage = this.languages.find(function (language) { return language.id === parseInt(_this.form.value.destinationlanguage); });
            var srclanguage = this.languages.find(function (language) { return language.id === parseInt(_this.form.value.sourcelanguage); });
            var genretype = this.types.find(function (type) { return type.id === parseInt(_this.form.value.textgenre); });
            var link = void 0;
            if (this.uploaded) {
                link = this.filelink;
            }
            else {
                link = this.translateforedit.link_customer;
            }
            var translate = JSON.stringify({ created_date: new Date(), title: this.form.value.title, id_customer: this.id_user, decription: this.form.value.description, end_date: this.form.value.deadline, destlang_name: srclanguage.name, srclang_name: destlanguage.name, status_name: "Posted", typename: genretype.name, link_customer: link, cs_userfname: this.cs_userfname, cs_userlname: this.cs_userlname, id_type: genretype.id, src_lang: destlanguage.id, dest_lang: srclanguage.id, translate_status: 1, update_date: new Date() });
            console.log(translate);
            this.transervice.putTranslateById(this.id, translate).subscribe(function (data) {
                console.log("translate change");
                var trans = JSON.parse(JSON.stringify(data));
                _this.translates.push(trans);
                _this.alertService.success("Translate change!", true);
                window.scrollTo(0, 0);
                _this.form.reset();
                _this.router.navigate(['/translates/list']);
            }, function (error) {
                _this.alertService.error(error);
                window.scrollTo(0, 0);
            });
        }
        else {
            console.log("form is not valid!");
        }
    };
    return TransFormForEditComponent;
}());
TransFormForEditComponent = __decorate([
    core_1.Component({
        selector: 'trans-formforedit',
        templateUrl: './app/components/trans-formforedit/trans-formforedit.html',
        styles: ["#createform { margin-top: 60px; } .col-lg-10 {margin-bottom: 2rem;} .col-mg-10 { margin-bottom: 2rem;} "]
    }),
    __metadata("design:paramtypes", [router_2.ActivatedRoute, router_1.Router, trans_service_1.TransService, alert_service_1.AlertService])
], TransFormForEditComponent);
exports.TransFormForEditComponent = TransFormForEditComponent;
//# sourceMappingURL=trans-formforedit.component.js.map