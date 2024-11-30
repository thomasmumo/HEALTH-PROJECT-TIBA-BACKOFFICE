import { Component, inject, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSignupService } from '../../../services/auth-signup.service';
import { map, Observable, startWith } from 'rxjs';
import { AdminService } from '../home/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  reactiveForm!: FormGroup;
  showSignup:boolean=false;
  showInvalidFormAlert:boolean=false;
  showSpinner:boolean=false;
  showSuccess:boolean=false;
  searchControl = new FormControl();
  searchedHospital:string='';
  showDelete:boolean=false;
  adminIDNumber:number=0;

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
    roles:string
  }[]>;
  
  


  

  constructor(private signupService:AuthSignupService, private formBuilder:FormBuilder,private hospitalService:AdminService){}

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


  ngOnInit(): void {
    this.filteredHosptals = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
    this.reactiveForm = new FormGroup({
      
      adminDetails:new FormGroup({
        firstname: new FormControl(null, Validators.required),
        middlename: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phone: new FormControl(null, [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
        id: new FormControl(null, [Validators.required,Validators.minLength(8)]),
        gender: new FormControl('Male', Validators.required),
        address: new FormControl(null, Validators.required),
        dob: new FormControl(null, Validators.required),
        role: new FormControl('ADMIN', Validators.required),
      }),
      hospitalDetails: new FormGroup({
        hospitalname: new FormControl(null, Validators.required),
        hospitaladdress: new FormControl(null, Validators.required),
        hospitallocation: new FormControl(null, Validators.required),
        hospitalcontact: new FormControl(null, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      }),
      passwordDetails : new FormGroup({
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        
      })
    })

    this.hospitalService.getAllHospitalAdmins().subscribe(
      (res)=>{
        this.hospitals=res
        console.log('Hosi-ZOTE',res)
      },
      (err)=>{console.log(err)}
    )
    console.log('Hosi-ZOTE')
    
    
      
  }
  
  

  onSubmit(){
    if(this.reactiveForm.invalid){
      this.showInvalidFormAlert=!this.showInvalidFormAlert;
      setTimeout(()=>{this.showInvalidFormAlert=!this.showInvalidFormAlert},3000)
    }else{
      this.showSpinner=true;
      this.signupService.signup(this.reactiveForm).subscribe(
        {
              next: (response) => {
                this.showSpinner=false;
                this.showSuccess=true;
                setTimeout(()=>{this.showSuccess=false},3000)
                console.log('Success:', response);
                this.ngOnInit()
                
                
              },
              error: (error) => {
                
                this.showSpinner=false;
                alert(error.error.message);
              }
        }
      )
    }

  }
  show_signup(){
    this.showSignup=!this.showSignup;
    
  }
  getHospitals(){
    this.signupService.getAllUsers().subscribe(
      (res)=>{console.log(res)},
      (err)=>{console.log(err)}
    )
  }

  filterHospitals(){
    this.searchedHospital=this.searchControl.value;
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

  showDeleteAlert(id?:number){
    this.adminIDNumber=id;
    this.showDelete=!this.showDelete;
  }
  DeleteAdmin(){
    this.hospitalService.deleteHospital(this.adminIDNumber).subscribe(
      (res)=>{
        this.showDelete=false;
        this.ngOnInit()
        alert('Admin Deleted successfully')
      },
      (err)=>{}
    )
  }

}
