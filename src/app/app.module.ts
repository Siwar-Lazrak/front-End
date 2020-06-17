import { BrowserModule } from '@angular/platform-browser';
import {enableProdMode} from '@angular/core';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_ICONS, NzButtonModule} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { Routes, RouterModule } from '@angular/router';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { SoumodComponent } from './soumod/soumod.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './authenti/login/login.component';
import { ProfileComponent } from './authenti/profile/profile.component';
import { AddUsersComponent } from './superAdmin/add-users/add-users.component';
import { ModuleComponent } from './module/module.component';
import { BoardUserComponent } from './user/board-user/board-user.component';
import { RapportComponent } from './rapport/rapport.component';
import { ModuleAdminComponent } from './admin/module-admin/module-admin.component';
import { SousmodAdminComponent } from './admin/sousmod-admin/sousmod-admin.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
import { QuillModule} from 'ngx-quill';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { authInterceptorProviders } from './service/authInterceptorProviders';
import { ForgotPassComponent } from './authenti/forgot-pass/forgot-pass.component';
import { ResetPasswordComponent } from './authenti/reset-password/reset-password.component';
import { BoardSuperAdminComponent } from './superAdmin/board-super-admin/board-super-admin.component';
import { AddAccessComponent } from './superAdmin/add-access/add-access.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
  declarations: [
    AppComponent,
    SoumodComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    ModuleComponent,
    BoardUserComponent,
    RapportComponent,
    ModuleAdminComponent,
    SousmodAdminComponent,
    BoardAdminComponent,
    ForgotPassComponent,
    ResetPasswordComponent,
    BoardSuperAdminComponent,
    AddUsersComponent,
    AddAccessComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NzTreeModule,
    IconsProviderModule,
    NzProgressModule,
    NgZorroAntdModule,
    NzStepsModule,
    NzBadgeModule,
    FormsModule,
    NzAutocompleteModule,
    NzTimePickerModule,
    NzCascaderModule,
    HttpClientModule,
    NzModalModule,
    NzDropDownModule,
    NzCarouselModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    NzSelectModule,
    ScrollingModule,
    HttpClientJsonpModule,
    NzFormModule,
    QuillModule.forRoot(),
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzNotificationModule,
    NzCardModule,
    NzSpinModule,
    NzCalendarModule,
    NzDrawerModule,
    NzListModule,
    NzTableModule,
    RouterModule,
    NzTabsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
   NzButtonModule,




  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  providers: [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }, authInterceptorProviders ],
})
export class AppModule { }
