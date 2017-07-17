import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { ManagerHomePage } from '../manager-home/manager-home';
import {ChecklistPage } from '../checklist/checklist';
import {LoadingController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-createevent',
  templateUrl: 'createevent.html'
})
export class CreateeventPage {
	
	createEventForm : FormGroup;
	myjsonObj:any;
	username:any;
	jsonObj:any;
	errormessage : string = null;
	submitAttempt: boolean = false;
	loader:any;
  	checklist : any;
  	status : boolean = false;
  	eventname : string;


  	constructor(public navCtrl: NavController,public storage:Storage, public http:Http,public formBuilder: FormBuilder, public navParams: NavParams, public loadingCtrl: LoadingController) {

	  	this.createEventForm = formBuilder.group({
	       'eventname': ['',Validators.compose([Validators.required,Validators.maxLength(50)])]
	    });
	}


	createevent(value:any){
		
	  	var link = 'http://localhost:9000/TestRest/testrest/addeventinchecklist';
	  	var data = JSON.stringify({ 
	  		"eventname" : value.eventname
	  	});

	    var headers = new Headers();
	    headers.append("Content-Type", "application/json");
	    headers.append("username", this.myjsonObj.username);
	    headers.append("accesstoken", this.myjsonObj.accesstoken);
	    this.presentLoading();

	    this.http.post(link, data, {headers: headers})
	  	.subscribe(data => {
	    	this.jsonObj = JSON.parse(data["_body"]);
	      	let status = this.jsonObj.status;
	      	this.loader.dismiss();
	      	if(status == "inserted")
	      	{
		        this.navCtrl.setRoot(ChecklistPage);
		    }
	        else
	        {
	          	this.errormessage = "An event with this name already exists! Choose a different event name";
				  this.submitAttempt = true;
	        }
	    },error => {
	    	this.errormessage = "There was some problem. Please try again!";
	    });
	}

	create(formvalue:any)
	{
	  	if(!this.createEventForm.valid){
			this.submitAttempt = true;
			console.log("Invalid");
		} 
		else 
		{
			this.storage.get("jsonObj").then(value=>{
				this.myjsonObj = value;
				this.createevent(formvalue);
			});
		}
	}

	presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Loading ...",
    });
    this.loader.present();
  }

}
