import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChecklistPage } from '../checklist/checklist';

@IonicPage()
@Component({
  selector: 'page-edit-checklist-event',
  templateUrl: 'edit-checklist-event.html',
})
export class EditChecklistEventPage {

	currevent : any;
	createEventForm : FormGroup;
	myjsonObj:any;
	username:any;
	jsonObj:any;
	errormessage : string = null;
	submitAttempt: boolean = false;
  	starttime : any;
  	endtime : any;
  	checklist : any;
  	status : boolean = false;
  	eventname : string;
  	venue : string;
		loader: any;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController,public storage:Storage, public http:Http,public formBuilder: FormBuilder, public navParams: NavParams, public loadingCtrl: LoadingController) {

  	this.currevent = this.navParams.get("currevent");

	this.createEventForm = formBuilder.group({
		'eventname': ['', Validators.compose([Validators.required,Validators.maxLength(50)])]
	});

	this.createEventForm.setValue({
		'eventname' : this.currevent.name
	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditChecklistEventPage');
  }


  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Event Updated',
      message: 'The event has been successfully updated',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(ChecklistPage);
          }
        }
      ]
    });
    alert.present();
  }

  createevent(value:any){
			var link = 'http://testrest-env-cvm.us-west-2.elasticbeanstalk.com/testrest/modifychecklist';
	  	//var link = 'http://localhost:9000/TestRest/testrest/modifychecklist';
	  	var data = JSON.stringify({ 
	  		"eventname" : value.eventname,
				"prevname"	: this.currevent.name
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
	      	if(status == "updated")
	      	{
	      		this.presentConfirm();
		    }
	        else
	        {
	          	this.errormessage = "This event already exists! Please choose a different name";
	        }
	    },error => {
	    	this.errormessage = "There was some problem. Please try again!";
	    });
	}


	create(formvalue:any)
	{
	  	if(this.createEventForm.valid)
			{
				if(formvalue.eventname == this.currevent.name)
				{
					this.presentConfirm();
				}
				else
				{
					this.storage.get("jsonObj").then(value=>{
							this.myjsonObj = value;
					this.createevent(formvalue);
					});
				}
			}
			else
			{
				this.submitAttempt = true;
				console.log("Invalid");
			}
	}

	presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Loading ...",
    });
    this.loader.present();
  }

}
