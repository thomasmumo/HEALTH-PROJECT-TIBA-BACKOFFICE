import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthLoginService } from './auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate{
  constructor(private loginService:AuthLoginService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.loginService._isAuthenticated()===true){
      return true
    }else{
      this.router.navigate(['login'])
      return false
    }
      
  }

 
}
