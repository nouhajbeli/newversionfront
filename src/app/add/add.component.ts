import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ApiserviceService } from '../shared/apiservice.service';
// import { UserService } from '../shared/user.service';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  userDetails: any;
  images: any = [];
  showSuccessMessage: any;
  serverErrorMessages: any;
  selectedCountry: any = {};
code:any
  addMosqueForm: any;
  submitted = false;
  selectedOption: any;
  constructor(
    private _formBuilder:FormBuilder,
    private router: Router,
    private MosqueeService: ApiserviceService,
    private activateroute: ActivatedRoute
  ) {
   this.createForm();
  }

  ngOnInit(): void {}
  createForm(){
    this.code=this.activateroute.snapshot.params.code;
    this.addMosqueForm=this._formBuilder.group({

        nomMosquee:['', Validators.required],
        adresse:['', Validators.required],
        imamMosquee:['', Validators.required],
        imageUrl:['', Validators.required],
        siteWeb:['', Validators.required],
        email:['', [Validators.required,Validators.email]],
        associationMosquee:['', Validators.required],
        lat:['', Validators.required],
        lng:['', Validators.required],
        openingHours:['', Validators.required],
        municipality:['', Validators.required],
        facebook:['', Validators.required],
        nomGestionnaire:['', Validators.required],
        sallePriereFemmes:['', Validators.required],
        mosqueeSallePriere:['', Validators.required],
        fermetureExeptionnelle:['', Validators.required],
        telephone:['', Validators.required],
        telephone1:['', Validators.required],
        ouvertureMosquee:['', Validators.required],
        code:[this.code],

    })
  };
  get f() { return this.addMosqueForm.controls; }


  onSubmit() {
    this.submitted = true;
    console.log(this.addMosqueForm.value)
        // stop here if form is invalid
        // if (this.addMosqueForm.invalid) {
        //   console.log('error')
        //     return;
        // }
    this.MosqueeService.addService(
      this.addMosqueForm.value ).subscribe(() => {

      this.router.navigate(['/dashboard']).then(() => {
        alert('Mosque added')
      });
    });
  }
}
