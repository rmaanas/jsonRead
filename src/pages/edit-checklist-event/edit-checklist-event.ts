import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
	error_mssg : string = null;
	submitAttempt: boolean = false;
  	starttime : any;
  	endtime : any;
  	checklist : any;
  	status : boolean = false;
  	eventname : string;
  	venue : string;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController,public storage:Storage, public http:Http,public formBuilder: FormBuilder, public navParams: NavParams) {

  	this.currevent = this.navParams.get("currevent");
  	this.storage.get("jsonObj").then(value=>{
	        this.myjsonObj = value;
	    });

	  	this.storage.get("checklist").then(value=>{
	  		this.checklist = value;
	  		console.log(this.checklist.length);
	  	});

	  	this.createEventForm = formBuilder.group({
	       'eventname': ['', Validators.compose([Validators.required,Validators.maxLength(50)])],
	       'starttime': ['', Validators.compose([Validators.required])],
	       'endtime': ['', Validators.compose([Validators.required])],
	       'venue': ['', Validators.compose([Validators.required,Validators.maxLength(50)])]
	    });

	    this.createEventForm.setValue({
	    	'eventname' : this.currevent.name,
	    	"starttime" : this.currevent.starttime,
	    	'endtime' : this.currevent.endtime,
	    	'venue' : this.currevent.venue
	    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditChecklistEventPage');
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Event Modified',
    subTitle: 'The event has been successfully modified!',
    buttons: ['OK']
  });
  alert.present();
}

  createevent(value:any){
		
	  	var link = 'http://localhost:9000/TestRest/testrest/modifyeventinchecklist';
	  	var data = JSON.stringify({ 
	  		"eventname" : value.eventname,
	  		"starttime" : value.starttime,
	  		"endtime" : value.endtime,
	  		"venue" : value.venue,
	  		"prevname" : this.currevent.name,
	  		"prevvenue" : this.currevent.venue
	  	});

	    var headers = new Headers();
	    headers.append("Content-Type", "application/json");
	    headers.append("username", this.myjsonObj.username);
	    headers.append("accesstoken", this.myjsonObj.accesstoken);
	      
	    this.http.post(link, data, {headers: headers})
	  	.subscribe(data => {
	    	this.jsonObj = JSON.parse(data["_body"]);
	      	let status = this.jsonObj.status;
	      	
	      	if(status == "updated")
	      	{
	      		this.presentAlert();
		        this.navCtrl.pop();
		    }
	        else
	        {
	          	this.error_mssg = "This event already exists. You can directly create new events!";
	        }
	    },error => {
	    	this.error_mssg = "There was some problem. Please try again!";
	    });
	}

	check(i : any)
	{
		var valid : boolean = false;
					
		let start02 = this.checklist[i+1].starttime.substring(0,2);
		let start35 = this.checklist[i+1].starttime.substring(3,5);

		let end02 = this.checklist[i].endtime.substring(0,2);
		let end35 = this.checklist[i].endtime.substring(3,5);

		if(end02 < this.starttime.substring(0,2))
		{
			if(start02 >= this.endtime.substring(0,2))
			{
				if(start35 >= this.endtime.substring(3,5))
				{
					valid = true;
				}
			}
		}
		else if(end02 == this.starttime.substring(0,2))
		{
			if(end35 <= this.starttime.substring(3,5))
			{
				valid = true;
			}
		}
	    return valid;
	}

	create(value:any)
	{
		if(this.starttime >= this.endtime)
	    {
	    	this.error_mssg = "Please enter start time less than end time!";
	    }
	    else 
	    {
	    	if(!this.createEventForm.valid)
	    	{
	        	this.submitAttempt = true;
	    	} 
	    	else 
	    	{
	    		let present : boolean = false;
	    		
	    		for(var i = 0; i<this.checklist.length-1 && !present && this.checklist[i].name != this.currevent.name; i++)
	    		{
	    			if(i==0)
	    			{
	    				if(this.checklist[i].starttime.substring(0,2) >= this.endtime.substring(0,2))
			    		{
			    			present = true;
			    		}
	    			}
	    			if(this.check(i) == true)
	    			{
	    				present = true;
	    			}
	    		}	
	    		if(this.checklist[i].endtime.substring(0,2) <= this.starttime.substring(0,2))
	    		{
	    			present = true;
	    		}
	    		if(present)
	    		{
	    			this.createevent(value);
	    		}
	    		else{
	    			this.error_mssg = "* The starttime and endtime is overlapping! Please enter correct time!";
	    		}
	    	}
	    }
	}

}
