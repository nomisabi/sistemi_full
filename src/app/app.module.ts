import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common'
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatSelectModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';

import { TokenInterceptorService } from './services/token-interceptor.service';
import { PagerService } from './services/pager.service';
import { AuthService } from './login/auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { RoleGuardService } from './guards/role-guard.service';
import { AdminServiceService} from './home-admin/admin-service.service'
import { UserService } from './home/user.service';
import { PatientsService } from './patients/patients.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { AdministrationTabsComponent } from './administration-tabs/administration-tabs.component';
import { PassportChangeComponent } from './home/passport-change/passport-change.component';
import { PatientsComponent } from './patients/patients.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { ReportsComponent } from './reports/reports.component'




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HomeAdminComponent,
    AdminProfileComponent,
    AdminChangePasswordComponent,
    AdministrationTabsComponent,
    PassportChangeComponent,
    PatientsComponent,
    DiseasesComponent,
    MonitoringComponent,
    ReportsComponent
  ],
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatFormFieldModule,
    BrowserModule,
    MatIconModule,
    MatInputModule,
    AppRoutingModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    
  ],
  providers: [
    AuthGuardService,
    RoleGuardService,
    AuthService,
    PagerService,
    AdminServiceService,
    UserService,
    PatientsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);