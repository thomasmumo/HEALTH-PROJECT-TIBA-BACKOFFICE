import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSignupService {

  signupObj:signup;

  constructor(private http:HttpClient, private router:Router){this.signupObj = new signup()}

  changeDateFormat(date:any){
    
    
    console.log(date)
    return new Date(date).toISOString().split('T')[0];
    

    
  }

  signup(form:FormGroup<any>):Observable<any>{
    let token=localStorage.getItem('Token')
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' })
    // let headers = new HttpHeaders({'Authorization': `Bearer ${token}` })
    
    this.signupObj.email=form.controls['adminDetails'].get('email').value;
    this.signupObj.password=form.controls['passwordDetails'].get('password').value;
    this.signupObj.firstName=form.controls['adminDetails'].get('firstname').value;
    this.signupObj.middleName=form.controls['adminDetails'].get('middlename').value;
    this.signupObj.lastName=form.controls['adminDetails'].get('lastname').value;
    this.signupObj.phoneNumber=form.controls['adminDetails'].get('phone').value;
    this.signupObj.idNuber=form.controls['adminDetails'].get('id').value;
    this.signupObj.gender=form.controls['adminDetails'].get('gender').value;
    this.signupObj.address=form.controls['adminDetails'].get('address').value;
    // this.signupObj.dateOfBirth=this.changeDateFormat(form.controls['adminDetails'].get('dob').value);
    this.signupObj.dateOfBirth=this.changeDateFormat(form.controls['adminDetails'].get('dob').value)
    // this.signupObj.dateOfBirth=form.controls['adminDetails'].get('dob').value;
    
    this.signupObj.roles='HOSPITAL_ADMIN';
    this.signupObj.hospitalName=form.controls['hospitalDetails'].get('hospitalname').value;
    this.signupObj.hospitalAddress=form.controls['hospitalDetails'].get('hospitaladdress').value;
    this.signupObj.hospitalLocation=form.controls['hospitalDetails'].get('hospitallocation').value;
    this.signupObj.hospitalContactNumber=form.controls['hospitalDetails'].get('hospitalcontact').value;

    
    
    console.log(this.signupObj)

    return this.http.post('https://tiba-188778242087.us-central1.run.app/api/open/create/hospitaladmin',this.signupObj,{headers})
    
   

  }

  getAllUsers():Observable<any>{
    
    return this.http.get('https://tiba-188778242087.us-central1.run.app/api/open/all_users')
  }





}
export class signup{
  email:string;
  password:string;
  firstName:Date;
  middleName:string;
  lastName:string;
  phoneNumber:string;
  idNuber:string;
  gender:string;
  address:string;
  dateOfBirth:any;
  roles:string;
  hospitalName:string;
  hospitalAddress:string;
  hospitalLocation:string;
  hospitalContactNumber:string;

  
  
  
  
}