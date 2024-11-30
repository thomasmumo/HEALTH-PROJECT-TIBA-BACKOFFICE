import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { StaffService } from './adminHomeServices/staff.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{

  usersCount:number=0;
  usersCountDB:number=0;
  doctorsCount:number=0;
  doctorsCountDB:number=0;
  nusrsesCount:number=0;
  nusrsesCountDB:number=0;
  labTechsCount:number=0;
  labTechsCountDB:number=0;
  searchedStaff:string='';
  filterOption:string='All';
  searchControl = new FormControl();
  deleteUserAlert:boolean=false
  userID:number=0;

  constructor(private staffService:StaffService){}

  staff:{address:string, 
    dateOfBirth:string,
    email:string,
    firstName:string,
    gender:string,
    hospitalName:string,
    idNumber:number,
    lastName:string,
    middleName:string,
    nationality?:string,
    password?:string,
    phoneNumber:string,
    roles:string}[] = [];

  filteredStaff:Observable<{address:string, 
    dateOfBirth:string,
    email:string,
    firstName:string,
    gender:string,
    hospitalName:string,
    idNumber:number,
    lastName:string,
    middleName:string,
    nationality?:string,
    password?:string,
    phoneNumber:string,
    roles:string}[]>;

  increment_user_count(index:number){
    if(index>this.usersCountDB){
      return;
    }
    setTimeout(()=>{this.usersCount=this.usersCount+1},500*index)
    this.increment_user_count(index+1)
  }
  increment_doctors_count(index:number){
    if(index>this.doctorsCountDB){
      return;
    }
    setTimeout(()=>{this.doctorsCount=this.doctorsCount+1},500*index)
    this.increment_doctors_count(index+1)
  }
  increment_nurses_count(index:number){
    if(index>this.nusrsesCountDB){
      return;
    }
    setTimeout(()=>{this.nusrsesCount=this.nusrsesCount+1},500*index)
    this.increment_nurses_count(index+1)
  }
  increment_labtechs_count(index:number){
    if(index>this.labTechsCountDB){
      return;
    }
    setTimeout(()=>{this.labTechsCount=this.labTechsCount+1},500*index)
    this.increment_labtechs_count(index+1)
  }
  
  ngOnInit(): void {
    
    let hospitalName = JSON.parse(localStorage.getItem('userObj')).hospitalName
    this.staffService.getHospitalStaff().subscribe(
      (res)=>{
        this.staff = res.filter(x=>x.hospitalName.toLowerCase().includes(hospitalName.toLowerCase()))
        this.usersCountDB=this.staff.length+1
        this.doctorsCountDB=this.staff.filter(x=>x.roles.toLowerCase().includes('doctor')).length
        this.nusrsesCountDB=this.staff.filter(x=>x.roles.toLowerCase().includes('nurse')).length
        this.labTechsCountDB=this.staff.filter(x=>x.roles.toLowerCase().includes('lab')).length

        this.increment_user_count(1);
        this.increment_doctors_count(1);
        this.increment_labtechs_count(1);
        this.increment_nurses_count(1);
      },
      (err)=>{console.log('HOSPITAL-err: ',err)},
    )
    this.filteredStaff = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
  
      
  }

  private _filter(value:string):{address:string, 
    dateOfBirth:string,
    email:string,
    firstName:string,
    gender:string,
    hospitalName:string,
    idNumber:number,
    lastName:string,
    middleName:string,
    nationality?:string,
    password?:string,
    phoneNumber:string,
    roles:string}[]{
    const filterValue=value.toLowerCase();
    return this.staff.filter(hos => hos.hospitalName.toLowerCase().includes(filterValue))
  }

  filterHospitals(){
    this.searchedStaff=this.searchControl.value;
  }

  deleteStaff(id:number){
    this.deleteUserAlert=!this.deleteUserAlert;
    this.userID=id;
  }
  _deleteStaff(){
    this.staffService.deleteStaff(this.userID).subscribe(
      (res)=>{
        alert('Delete success')
        this.deleteUserAlert=false
        this.ngOnInit()

      },
      (err)=>{alert(err)},
    )
  }

}
