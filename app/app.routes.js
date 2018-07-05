"use strict";
var router_1 = require("@angular/router");
// guards
var auth_guards_1 = require("./guards/auth.guards");
var user_guards_1 = require("./guards/user.guards");
var translator_guards_1 = require("./guards/translator.guards");
var admin_guards_1 = require("./guards/admin.guards");
// Components
var translates_component_1 = require("./translates/translates.component");
var home_component_1 = require("./home/home.component");
var trans_form_component_1 = require("./components/trans-form/trans-form.component");
var trans_info_component_1 = require("./components/trans-info/trans-info.component");
var trans_list_component_1 = require("./components/trans-list/trans-list.component");
var working_list_component_1 = require("./components/working-list/working-list.component");
var translist_manager_component_1 = require("./components/translist-manager/translist-manager.component"); // Dlja Perevodchika
var get_new_order_component_1 = require("./components/get-new-order/get-new-order.component"); // Dlja Perevodchika novqe zakazi
var profile_form_component_1 = require("./components/profile-form/profile-form.component");
var administration_component_1 = require("./components/administration/administration.component");
var admin_users_component_1 = require("./components/admin-users/admin-users.component");
var admin_translates_component_1 = require("./components/admin-translates/admin-translates.component");
var new_order_info_component_1 = require("./components/new-order-info/new-order-info.component");
var admin_transregister_component_1 = require("./components/admin-transregister/admin-transregister.component");
var trans_formforedit_component_1 = require("./components/trans-formforedit/trans-formforedit.component");
//Routing
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'translates', component: translates_component_1.TranslatesComponent, canActivate: [auth_guards_1.AuthGuard], children: [
            { path: '', component: translates_component_1.TranslatesComponent },
            { path: 'list', component: trans_list_component_1.Translist, canActivate: [user_guards_1.UserGuard] },
            { path: 'item/:id', component: trans_info_component_1.TransInfoComponent, canActivate: [user_guards_1.UserGuard] },
            { path: 'create', component: trans_form_component_1.TransFormComponent, canActivate: [user_guards_1.UserGuard] },
            { path: 'manage', component: translist_manager_component_1.Translistmanager, canActivate: [translator_guards_1.TranslatorGuard] },
            { path: 'administration', component: administration_component_1.AdministrationComponent, canActivate: [admin_guards_1.AdminGuard] },
            { path: 'get-new-order', component: get_new_order_component_1.Neworderlistmanager, canActivate: [translator_guards_1.TranslatorGuard] },
            { path: 'get-new-order-item/:id', component: new_order_info_component_1.NewOrderInfoComponent, canActivate: [translator_guards_1.TranslatorGuard] },
            { path: 'working-list', component: working_list_component_1.WorkingList, canActivate: [translator_guards_1.TranslatorGuard] },
            { path: 'admin-users', component: admin_users_component_1.AdminUsersComponent, canActivate: [admin_guards_1.AdminGuard] },
            { path: 'admin-translates', component: admin_translates_component_1.AdminTranslatesComponent, canActivate: [admin_guards_1.AdminGuard] },
            { path: 'translator-registration', component: admin_transregister_component_1.AdminTranslatorRegistration, canActivate: [admin_guards_1.AdminGuard] },
            { path: 'foredit/:id', component: trans_formforedit_component_1.TransFormForEditComponent, canActivate: [user_guards_1.UserGuard] }
        ]
    },
    { path: 'profile', component: profile_form_component_1.ProfileFormComponent, canActivate: [auth_guards_1.AuthGuard], pathMatch: 'full' },
    { path: '**', redirectTo: 'home' } // potom sdelat not-found component! poka domoj
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map