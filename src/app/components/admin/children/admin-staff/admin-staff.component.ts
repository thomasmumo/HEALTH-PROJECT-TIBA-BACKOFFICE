import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AllStaffService } from './all-staff.service';
import { StaffServiceService } from './services/staff-service.service';
import { StaffService } from '../admin-home/adminHomeServices/staff.service';

@Component({
  selector: 'app-admin-staff',
  templateUrl: './admin-staff.component.html',
  styleUrl: './admin-staff.component.css'
})
export class AdminStaffComponent implements OnInit{
  constructor(private staffService:StaffService, private addNewStaffService:StaffServiceService){}

  searchControl = new FormControl();
  searchedStaff:string='';
  filterOption:string='All'
  showAddStaff:boolean=false;
  showInvalidFormAlert:boolean=false;
  showSpinner:boolean=false;
  showSuccessAlert:boolean=false;
  showDeleteAlert:boolean=false;
  deleteStaffId:number=0;
  

  reactiveForm!: FormGroup;

  staff:{
    address:string, 
    dateOfBirth:string,
    email:string,
    firstName:string,
    gender:string,
    hospitalName:string,
    idNumber:string,
    lastName:string,
    middleName:string,
    nationality?:string,
    password?:string,
    phoneNumber:string,
    roles:string
  }[]=[];

  filteredStaff:Observable<{address:string, 
    dateOfBirth:string,
    email:string,
    firstName:string,
    gender:string,
    hospitalName:string,
    idNumber:string,
    lastName:string,
    middleName:string,
    nationality?:string,
    password?:string,
    phoneNumber:string,
    roles:string}[]>;

  filterHospitals(){
    this.searchedStaff=this.searchControl.value;
  }

  ngOnInit(): void {
    let hospitalName = JSON.parse(localStorage.getItem('userObj')).hospitalName
    console.log('USER: ',hospitalName)
    this.addNewStaffService.getHospitalStaff().subscribe(
      (res)=>{
        this.staff=res.filter(x=>x.hospitalName.toLowerCase().includes(hospitalName.toLowerCase()))
        console.log('STAFF: ',this.staff)
      },
      (err)=>{console.log(err)},
    )
    
    this.filteredStaff = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
    this.reactiveForm = new FormGroup({
      
      staffDetails:new FormGroup({
        firstname: new FormControl(null, Validators.required),
        middlename: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phone: new FormControl(null, [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern(/^\d+$/)]),
        id: new FormControl(null, [Validators.required,Validators.minLength(8), Validators.pattern(/^\d+$/)]),
        gender: new FormControl("Male", Validators.required),
        address: new FormControl(null, Validators.required),
        dob: new FormControl(null, Validators.required),
        role: new FormControl("DOCTOR", Validators.required),
        nationality: new FormControl(null, Validators.required),
      }),
     
      passwordDetails : new FormGroup({
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        
      })
    })
  }

  private _filter(value:string):{address:string, 
    dateOfBirth:string,
    email:string,
    firstName:string,
    gender:string,
    hospitalName:string,
    idNumber:string,
    lastName:string,
    middleName:string,
    nationality?:string,
    password?:string,
    phoneNumber:string,
    roles:string}[]{
    const filterValue=value.toLowerCase();
    return this.staff.filter(hos => hos.hospitalName.toLowerCase().includes(filterValue))
  }

  showForm(){
    this.showAddStaff=!this.showAddStaff;
    this.reactiveForm.reset()
  }
  onAddUserSubmit(){
    if (this.reactiveForm.invalid){
      this.showInvalidFormAlert=!this.showInvalidFormAlert;
      setTimeout(()=>{this.showInvalidFormAlert=!this.showInvalidFormAlert;},3000)
    }else{
      this.showSpinner=!this.showSpinner;
      this.addNewStaffService.new_staff(this.reactiveForm)
      .subscribe(
          {
            next: (response) => {
              
              
              
              this.showSpinner=!this.showSpinner;
              console.log(this.showSpinner)
              this.showSuccessAlert=!this.showSuccessAlert;
              setTimeout(()=>{this.showSuccessAlert=!this.showSuccessAlert;},3000)
              this.reactiveForm.reset()
              
              
            },
            error: (error) => {
              alert(error.error.message);
              this.showSpinner=!this.showSpinner;
            },
            complete: () => {
              console.log('Request complete');
              
            }
          }
        )
      
    }
    
  }
  deleteStaff(id?:string){
    this.deleteStaffId=parseInt(id)
    this.showDeleteAlert=!this.showDeleteAlert;
  }
  _deletStaff(){
    this.staffService.deleteStaff(this.deleteStaffId).subscribe(
      (res)=>{
        alert('User deleted')
        this.showDeleteAlert=false;
        this.ngOnInit()
      },
      (err)=>{alert(err)}
    )
  }

}
