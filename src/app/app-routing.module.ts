import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { RouteguardService } from './components/services/routeguard.service';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'admin', component:AdminComponent},
  {path:'super-admin', component:SuperAdminComponent},
  {path:'reset-password', component:ResetpasswordComponent}
];
// canActivate:[RouteguardService]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
