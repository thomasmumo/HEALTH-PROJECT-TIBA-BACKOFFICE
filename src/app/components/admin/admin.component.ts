import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StaffServiceService } from './children/admin-staff/services/staff-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(private HOSPITAL_SERVICE:StaffServiceService, private router:Router){}

  jwt = new JwtHelperService()
  authenticatedUser:string='';
  hospitalName:string='';

  
  dashboard:boolean = true;
  staff:boolean = false;
  settings:boolean = false;
  statistics:boolean = false;
  changeComponent(componentName:string){
    if (componentName === 'dashboard') {
      this.dashboard = true;
      this.settings = false;
      this.staff = false;
      this.statistics =false;
    }else if (componentName === 'staff'){
      this.dashboard = false;
      this.settings = false;
      this.staff = true;
      this.statistics =false;

    }else if (componentName === 'statistics'){
      this.dashboard = false;
      this.settings = false;
      this.staff = false;
      this.statistics =true;
    }else if (componentName === 'settings'){
      this.dashboard = false;
      this.settings = true;
      this.staff = false;
      this.statistics =false;
    }
  }

  ngOnInit(): void {
      this.HOSPITAL_SERVICE.getHospitalStaff().subscribe(
        (res)=>{console.log('HOS-STAFF',res)},
        (err)=>{console.log('HOS-ERR',err)},
      )
      let userObject =JSON.parse(localStorage.getItem('userObj'))
      console.log(userObject)
      this.authenticatedUser = userObject.firstName+' '+userObject.lastName
      this.hospitalName = userObject.hospitalName;
  }
  logout(){
    this.router.navigate(['login'],{ replaceUrl: true })
  }
}
