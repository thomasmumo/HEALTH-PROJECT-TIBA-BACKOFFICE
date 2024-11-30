import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffServiceService {

  newStaffObj:newStaff;

  constructor(private http:HttpClient, private router:Router){this.newStaffObj = new newStaff()}

  changeDateFormat(date:any){
    console.log(date)
    return new Date(date).toISOString().split('T')[0];
  }

 
  new_staff(form:FormGroup<any>):Observable<any>{
    let token=localStorage.getItem('Token')
    let hospital_name = JSON.parse(localStorage.getItem('userObj')).hospitalName;
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' })
    // let headers = new HttpHeaders({'Authorization': `Bearer ${token}` })
    
    this.newStaffObj.email=form.controls['staffDetails'].get('email').value;
    this.newStaffObj.password=form.controls['passwordDetails'].get('password').value;
    this.newStaffObj.firstName=form.controls['staffDetails'].get('firstname').value;
    this.newStaffObj.middleName=form.controls['staffDetails'].get('middlename').value;
    this.newStaffObj.lastName=form.controls['staffDetails'].get('lastname').value;
    this.newStaffObj.phoneNumber=form.controls['staffDetails'].get('phone').value;
    this.newStaffObj.idNumber=parseInt(form.controls['staffDetails'].get('id').value);
    this.newStaffObj.gender=form.controls['staffDetails'].get('gender').value;
    this.newStaffObj.address=form.controls['staffDetails'].get('address').value;
    this.newStaffObj.dateOfBirth=this.changeDateFormat(form.controls['staffDetails'].get('dob').value)
    this.newStaffObj.roles=form.controls['staffDetails'].get('role').value;
    this.newStaffObj.hospitalName=hospital_name;

    
    
    console.log(this.newStaffObj)

    return this.http.post('https://tiba-188778242087.us-central1.run.app/api/open/create/hospitalstaff',this.newStaffObj,{headers})
  

  }
  getHospitalStaff():Observable<any>{
    return this.http.get('https://tiba-188778242087.us-central1.run.app/api/open/hospitalstaff/all')
  }
}
export class newStaff{
  email:string;
  password:string;
  firstName:Date;
  middleName:string;
  lastName:string;
  phoneNumber:string;
  idNumber:number;
  gender:string;
  address:string;
  dateOfBirth:any;
  roles:string;
  nationality:string;
  hospitalName:string

  
  
  
  
}