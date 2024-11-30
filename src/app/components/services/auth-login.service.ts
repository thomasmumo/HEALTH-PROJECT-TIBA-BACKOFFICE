import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
  
})
export class AuthLoginService {

  
  loginObj:login;
  jwt = new JwtHelperService()
  isAthenticated:boolean=false

  invalidCredentials:boolean=false;
  constructor(private http:HttpClient, private router:Router){this.loginObj=new login()}
authenticate(){this.isAthenticated=true}
  _isAuthenticated(){
    return this.isAthenticated;
  }


  login(form:FormGroup<any>):Observable<any>{
    
    
    this.loginObj.email=form.controls['email'].value;
    this.loginObj.password=form.controls['password'].value;

   return this.http.post('https://tiba-188778242087.us-central1.run.app/api/open/admin/staff/login',this.loginObj)
   
      
    
  }
  superAdminLogin(form:FormGroup<any>):Observable<any>{
    this.loginObj.email=form.controls['email'].value;
    this.loginObj.password=form.controls['password'].value;
    return this.http.post('https://tiba-188778242087.us-central1.run.app/api/open/user/logIn',this.loginObj)
  }

  getUserDetails():Observable<any>{
    return this.http.get('https://tiba-188778242087.us-central1.run.app/api/open/user/logIn')
      


  }
  resetPassword():Observable<any>{
    return this.http.get('https://tiba-188778242087.us-central1.run.app/api/open/user/logIn')
  }
}
export class login{
  email:string;
  password:string;
  
  constructor(){
    this.email='';
    this.password='';
  }
}