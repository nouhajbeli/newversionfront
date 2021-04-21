import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service'
import {Router} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import M from 'materialize-css'

@Component({
  selector: 'app-reset-p',
  templateUrl: './reset-p.component.html',
  styleUrls: ['./reset-p.component.css']
})
export class ResetPComponent implements OnInit {
  serverErrorMessages:any;
  showSuccessMessage:any
  registerForm: any;
  submitted = false;
  model={
    email:'',
  }
  constructor(private myService:UserService,private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

  });
  }
  get f() { return this.registerForm.controls; }
  onSubmit(){
    this.submitted = true;
    console.log(this.registerForm.value)
   this.myService.resetService(this.registerForm.value).subscribe(

    (res:any)  =>{
      console.log(res)
      this.showSuccessMessage="email envoyer verifier votre email"

      M.toast({html: res.error,classes:"#c62828 red darken-3"})
    },
    err =>{
      console.log(err)
      M.toast({html:err.error,classes:"#43a047 green darken-1"})

       this.serverErrorMessages=err.error.message
       console.log(err)
    }
  )
  }

}
