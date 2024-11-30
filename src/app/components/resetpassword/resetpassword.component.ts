import { Component, OnInit } from '@angular/core';

import { PasswordRessetService } from '../services/password-resset.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit{
  newPasswordOBJ:changeOBJ;
  constructor(private resetService:PasswordRessetService, private router:Router){this.newPasswordOBJ = new changeOBJ()}
  
  email:string;
  password:string;
  confirmPassword:string;
  showeye:boolean=false;
  cshoweye:boolean=false;
  emailInput:boolean=true;
  codeInput:boolean=false
  passwordInput:boolean=false
  showloader:boolean=false;
  errorMsg:string='';
  OTPInput = new FormControl('',[Validators.maxLength(6),Validators.required])
  passInput = new FormControl('',[,Validators.required])
  confirmPassInput = new FormControl('',[,Validators.required])
  OTPError:string='';
  passMatchErr:boolean=false;
  success:boolean=false;

  
  
  ngOnInit(): void {
    
  }
  onSubmit(data:string, email?:string){
    this.showloader=true;
    if(data==='email'){
      this.email=email;
      this.resetService.getOTP(email).subscribe(
        (res)=>{
          console.log('RESSS',res)
          this.emailInput=false;
          this.showloader=false;
          this.codeInput=true
        },
        (err)=>{
          this.errorMsg=err.error.message;
          this.showloader=false;


        },
      )
    }else if(data==='reset'){
      if(this.passInput.value!=this.confirmPassInput.value){
        this.passMatchErr=true;
        this.showloader=false;
        
      }else{
        this.passMatchErr=false;
        this.newPasswordOBJ.email=this.email;
        this.newPasswordOBJ.otp=this.OTPInput.value;
        this.newPasswordOBJ.newPassword=this.passInput.value;
        console.log('OBJECCCT', this.newPasswordOBJ)
        this.resetService.resetPassword(this.newPasswordOBJ).subscribe(
          (res)=>{
            console.log('PASS-CHANGE: ',res)
            this.showloader=false;
            this.success=true
            setTimeout(()=>{
              this.success=false
              setTimeout(()=>{this.router.navigate(['login'])},1000)
            },3000)
          },
          (err)=>{
            console.log('PASS-CHANGE-ERR: ',err)
            this.OTPError=err.error.message;
            this.showloader=false;
          },
      )
      }
      
    }
  }
  showPassword(input:string){
    if(input==='pass'){
      this.showeye=!this.showeye;
    let x:any =document.getElementById('pass');
    
    if(x.type==="text"){
      x.type="password"
    }else{
      x.type="text"
    }
    }else{
      this.cshoweye=!this.cshoweye;
    let x:any =document.getElementById('cpass');
    
    if(x.type==="text"){
      x.type="password"
    }else{
      x.type="text"
    }
    }
    
    
  }

}
export class changeOBJ{
  email:string;
  otp:string;
  newPassword:string;
  
  constructor(){
    this.email='';
    this.otp='';
    this.newPassword='';
  }
}
