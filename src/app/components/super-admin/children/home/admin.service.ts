import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  passObj:passChange;
  constructor(private http:HttpClient) { this.passObj=new passChange()}

 
  getAllHospitalAdmins():Observable<any>{
    return this.http.get('https://tiba-188778242087.us-central1.run.app/api/open/hospital/admins')
  }
  getUser(id:number):Observable<any>{
    return this.http.get(`https://tiba-188778242087.us-central1.run.app/api/open/g/patient/profile/${id}`)
    
    
  }
  deleteHospital(id:number):Observable<any>{
    return this.http.delete(`https://tiba-188778242087.us-central1.run.app/api/open/hospitaladmin/${id}`)
  }
  changePassword(id:number,form:FormGroup<any>):Observable<any>{
    this.passObj.currentPassword=form.controls['currentPassword'].value;
    this.passObj.newPassword=form.controls['newPassword'].value;
    this.passObj.confirmPassword=form.controls['confirmPassword'].value;
    return this.http.put(`https://tiba-188778242087.us-central1.run.app/api/open/user/password/${id}`,this.passObj)
  }
  setprofile(id:number,picOBJ):Observable<any>{
    return this.http.post(`https://tiba-188778242087.us-central1.run.app/api/open/${id}/profile-picture`,picOBJ)

  }
  
}
export class passChange{
  currentPassword:string;
  newPassword:string;
  confirmPassword:string;
  
  constructor(){
    this.currentPassword=''
    this.newPassword=''
    this.confirmPassword=''
    
  }
}