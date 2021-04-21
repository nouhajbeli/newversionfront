import { Component, OnInit } from '@angular/core';
import { Mosquee } from 'src/app/trouvermosqueetunisie/mosquee';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../shared/apiservice.service';

@Component({
  selector: 'app-revendiquermosque',
  templateUrl: './revendiquermosque.component.html',
  styleUrls: ['./revendiquermosque.component.css']
})
export class RevendiquermosqueComponent implements OnInit {
  mosqueForm: FormGroup;
  mosque: Mosquee;
  idm;

  files: any = [];
  store: any = [];
  isLoading: boolean = false;
  isSent: boolean = false;
  emailForm: any;
  userSelected: any;

  constructor(private httpService:ApiserviceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      association: new FormControl(null, Validators.required),
      president: new FormControl(null, Validators.required),
      prenom: new FormControl(null, Validators.required),
      adresse: new FormControl(null, Validators.required),
      telephone: new FormControl(null, Validators.required),
    });


    let id = this.route.snapshot.params.idm;
    this.getMosque(id);

  }
  get f() { return this.emailForm.controls; }

  getMosque(mId: string) {

    this.httpService.getMosqueById(mId,"af").subscribe( res=> {
      this.mosque = res;

   //   this.editMosque(this.mosque);
      console.log(this.mosque);
    },
      err =>{alert("An error has occurred while downloading mosque")}
    );
  }
/*

  editMosque(mosque: Mosquee){

    this.mosqueForm.patchValue({
      mMosqueName:mosque.name,
      mMosqueAssociation:mosque.associationMosquee,
      mMosqueSiteweb:mosque.siteWeb,
      mMosqueImam:mosque.imamMosquee,
      mMosqueAdresse:mosque.adresse,
      mMosqueTelephone:mosque.telephone
    })
  }*/

/*

  envoyerform(mosqueForm){
    Email.send({
    Host:'smtp.elasticemail.com',
    Username:'faouzi.ben.makhlouf007@gmail.com',
    Password:'D91A2D4CEAE417A7969BB51CB093D0182AAE',
    To:'faouzi.ben.makhlouf007@gmail.com',
    From:'faouzi.ben.makhlouf007@gmail.com',
    Subject:'Mise a jour mosque',
    Body:'<i>This is sent as a feedback from my resume page.</i>'
    }).then( message => {alert(message);} );

  }

*/



onSelectattachment(event: any) {
  console.log(event.target.files);
  this.files.push(event.target.files[0]);
}

sendMail() {
  this.isSent = false;
  this.isLoading = true;
  this.httpService
    .sendService(
      this.emailForm.value.email,
      this.emailForm.value.association,
      this.emailForm.value.president,
      this.emailForm.value.prenom,
      this.emailForm.value.adresse,
      this.emailForm.value.telephone
    )
    .subscribe(() => {
      this.isLoading = false;
      this.isSent = true;
    });
}

envoyerform(){

}




  mapvalues(){
    this.mosque.nomMosquee= this.mosqueForm.value.mMosqueName;
    this.mosque.associationMosquee= this.mosqueForm.value.mMosqueAssociation;
    this.mosque.siteWeb= this.mosqueForm.value.mMosqueSiteweb;
    this.mosque.imamMosquee= this.mosqueForm.value.mMosqueImam;
    this.mosque.adresse= this.mosqueForm.value.mMosqueAdresse;
    this.mosque.telephone= this.mosqueForm.value.mMosqueTelephone;

  }
}
