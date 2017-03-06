import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
//Routes
import { routing } from './app.routing';
//Pipes

//Modules
import { SettingModule } from './setting/setting.module';
import { CheckchartModule } from './checkchart/checkchart.module';
//Services
import { NotificationService } from './shared/utils/notification.service';
import { ReportService } from './shared/services/report.service';
import { ItemsService } from './shared/utils/items.service';
import { ConfigService } from './shared/utils/config.service';
import { LoginService } from './shared/services/login.service';
//Auths
import { AuthReceiveService } from './shared/services/auth-receive.service';
import { AuthSendService } from './shared/services/auth-send.service';
import { AuthAdminService } from './shared/services/auth-admin.service';
import { AuthUserService } from './shared/services/auth-user.service';
import { AuthAuditService } from './shared/services/auth-audit.service';
//Others
import { EqualValidator } from './shared/utils/equal-validator.directive';
import { MaterializeModule } from 'angular2-materialize';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginFormPositionComponent } from './login/login-form-position/login-form-position.component';
import { LoginFormLogoutComponent } from './login/login-form-logout/login-form-logout.component';
import { LoginFormChangepasswordComponent } from './login/login-form-changepassword/login-form-changepassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EqualValidator,
    LoginComponent,
    ReportComponent,
    LoginFormComponent,
    LoginFormPositionComponent,
    LoginFormLogoutComponent,
    LoginFormChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SettingModule,
    CheckchartModule,
    routing,
    MaterializeModule
  ],
  providers: [
    NotificationService,
    ItemsService,
    ConfigService,
    LoginService,
    AuthReceiveService,
    AuthSendService,
    AuthAdminService,
    AuthUserService,
    ReportService,
    AuthAuditService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }