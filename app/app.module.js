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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
//my ROOT component
var app_component_1 = require("./app.component");
// non-authorized components
var login_component_1 = require("./components/login-form/login.component");
var register_component_1 = require("./components/register-form/register.component");
var contact_component_1 = require("./components/contact-form/contact.component");
var info_component_1 = require("./components/info/info.component"); // services info
// authorized components
var trans_list_component_1 = require("./components/trans-list/trans-list.component");
var trans_item_component_1 = require("./components/trans-item/trans-item.component");
var trans_item_new_order_component_1 = require("./components/trans-item-new-order/trans-item-new-order.component");
var trans_form_component_1 = require("./components/trans-form/trans-form.component");
var trans_formforedit_component_1 = require("./components/trans-formforedit/trans-formforedit.component");
var trans_info_component_1 = require("./components/trans-info/trans-info.component");
var translist_manager_component_1 = require("./components/translist-manager/translist-manager.component");
var profile_form_component_1 = require("./components/profile-form/profile-form.component");
var administration_component_1 = require("./components/administration/administration.component");
var get_new_order_component_1 = require("./components/get-new-order/get-new-order.component");
var working_list_component_1 = require("./components/working-list/working-list.component");
var new_order_info_component_1 = require("./components/new-order-info/new-order-info.component");
var admin_users_component_1 = require("./components/admin-users/admin-users.component");
var admin_translates_component_1 = require("./components/admin-translates/admin-translates.component");
var admin_transregister_component_1 = require("./components/admin-transregister/admin-transregister.component");
// "page" components
var home_component_1 = require("./home/home.component");
var translates_component_1 = require("./translates/translates.component"); // should be auth
// routing 
var app_routes_1 = require("./app.routes");
// Guards
var auth_guards_1 = require("./guards/auth.guards");
var user_guards_1 = require("./guards/user.guards");
var translator_guards_1 = require("./guards/translator.guards");
var admin_guards_1 = require("./guards/admin.guards");
// Services
// все сервисы обязательно нужно указать ниже в НгМодуль в поле провайдерс иначе будут ошибки опять!
var authentication_service_1 = require("./shared/service/authentication.service"); // user service,trans service and other !!!
var alert_service_1 = require("./shared/service/alert.service");
var alert_component_1 = require("./components/alert/alert.component");
var user_service_1 = require("./shared/service/user.service");
var trans_service_1 = require("./shared/service/trans.service");
var comment_service_1 = require("./shared/service/comment.service"); // bez etovo ne budet rabotat, eto pozvoljaet ispolzovat 1 comment service na vse komponenti.
var pager_service_component_1 = require("./shared/service/pager.service.component");
var stats_service_1 = require("./shared/service/stats.service");
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var ng2_charts_1 = require("ng2-charts/ng2-charts");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, app_routes_1.routing, http_1.HttpModule, ng2_charts_1.ChartsModule],
        declarations: [
            app_component_1.AppComponent, login_component_1.Login, register_component_1.Register, info_component_1.Info, contact_component_1.Contact, trans_list_component_1.Translist, trans_item_component_1.Transitem, translist_manager_component_1.Translistmanager, administration_component_1.AdministrationComponent,
            home_component_1.HomeComponent, translates_component_1.TranslatesComponent, trans_info_component_1.TransInfoComponent, trans_form_component_1.TransFormComponent, alert_component_1.AlertComponent, profile_form_component_1.ProfileFormComponent,
            ng2_file_upload_1.FileSelectDirective, ng2_file_upload_1.FileDropDirective, get_new_order_component_1.Neworderlistmanager, new_order_info_component_1.NewOrderInfoComponent, trans_item_new_order_component_1.Transitemneworder, working_list_component_1.WorkingList, admin_users_component_1.AdminUsersComponent, admin_translates_component_1.AdminTranslatesComponent, admin_transregister_component_1.AdminTranslatorRegistration,
            trans_formforedit_component_1.TransFormForEditComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [auth_guards_1.AuthGuard, admin_guards_1.AdminGuard, translator_guards_1.TranslatorGuard, user_guards_1.UserGuard, authentication_service_1.AuthenticationService, user_service_1.UserService, alert_service_1.AlertService, trans_service_1.TransService, comment_service_1.CommentService, pager_service_component_1.PagerService, stats_service_1.StatisticsService] // DEPENDENCY INJECTION во все компоненты разом
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map