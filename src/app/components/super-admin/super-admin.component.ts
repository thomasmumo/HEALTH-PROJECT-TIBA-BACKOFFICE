import { Component, OnInit } from '@angular/core';
import { AdminService } from './children/home/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit {
  picOBJ:picOBJ;
  constructor(private HOSPITAL_SERVICE:AdminService, private router:Router){this.picOBJ=new picOBJ()}
  dashboard:boolean = true;
  hospitals:boolean = false;
  users:boolean = false;
  settings:boolean = false;
  statistics:boolean = false;
  adminDetails:any={}
 

  changeComponent(componentName:string){
    if (componentName==='dashboard'){
      this.dashboard=true;
      this.hospitals=false;
      this.users=false;
      this.settings=false;
      this.statistics=false
    }else if (componentName=='hospitals'){
      this.dashboard=false;
      this.hospitals=true;
      this.users=false;
      this.settings=false;
      this.statistics=false
    }else if (componentName==='users'){
      this.dashboard=false;
      this.hospitals=false;
      this.users=true;
      this.settings=false;
      this.statistics=false
    }else if (componentName==='settings'){
      this.dashboard=false;
      this.hospitals=false;
      this.users=false;
      this.settings=true;
      this.statistics=false
    }else if (componentName==='statistics'){
      this.dashboard=false;
      this.hospitals=false;
      this.users=false;
      this.settings=false;
      this.statistics=true;
    }
  }
  ngOnInit(): void {
    let userObj=JSON.parse(localStorage.getItem('userObj'))
    this.HOSPITAL_SERVICE.getUser(userObj.id).subscribe(
      (res)=>{
      
        
        this.adminDetails=res
        console.log('ID',this.adminDetails)
        
      },
      (err)=>{console.log('USER_err:',err)},
    )
      this.HOSPITAL_SERVICE.getAllHospitalAdmins().subscribe(
        (res)=>{console.log(res)},
        (err)=>{console.log(err)}
      )
  }
  logout(){
    this.router.navigate(['login'],{ replaceUrl: true })
  }
  setProfile(pic:string){
    let userObj2 = JSON.parse(localStorage.getItem('userObj'))
    console.log('FROM_profile:',userObj2)
    this.picOBJ.file=pic;
    this.HOSPITAL_SERVICE.setprofile(userObj2.id,this.picOBJ).subscribe(
      (res)=>{console.log('PIC-POSTED:',res)},
      (err)=>{console.log('PIC-POSTED-err:',err)},
    )
  }

}
export class picOBJ{
  file:string;
  constructor(){
    this.file=''
    
    
  }
}