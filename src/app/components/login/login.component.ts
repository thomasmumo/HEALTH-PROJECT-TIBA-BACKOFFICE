import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthLoginService } from '../services/auth-login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent implements OnInit {
  jwt = new JwtHelperService()
  reactiveForm: FormGroup;
  showeye:boolean=false;
  showLoader:boolean=false;
  incorrectCredentials:boolean=this.authLoginService.invalidCredentials;
  invalidForm:boolean=false

  


  constructor(private authLoginService:AuthLoginService,private router:Router){}

  

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    this.showLoader =! this.showLoader;
    if (this.reactiveForm.invalid){
      console.log('Form invalid')
      this.invalidForm=!this.invalidForm
      this.showLoader =! this.showLoader;
      setTimeout(()=>{this.invalidForm=!this.invalidForm},3000)
    }

    if(this.reactiveForm.controls['email'].value ==='tmumo0420@gmail.com'){
      this.authLoginService.superAdminLogin(this.reactiveForm).subscribe(
        (res)=>{
          localStorage.setItem('Token',res.data.token)
          localStorage.setItem('userObj',JSON.stringify(res.data))
          console.log('Success:', res);
          this.authLoginService.authenticate()
          this.router.navigate(['super-admin'])
          this.showLoader =false;
        },

        (error) => {
            
            
          console.log('Error',error.error.message)
          if(error.error.message==='User was not found' || error.error.message==='Invalid password'){
            this.incorrectCredentials=true;
            
            this.showLoader =false;
            this.reactiveForm.reset()
            
            

          }
          
        
          
    
          
        }
      )
    }else{
      this.authLoginService.login(this.reactiveForm).subscribe(
        
          (response:any) => {
  
            localStorage.setItem('Token',response.data.token)
            localStorage.setItem('userObj',JSON.stringify(response.data))
            console.log('Success:', response);
         
            const token:any=localStorage.getItem('Token')
  
            if(response.data.roles==='HOSPITAL_ADMIN'){
              console.log('hospital admin ogged in ')
              this.authLoginService.authenticate()
              this.router.navigate(['admin'])
              this.showLoader =false;
            }
            
            console.log(this.jwt.decodeToken(token))
            // this.authLoginService.getUserDetails().subscribe((res)=>{console.log('UserInfo:',res)})
            
          },
        (error) => {
            
            
            console.log('Error',error.error.message)
            if(error.error.message==='User was not found' || error.error.message==='Invalid password'){
              this.incorrectCredentials=true;
              
              this.showLoader =false;
              this.reactiveForm.reset()
              
              
  
            }
            
          
            
      
            
          }
        
      )
    }
    
    
    
    

  }
 

  showPassword(){
    this.showeye=!this.showeye;
    let x:any =document.getElementById('pass');
    
    if(x.type==="text"){
      x.type="password"
    }else{
      x.type="text"
    }
    
  }

 

}