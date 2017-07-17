import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ChecklistPage } from '../checklist/checklist';

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
	       'eventname': [this.currevent.name, Validators.compose([Validators.required,Validators.maxLength(50)])],
	       'starttime': [this.currevent.starttime, Validators.compose([Validators.required])],
	       'endtime': [ this.currevent.endtime, Validators.compose([Validators.required])],
	       'venue': [this.currevent.venue, Validators.compose([Validators.required,Validators.maxLength(50)])]
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

  	modifyevent(value:any){
		
	  	var link = 'http://localhost:9000/TestRest/testrest/modifychecklist';
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
		        this.navCtrl.setRoot(ChecklistPage);
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

		if(end02 < this.currevent.starttime.substring(0,2))
		{
			if(start02 >= this.currevent.endtime.substring(0,2))
			{
				if(start35 >= this.currevent.endtime.substring(3,5))
				{
					valid = true;
				}
			}
		}
		else if(end02 == this.currevent.starttime.substring(0,2))
		{
			if(end35 <= this.currevent.starttime.substring(3,5))
			{
				valid = true;
			}
		}
	    return valid;
	}

	validate()
	{
		let flag : boolean = false; 
		if(this.starttime >= this.endtime)
	    {
	    	this.error_mssg = "Please enter start time less than end time!";
	    }
	    else 
	    {
	    	var i =0,pos = -1;
	    	if(this.checklist.length == 1)			//if checklist lengthi is 1
	   		{
	   			return true;
	   		}
			else		
	    	{
	    		for(i=0;i<this.checklist.length;i++)			//seaching for item
	    		{
	    			if(this.checklist[i].name == this.currevent.name)
	    			{
	    				pos=i;
	    			}
	    		}

	    		if(pos != -1)
	    			this.checklist.splice(pos,1);			//deleting that item
	    			
	    		i = 0;	
	    		if(this.checklist.length ==0)
	    		{
	    			return true;
	    		}
	    		else if(this.checklist.length == 1)
	    		{
	    			if(this.checklist[i].starttime.substring(0,2) > this.currevent.endtime.substring(0,2))		//insert at start
	    			{
	    				return true;
	    			}
	    			else if(this.checklist[i].starttime.substring(0,2) > this.currevent.endtime.substring(0,2))
	    			{
	    				if(this.checklist[i].starttime.substring(3,5) >= this.currevent.endtime.substring(3,5))
	    				{
	    					return true;
	    				}
	    			}
	    			else
	    			{
	    				if(this.checklist[i].endtime.substring(0,2) < this.currevent.starttime.substring(0,2))			//insert at end
		    			{
		    				return true;
		    			}
		    			else if(this.checklist[i].endtime.substring(0,2) > this.currevent.starttime.substring(0,2))
		    			{
		    				if(this.checklist[i].endtime.substring(3,5) >= this.currevent.starttime.substring(3,5))
		    				{
		    					return true;
		    				}
		    			}
	    			}
	    		}
	    		else
	    		{
	    			if(this.checklist[i].starttime.substring(0,2) > this.currevent.endtime.substring(0,2))		//insert at start
	    			{
	    				return true;
	    			}
	    			else if(this.checklist[i].starttime.substring(0,2) > this.currevent.endtime.substring(0,2))
	    			{
	    				if(this.checklist[i].starttime.substring(3,5) >= this.currevent.endtime.substring(3,5))
	    				{
	    					return true;
	    				}
	    			}
	    			
	    			for(i=0;i<this.checklist.length-1;i++)			//insert in between
	    			{
	    				console.log(this.checklist[i].starttime.substring(0,2) + "  " + this.checklist[i].starttime.substring(3,5) + "  " + this.checklist[i].endtime.substring(0,2) + "  " + this.checklist[i].endtime.substring(3,5));

	    				if(this.check(i))
	    				{
	    					return true;
	    				}
	    			}
	    			
	    			console.log("insertion at last");
		  	    	console.log(this.checklist[i].starttime.substring(0,2) + "  " + this.checklist[i].starttime.substring(3,5) + "  " + this.checklist[i].endtime.substring(0,2) + "  " + this.checklist[i].endtime.substring(3,5));

	    			if(this.checklist[i].endtime.substring(0,2) > this.currevent.starttime.substring(0,2))			//insert at end
	    			{
	    				return true;
	    			}
	    			else if(this.checklist[i].endtime.substring(0,2) > this.currevent.starttime.substring(0,2))
	    			{
	    				if(this.checklist[i].endtime.substring(3,5) >= this.currevent.starttime.substring(3,5))
	    				{
	    					return true;
	    				}
	    			}
	    		}
	    	}
	    }
	    return flag;
	}

	modify(value : any)
	{
		if(this.validate())
		{
			this.modifyevent(value);
		}
		else
		{
			this.error_mssg = "The timing of event is overlapping! Please enter correct times!";
		}
	}

	goback()
	{
		this.navCtrl.setRoot(ChecklistPage);
	}
}
