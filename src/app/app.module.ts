import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/super-admin/children/home/home.component';
import { UsersComponent } from './components/super-admin/children/users/users.component';
import { StatisticsComponent } from './components/super-admin/children/statistics/statistics.component';
import { SettingsComponent } from './components/super-admin/children/settings/settings.component';
import { HospitalsComponent } from './components/super-admin/children/hospitals/hospitals.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AdminHomeComponent } from './components/admin/children/admin-home/admin-home.component';
import { AdminStaffComponent } from './components/admin/children/admin-staff/admin-staff.component';
import { AdminStatisticsComponent } from './components/admin/children/admin-statistics/admin-statistics.component';
import { AdminSettingsComponent } from './components/admin/children/admin-settings/admin-settings.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { RouteguardService } from './components/services/routeguard.service';
import { AuthLoginService } from './components/services/auth-login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuperAdminComponent,
    AdminComponent,
    HomeComponent,
    UsersComponent,
    StatisticsComponent,
    SettingsComponent,
    HospitalsComponent,
    AdminHomeComponent,
    AdminStaffComponent,
    AdminStatisticsComponent,
    AdminSettingsComponent,
    ResetpasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    FormsModule
  ],
  providers: [
    RouteguardService,
    AuthLoginService,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
