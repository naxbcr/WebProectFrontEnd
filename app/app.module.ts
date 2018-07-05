import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

//my ROOT component
import { AppComponent }   from './app.component';

// non-authorized components
import { Login } from './components/login-form/login.component'
import { Register } from './components/register-form/register.component'
import { Contact } from './components/contact-form/contact.component'
import { Info } from './components/info/info.component' // services info

// authorized components
import { Translist } from './components/trans-list/trans-list.component' 
import { Transitem } from './components/trans-item/trans-item.component' 
import { Transitemneworder } from './components/trans-item-new-order/trans-item-new-order.component'
import { TransFormComponent } from './components/trans-form/trans-form.component'
import { TransFormForEditComponent } from './components/trans-formforedit/trans-formforedit.component'
import { TransInfoComponent } from './components/trans-info/trans-info.component'
import { Translistmanager } from './components/translist-manager/translist-manager.component'
import { ProfileFormComponent } from './components/profile-form/profile-form.component'
import { AdministrationComponent } from './components/administration/administration.component'
import { Neworderlistmanager } from './components/get-new-order/get-new-order.component'
import { WorkingList } from './components/working-list/working-list.component'
import { NewOrderInfoComponent } from './components/new-order-info/new-order-info.component'
import { AdminUsersComponent } from './components/admin-users/admin-users.component'
import { AdminTranslatesComponent } from './components/admin-translates/admin-translates.component'
import { AdminTranslatorRegistration } from './components/admin-transregister/admin-transregister.component'

// "page" components
import { HomeComponent } from './home/home.component'
import { TranslatesComponent } from './translates/translates.component' // should be auth

// routing 
import { routing } from './app.routes';

// Guards
import { AuthGuard } from './guards/auth.guards';
import { UserGuard } from './guards/user.guards'
import { TranslatorGuard } from './guards/translator.guards';
import { AdminGuard} from './guards/admin.guards';

// Services
// все сервисы обязательно нужно указать ниже в НгМодуль в поле провайдерс иначе будут ошибки опять!
import { AuthenticationService } from './shared/service/authentication.service'; // user service,trans service and other !!!
import { AlertService } from './shared/service/alert.service';
import { AlertComponent } from './components/alert/alert.component';
import { UserService } from './shared/service/user.service';
import { TransService } from "./shared/service/trans.service"
import { CommentService } from "./shared/service/comment.service" // bez etovo ne budet rabotat, eto pozvoljaet ispolzovat 1 comment service na vse komponenti.
import { PagerService } from './shared/service/pager.service.component'
import { StatisticsService } from './shared/service/stats.service'

import {FileSelectDirective, FileDropDirective, FileUploader} from 'ng2-file-upload/ng2-file-upload';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, routing, HttpModule,ChartsModule ],
  declarations: [ 
    AppComponent, Login, Register,Info, Contact, Translist, Transitem ,Translistmanager,AdministrationComponent,
    HomeComponent, TranslatesComponent, TransInfoComponent, TransFormComponent, AlertComponent, ProfileFormComponent
    ,FileSelectDirective,FileDropDirective,Neworderlistmanager,NewOrderInfoComponent,Transitemneworder,WorkingList, AdminUsersComponent,AdminTranslatesComponent,AdminTranslatorRegistration,
    TransFormForEditComponent  ],
  bootstrap:    [ AppComponent ],
  providers: [AuthGuard,AdminGuard,TranslatorGuard,UserGuard, AuthenticationService, UserService, AlertService, TransService, CommentService, PagerService,StatisticsService  ]    // DEPENDENCY INJECTION во все компоненты разом
  
})
export class AppModule { }