import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from  '../add/emailValid';
import { Storage } from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MhomePage } from '../mhome/mhome';


@IonicPage()
@Component({
  selector: 'page-add-role',
  templateUrl: 'add-role.html',
})
export class AddRolePage {

  team:any;
  role:any;
	username: any;
    accesstoken: any;
    error_mssg: any = null;
    slideOneForm: FormGroup;
    submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,public http: Http, public storage: Storage, public alertCtrl: AlertController) {

   this.slideOneForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        email: ['', EmailValidator.isValid]
    });
  }

    addmem(value : any){
       this.storage.get('jsonObj').then((val) => {
         this.username = val.username;
         this.accesstoken = val.accesstoken;
         this.addfunc(value);
      });
    }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad AddRolePage');
  }

  save()
  {

    if(!this.slideOneForm.valid){
            this.submitAttempt = true;
        console.log("Invalid");
    } 
    
    else {
        this.addmem(this.slideOneForm.value);
        console.log("success!")
        //console.log(this.slideOneForm.value);
    }
  //console.log(this.team);
  }

    	addfunc(value : any){
  		let name : any = value.name;
      let clientemail: any = value.email;
      let role: any = this.role;
      let team: any = this.team;

  		let jsonObj : any;
  		let status: String;

  		let link : any = "http://localhost:9000/TestRest/testrest/addmember";

      console.log(this.team);

  		var data = JSON.stringify(
  		{
  			name: value.name, 
  	    email: value.email,
        role: this.role,
        team: this.team,
  		});
  	
  		//console.log(value.name);
	    
      var headers = new Headers();
	    headers.append("Content-Type", "application/json");
	    headers.append("username",this.username);
	    headers.append("accesstoken",this.accesstoken);

      this.http.post(link, data, {headers: headers})
	  	.subscribe(data => {
	    	value.response = data["_body"];
	      jsonObj = JSON.parse(data["_body"]);
	      
        status = jsonObj.status;

        if(status == "inserted")
        {
            this.presentConfirm(value);   
        }
        else{
          this.error_mssg = "* This project Name exists already! Please try again with different name!";
        }

	    },error => {
        this.error_mssg = "There was some problem! Please try again!";
        this.navCtrl.setRoot(HomePage,this.error_mssg);
	    });
  	}

    presentConfirm(value:any) 
    {
      let alert = this.alertCtrl.create({
        title: 'Added Successfully!',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('OK clicked');
              this.navCtrl.setRoot(MhomePage);
            }
          }
        ]
      });
      alert.present();
    }

    goBack(){
      this.navCtrl.popToRoot();
    }

    onChange(){

      //log("Selected", this.role);

    }

}
