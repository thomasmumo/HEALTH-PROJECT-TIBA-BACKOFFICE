import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  jwt = new JwtHelperService()
  
  
  showUpdateForm:boolean=false;
  showHospitalAlert:boolean=false;
  searchedHospital:string='';
  adminDetails:any={};
  hospitalAdminId:number=0;
  
  
  filteredHosptals:Observable<{
    address:string,
    dateOfBirth:string,
    email:string,
    firstName:string,
    gender:string,
    hospitalAddress:string,
    hospitalContactNumber:string,
    hospitalLocation:string,
    hospitalName:string,
    idNumber:null,
    lastName:string,
    middleName:string,
    nationality:null,
    password:null,
    phoneNumber:string,
    roles:string,
   
  }[]>;
  
  constructor(private hospitalService:AdminService,private http:HttpClient){}
  hospitals:{
    address:string,
    dateOfBirth:string,
    email:string,
    firstName:string,
    gender:string,
    hospitalAddress:string,
    hospitalContactNumber:string,
    hospitalLocation:string,
    hospitalName:string,
    idNumber:null,
    lastName:string,
    middleName:string,
    nationality:null,
    password:null,
    phoneNumber:string,
    roles:string,
    userId:number
  }[]=[];

  totalHospitals:number=0;
  searchControl = new FormControl();
  hospitalName = new FormControl()
  hospitalLocation = new FormControl()
  hospitalContact = new FormControl()
  hospitalAdmin = new FormControl()
  
  ngOnInit(): void {
    let userObj = JSON.parse(localStorage.getItem('userObj'))
    console.log('FROM_HOME:',userObj)
    let token = this.jwt.decodeToken(userObj.token)
    console.log('TOKEN:',token)
    

    
    

      
      this.filteredHosptals = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      )
      this.hospitalService.getAllHospitalAdmins().subscribe(
        (res)=>{
          console.log('HOSPITALS: ',res)
          this.hospitals=res
          this.totalHospitals=this.hospitals.length;
          
        },
        (err)=>{console.log(err)}
      )
      
  }

  private _filter(value:string):{
    address:string,
    dateOfBirth:string,
    email:string,
    firstName:string,
    gender:string,
    hospitalAddress:string,
    hospitalContactNumber:string,
    hospitalLocation:string,
    hospitalName:string,
    idNumber:null,
    lastName:string,
    middleName:string,
    nationality:null,
    password:null,
    phoneNumber:string,
    roles:string
  }[]{
    const filterValue=value.toLowerCase();
    return this.hospitals.filter(hos => hos.hospitalName.toLowerCase().includes(filterValue))
  }

  onSubmit(){
    console.log('form submitted')
    
  }
  
  deleteHospital1(id:number){
    this.showHospitalAlert=!this.showHospitalAlert;
    this.hospitalAdminId=id;
  }
  deleteHospital(choice:string){
    if(choice==='continue'){
    console.log("ID FROM method",this.hospitalAdminId)

      this.hospitalService.deleteHospital(this.hospitalAdminId).subscribe(
        (res)=>{
          console.log('SUCCESS ADMIN DE',res)
          this.ngOnInit()
        },
        (err)=>{console.log('ERR:',err)}
        
      )
      this.showHospitalAlert=!this.showHospitalAlert;
    }else{
      this.showHospitalAlert=!this.showHospitalAlert;
    }

  }

  filterHospitals(){
    this.searchedHospital=this.searchControl.value;
  }
  
  show_update_form(hospital:any){
    this.showUpdateForm=!this.showUpdateForm;
    this.hospitalName.setValue(hospital.name)
    this.hospitalAdmin.setValue(hospital.admin)
    this.hospitalLocation.setValue(hospital.location)
    this.hospitalContact.setValue(hospital.contact)
  }
  
}


