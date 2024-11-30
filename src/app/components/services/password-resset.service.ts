import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordRessetService {

  constructor(private http:HttpClient) { }


  getOTP(email:string):Observable<any>{
    return this.http.post(`https://tiba-188778242087.us-central1.run.app/api/open/generate/${email}`,{})
  }
  resetPassword(passOBJ:any):Observable<any>{
    return this.http.post('https://tiba-188778242087.us-central1.run.app/api/open/forgot/password',passOBJ)
  }
}
