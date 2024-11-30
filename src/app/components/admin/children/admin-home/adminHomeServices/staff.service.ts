import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  // staff = [
  //   {name:'Thomas Mumo', job:'Doctor'},
  //   {name:'Brian Mutiso', job:'Nurse'},
  //   {name:'Collins Otieno', job:'Nurse'},
  //   {name:'Kelvin Mumo', job:'Nurse'},
  //   {name:'Kyla Cherotich', job:'Nurse'},
  //   {name:'Shilla Omondi', job:'Nurse'},
  //   {name:'Fellix Ombui', job:'Nurse'},
  //   {name:'Barack Obama', job:'Nurse'},
  //   {name:'Anthony Mumo', job:'LabTech'},
  //   {name:'Vincent wambua', job:'LabTech'},
  //   {name:'Thomas Mumo', job:'LabTech'},
  //   {name:'Thomas Mumo', job:'LabTech'},
  //   {name:'Thomas Mumo', job:'LabTech'},
  //   {name:'Thomas Mumo', job:'LabTech'},
  //   {name:'Thomas Mumo', job:'Doctor'},
  //   {name:'Thomas Mumo', job:'Doctor'},
  //   {name:'Thomas Mumo', job:'Doctor'},
  //   {name:'Thomas Mumo', job:'Doctor'},
  //   {name:'Thomas Mumo', job:'Doctor'},
  // ]
  getHospitalStaff():Observable<any>{
    return this.http.get('https://tiba-188778242087.us-central1.run.app/api/open/hospitalstaff/all')
  }
  deleteStaff(id:number):Observable<any>{
    return this.http.delete(`https://tiba-188778242087.us-central1.run.app/api/open/hospitalstaff/${id}`)
  }
}
