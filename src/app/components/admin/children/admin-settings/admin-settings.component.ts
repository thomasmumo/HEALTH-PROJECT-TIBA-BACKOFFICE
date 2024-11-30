import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../super-admin/children/home/admin.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent implements OnInit{
  constructor(private hospitalservice:AdminService){}
  AdminDetails:any={}
  reactiveForm: FormGroup;
  showChangePassword:boolean=false;
  showAlert:boolean=false;
  cpass_showeye:boolean=false;
  npass_showeye:boolean=false;
  pass_showeye:boolean=false;
  userObj:any={}

  showMatchAlert:boolean=false;
  showCurrentAlert:boolean=false;

  ngOnInit(): void {
    this.userObj=JSON.parse(localStorage.getItem('userObj'))
    console.log('USER-OBJ',this.userObj)
    this.reactiveForm = new FormGroup({
      
      currentPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    })
    let userObj=JSON.parse(localStorage.getItem('userObj'))
    
    this.hospitalservice.getAllHospitalAdmins().subscribe(
      (res)=>{
        this.AdminDetails=res.filter(x=>x.email.toLowerCase().includes(this.userObj.email.toLowerCase()))[0]
        console.log('OJJECTT: ',this.AdminDetails)
      },
      (err)=>{console.log('ADMINS-err',err)},
    )
    
      
  }
  showContainer(){
    this.showChangePassword=!this.showChangePassword;
  }

  onSubmit(){
    if (this.reactiveForm.invalid){
      this.showAlert=true;
      
    }else if(this.reactiveForm.controls['newPassword'].value!=this.reactiveForm.controls['confirmPassword'].value){
      this.showMatchAlert=true;
      
    }
    this.hospitalservice.changePassword(this.userObj.id,this.reactiveForm).subscribe(
      (res)=>{console.log('PASSWORD CHANGED',res.message)},
      (err)=>{
        console.log('PASSWORD err',err.error.message)
        if(err.error.message==='Current password is incorrect'){
          
          this.showMatchAlert=false;
          this.showCurrentAlert=true;
        }
      },
      
    )
      
    
  }
  showPassword(input:string){
    if(input==='cpass'){
      this.cpass_showeye=!this.cpass_showeye;
    }else if(input==='npass'){
      this.npass_showeye=!this.npass_showeye;
    }else{this.pass_showeye=!this.pass_showeye}
    let x:any =document.getElementById(input);
    
    if(x.type==="text"){
      x.type="password"
    }else{
      x.type="text"
    }
    
  }


}
