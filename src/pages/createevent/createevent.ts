import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { ManagerHomePage } from '../manager-home/manager-home';
import {ChecklistPage } from '../checklist/checklist';

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
	error_mssg : string = null;
	submitAttempt: boolean = false;
  	starttime : any;
  	endtime : any;
  	checklist : any;
  	status : boolean = false;
  	eventname : string;
  	venue : string;

  	constructor(public navCtrl: NavController,public alertCtrl: AlertController,public storage:Storage, public http:Http,public formBuilder: FormBuilder, public navParams: NavParams) {

	  	this.storage.get("jsonObj").then(value=>{
	        this.myjsonObj = value;
	    });

	  	this.storage.get("checklist").then(value=>{
	  		this.checklist = value;
<<<<<<< HEAD
	  		console.log(this.checklist);
=======
	  		//console.log(this.checklist.length);
>>>>>>> 6aa854d897fc24c7f418883442046d45945b4e89
	  	});

	  	this.createEventForm = formBuilder.group({
	       'eventname': ['',Validators.compose([Validators.required,Validators.maxLength(50)])],
	       'starttime': ['',Validators.compose([Validators.required])],
	       'endtime': ['',Validators.compose([Validators.required])],
	       'venue': ['',Validators.compose([Validators.required,Validators.maxLength(50)])]
	    });
	}

	presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Event created',
      message: 'Your event has been successfully added!',
      buttons: [
        {
          text: 'OK',
          handler: () => {}
        }
      ]
    });
    alert.present();
  }

	createevent(value:any){
		
	  	var link = 'http://localhost:9000/TestRest/testrest/addeventinchecklist';
	  	var data = JSON.stringify({ 
	  		"eventname" : value.eventname,
	  		"starttime" : value.starttime,
	  		"endtime" : value.endtime,
	  		"venue" : value.venue
	  	});

	    var headers = new Headers();
	    headers.append("Content-Type", "application/json");
	    headers.append("username", this.myjsonObj.username);
	    headers.append("accesstoken", this.myjsonObj.accesstoken);
	      
	    this.http.post(link, data, {headers: headers})
	  	.subscribe(data => {
	    	this.jsonObj = JSON.parse(data["_body"]);
	      	let status = this.jsonObj.status;
	      	
	      	if(status == "inserted")
	      	{
	      		this.presentConfirm();
		        this.navCtrl.setRoot(ChecklistPage);
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

		console.log("start02 " + start02 + "start35 " + start35 + "end02 " + end02 + " end35 " + end35); 

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

	validate()
	{
		let present : boolean = false; 
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
	    		present = false;
	    		var i =0;
	    		if(this.checklist.length == 0)		//if checklist is empty
	    		{
	    			return true;
	    		}
	    		else if(this.checklist.length == 1)			//if only 1 entry present
	    		{
	    			if(this.checklist[i].starttime.substring(0,2) >= this.endtime.substring(0,2))
	    			{
	    				if(this.checklist[i].starttime.substring(3,5) >= this.endtime.substring(3,5))
				   		{
				  			return true;
				  		}
	    			}
	    			else if(this.checklist[i].endtime.substring(0,2) <= this.starttime.substring(0,2))
	    			{
	    				if(this.checklist[i].endtime.substring(3,5) <= this.endtime.substring(3,5))
	    				{
	    					return true;
	    				}
	    			}
	    		}
				else
				{
					if(this.checklist[i].starttime.substring(0,2) > this.endtime.substring(0,2))		//check for insertion at start
					{
						return true;
					}
		    		else if(this.checklist[i].starttime.substring(0,2) >= this.endtime.substring(0,2))					
				    {
						if(this.checklist[i].starttime.substring(3,5) >= this.endtime.substring(3,5))
				   		{
				  			return true;
				  		}
			  		}

			    	for(i = 0; i<this.checklist.length-1; i++)				//check for insertion in between events
			    	{
			   			console.log(this.checklist[i].starttime.substring(0,2) + "  " + this.checklist[i].starttime.substring(3,5) + "  " + this.checklist[i].endtime.substring(0,2) + "  " + this.checklist[i].endtime.substring(3,5));
			    
			    		if(this.check(i) == true)
			    	 	{
			   				return true;
			   			}
			   		}
			   		
			   		console.log("insertion at last");
		  	    	console.log(this.checklist[i].starttime.substring(0,2) + "  " + this.checklist[i].starttime.substring(3,5) + "  " + this.checklist[i].endtime.substring(0,2) + "  " + this.checklist[i].endtime.substring(3,5));
		    		if(this.checklist[i].endtime.substring(0,2) < this.starttime.substring(0,2))			//check for insertion at last
		    		{
		    			return true;
		    		}
		    		else if(this.checklist[i].endtime.substring(0,2) == this.starttime.substring(0,2))			
		    		{
			    		if(this.checklist[i].endtime.substring(3,5) <= this.starttime.substring(3,5))
			    		{
			   				return true;
			   			}
			   		}
			   		else
			   		{
		    			this.error_mssg = "* The event timings are overlapping with other events! Please enter correct time!";
		    		}
		    	}
	    	}
	    }
	    return present;
	}

	create(value:any)
	{
		if(this.validate())
		{
			this.createevent(value);
		}
	}
}
