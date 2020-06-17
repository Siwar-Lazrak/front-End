import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authenti/login/login.component';
import { ProfileComponent } from './authenti/profile/profile.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
import { AddUsersComponent } from './superAdmin/add-users/add-users.component';
import { SousmodAdminComponent } from './admin/sousmod-admin/sousmod-admin.component';
import { ModuleAdminComponent } from './admin/module-admin/module-admin.component';
import { HomeComponent } from './pages/home/home.component';
import { BoardUserComponent } from './user/board-user/board-user.component';
import { SoumodComponent } from './soumod/soumod.component';
import { ModuleComponent } from './module/module.component';
import { RapportComponent } from './rapport/rapport.component';
import { ForgotPassComponent } from './authenti/forgot-pass/forgot-pass.component';
import { ResetPasswordComponent } from './authenti/reset-password/reset-password.component';
import { BoardSuperAdminComponent } from './superAdmin/board-super-admin/board-super-admin.component';
import { AddAccessComponent } from './superAdmin/add-access/add-access.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {path: 'reset', component: ResetPasswordComponent,
  children: [
    {path: 'login', component: LoginComponent}
  ]
},
  {path: 'login', component: LoginComponent,
  children: [
    {path: 'forgotpass', component: ForgotPassComponent}
  ]},
  {path: 'forgotpass', component: ForgotPassComponent},
  { path: 'admin', component: BoardAdminComponent,
  children: [
   {path: 'sousmoduleAdmin', component: SousmodAdminComponent},
   {path: 'moduleadmin', component: ModuleAdminComponent},
    { path: 'home', component: HomeComponent },
     {path: 'profile', component: ProfileComponent},
     { path: 'rapport', component: RapportComponent },
 ]
},
{ path: 'user', component: BoardUserComponent,
   children: [
    {path: 'profile', component: ProfileComponent},

     { path: 'home', component: HomeComponent },

  ]
},
{ path: 'superadmin', component: BoardSuperAdminComponent,
   children: [
    {path: 'profile', component: ProfileComponent},
    { path: 'add-users', component: AddUsersComponent },
    { path: 'access', component: AddAccessComponent },

  ]
},
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
