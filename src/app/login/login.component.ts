import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service'
import {Router} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private myService:UserService,private router:Router,private formBuilder: FormBuilder) { }
  model={
    email:'',
    password:''
  }
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages:any;
registerForm: any;
submitted = false;
  ngOnInit(): void {
    if(this.myService.isLoggedIn()){
      this.router.navigateByUrl('/userProfile')
    }
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],

  });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('error')
        return;
    }
console.log("test of")
    // display form values on success
    this.myService.login(this.registerForm.value).subscribe(
      (res:any)  =>{

if(res['status']==='active'){
  this.myService.setToken(res['token'])
  this.myService.setRole(res['role'])
 this.router.navigate(['userProfile',  { id: this.myService.getUserPayload().id}])
}else if (res['status']==='blocked'){
  this.serverErrorMessages="vous etes bloquer "
}

      },
      err =>{
         this.serverErrorMessages=err.error.message
         console.log(err)
      }
    )
  }

}

