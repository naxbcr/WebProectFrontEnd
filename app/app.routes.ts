import { Routes, RouterModule } from '@angular/router';

// guards
import { AuthGuard } from './guards/auth.guards';
import { UserGuard } from './guards/user.guards';
import { TranslatorGuard } from './guards/translator.guards';
import { AdminGuard} from './guards/admin.guards';

// Components
import { TranslatesComponent } from './translates/translates.component';
import { HomeComponent } from './home/home.component';
import { TransFormComponent } from './components/trans-form/trans-form.component'
import { TransInfoComponent } from './components/trans-info/trans-info.component'
import { Translist } from './components/trans-list/trans-list.component'
import { WorkingList } from './components/working-list/working-list.component'
import { Translistmanager } from './components/translist-manager/translist-manager.component' // Dlja Perevodchika
import { Neworderlistmanager } from './components/get-new-order/get-new-order.component' // Dlja Perevodchika novqe zakazi
import { ProfileFormComponent } from './components/profile-form/profile-form.component'
import { AdministrationComponent } from './components/administration/administration.component'
import { AdminUsersComponent } from './components/admin-users/admin-users.component'
import { AdminTranslatesComponent } from './components/admin-translates/admin-translates.component'
import { NewOrderInfoComponent } from './components/new-order-info/new-order-info.component'
import { AdminTranslatorRegistration } from './components/admin-transregister/admin-transregister.component'
import { TransFormForEditComponent } from './components/trans-formforedit/trans-formforedit.component'

//Routing

const appRoutes: Routes = [
  { path: '',redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'translates', component: TranslatesComponent, canActivate: [AuthGuard], children: 
    [
        { path: '', component: TranslatesComponent },
        { path: 'list', component: Translist, canActivate:[UserGuard]},
        { path: 'item/:id', component: TransInfoComponent, canActivate:[UserGuard]},
        { path: 'create', component: TransFormComponent, canActivate:[UserGuard]  },
        { path: 'manage', component: Translistmanager,canActivate:[TranslatorGuard] },
        { path: 'administration', component: AdministrationComponent,canActivate: [AdminGuard]},
        { path: 'get-new-order', component: Neworderlistmanager,canActivate:[TranslatorGuard] },
        { path: 'get-new-order-item/:id', component: NewOrderInfoComponent,canActivate:[TranslatorGuard] },
        { path: 'working-list', component: WorkingList,canActivate:[TranslatorGuard] },
        { path: 'admin-users', component: AdminUsersComponent, canActivate:[AdminGuard] },
        { path: 'admin-translates', component: AdminTranslatesComponent, canActivate:[AdminGuard] },
        { path: 'translator-registration', component: AdminTranslatorRegistration, canActivate:[AdminGuard]},
        { path: 'foredit/:id', component: TransFormForEditComponent, canActivate:[UserGuard]  }
    ] 
  },
  { path: 'profile', component: ProfileFormComponent, canActivate:[AuthGuard], pathMatch: 'full' },
  { path: '**', redirectTo: 'home'} 

];

export const routing = RouterModule.forRoot(appRoutes);
