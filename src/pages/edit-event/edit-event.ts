import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import {VisitpagePage} from '../visitpage/visitpage';

@IonicPage()
@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {

  collectings: any = [];
  submitAttempt: boolean = false;
  loader:any;
  visit : any;
  data :any;
  errormessage: any = null;
  addEventForm : FormGroup;
  myjsonObj: any;
  jsonObj : any;
  status : any;
  currVisit: any;
  date:any = new Date();
  day:any = ('0' + this.date.getDate()).slice(-2);
  month:any = ('0' + (this.date.getMonth() + 1)).slice(-2);
  year:any = this.date.getFullYear();
  currDate: any = this.year + '-' + this.month + '-' + this.day;
  currTime:any = this.date.getTime();
  hours:any;
  minutes:any;
  events: any;
  eventValid: any = false;
  eventStatus: any = "Yet to start";
  modes:any = [
    {
      mode: "None"
    },
    {
      mode: "Shift"
    },
    {
      mode: "Shrink"
    }
  ];
  currEvent: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage, public loadingCtrl: LoadingController, public http: Http, public alertCtrl: AlertController) {
      this.currEvent = this.navParams.get('currEvent');
      this.addEventForm = formBuilder.group({
        name:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        owner: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        venue: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        date1:  ['', Validators.compose([Validators.required])],
        time1: ['', Validators.compose([Validators.required])],
        time2: ['', Validators.compose([Validators.required])],
        mode: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        duration: ['', Validators.compose([Validators.required])]
    });

    this.presentLoading();
    this.storage.get("currVisit").then(value=>{
        this.currVisit = value;
        this.storage.get("jsonObj").then(val=>{
          this.myjsonObj = val;
          this.storage.get("events").then(va=>{
              this.events = va;
              console.log(this.events.length);
              this.getCollectings();
          }
          );
        });
      }); 
  }

	getCollectings()
  {
      //var link = 'http://Sample-env-1.i23yadcngp.us-west-2.elasticbeanstalk.com/testrest/ftoc';
      var link = 'http://localhost:9000/TestRest/testrest/getEditEventData';
      var data = JSON.stringify(
      { 
        visitid: this.currVisit.VISITID
      });
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("username", this.myjsonObj.username);
      headers.append("accesstoken", this.myjsonObj.accesstoken);
          
      console.log('server call');
      this.http.post(link, data, {"headers": headers})
      .subscribe(data => {

        this.jsonObj = JSON.parse(data["_body"]);
        this.collectings = this.jsonObj.users;
        this.events = this.jsonObj.events;
        this.addEventForm.setValue(
          {
            name: this.currEvent.NAME,
            owner: this.currEvent.OWNER,
            venue: this.currEvent.VENUE,
            date1: this.currEvent.DUEDATE,
            time1: this.currEvent.STARTTIME,
            time2: this.currEvent.ENDTIME,
            duration:"00:00"
          }
          );
        this.updateEvents();
        this.loader.dismiss();
        this.storage.set('users', this.collectings);
        this.storage.set('events', this.events);
      }, error => {
        this.jsonObj = JSON.parse(error["_body"]);
        console.log("ERROR: " + this.jsonObj.error);
      });
  }

  updateEvents()
  {
    var i;
    this.getCurrDate();
    for(i=0;i<this.events.length;i++)
    {
        if(this.currVisit.VISITDATE == this.currDate)
        {
          if(this.events[i].STATUS != "SUSPENDED")
          {
            if(this.currTime < this.events[i].STARTTIME.substring(0,5))
            {

            }
            if(this.currTime >= this.events[i].STARTTIME.substring(0,5))
            {
                if(this.currTime <= this.events[i].ENDTIME.substring(0,5))
                {
                  this.events[i].STATUS = "ONGOING";
                }
                else
                {
                  this.events[i].STATUS = "COMPLETED";
                }
            }            
          }
        }
        
        if(this.currVisit.VISITDATE > this.currDate)
        {
          if(this.events[i].STATUS != "SUSPENDED")
          {
            this.events[i].STATUS = "COMPLETED";
          }
        }
        
        if(this.events[i].EVENTID == this.currEvent.EVENTID)
        {
            this.currEvent = this.events[i];
        }
    }
  }

  presentLoading() 
  {
      this.loader = this.loadingCtrl.create({
      content: "Loading ...",
      });
      this.loader.present();
  }

  save(formvalue:any)
  {
    var i;

    if(!this.addEventForm.valid)
    {
        this.submitAttempt = true;
        console.log("Invalid addEventForm");
    } 
    else 
    {
        this.getCurrDate();
        this.updateEvents();
        if(this.currEvent.STATUS!="SUSPENDED" && this.currEvent.STATUS!="COMPLETED")
        {
            if(formvalue.mode == "None")
            {
                this.validateNONE(formvalue);
            }
            if(formvalue.mode == "Shift")
            {
                this.validateSHIFT(formvalue);
            }
            if(formvalue.mode == "Shrink")
            {
                this.validateSHRINK(formvalue);
            }
        }
        else
        {
            this.errormessage = "can't edit suspended or completed events";
        }
    }
  }

  validateNONE(value:any)
  {
    var i=0;
    this.eventValid = false;
    this.errormessage = null;

    if(this.addEventForm.value.time1 < this.addEventForm.value.time2)
    {
      if(this.currVisit.VISITDATE >= this.currDate)
      {
        if(this.currVisit.VISITDATE == this.currDate)
        {
            if(this.addEventForm.value.time1 >= this.currTime)
            {
                if(this.events.length == 0)
                {
                  this.eventValid = true;
                }

                for(i=0;i<this.events.length && !this.eventValid;i++)
                {
                  console.log('from if starttime:'+ this.addEventForm.value.time1 + ' >= event end time: ' + this.events[i].ENDTIME.substring(0,5) + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5)) + '');
                  console.log('from if endtime:' + this.addEventForm.value.time2 + ' <= event start time: ' + this.events[i].STARTTIME.substring(0,5) + ' ' +  (this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5)) + '');                      //console.log('if starttime:'+ this.addEventForm.value.time1 +' >= eventend: '+ this.events[i].ENDTIME + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME) + '');
                  //console.log('if endtime<= event start time' + (this.addEventForm.value.time2 <= this.events[i].STARTTIME) + '');
                  if(this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5) || this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5))
                  {
                      if(i == this.events.length-1)
                      {
                          this.eventValid = true;
                      }
                  }
                  else
                  {
                      break;
                  }
                }
            }
        }
        else
        {
            if(this.events.length == 0)
            {
              this.eventValid = true;
            }

            for(i=0;i<this.events.length && !this.eventValid;i++)
            {
                  console.log('from else starttime:'+ this.addEventForm.value.time1 + ' >= event end time: ' + this.events[i].ENDTIME.substring(0,5) + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5)) + '');
                  console.log('from else endtime:' + this.addEventForm.value.time2 + ' <= event start time: ' + this.events[i].STARTTIME.substring(0,5) + ' ' +  (this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5)) + '');
                if(this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5) || this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5))
                {
                  if(i == this.events.length-1)
                  {
                      this.eventValid = true;
                  }
                }
                else
                {
                  break;
                }
            }
        }
      }
    }
    
    console.log(this.addEventForm.value);
    //due date validation
    if(this.addEventForm.value.date1 > this.currVisit.VISITDATE || this.addEventForm.value.date1 < this.currDate)
    {
      this.eventValid = false;
    }

    if(this.eventValid)
    {
      this.errormessage = null;
      console.log("The event is valid and is going to be added to events");
      if(this.currVisit.VISITDATE == this.currDate && this.addEventForm.value.time1 == this.currTime)
      {
        this.eventStatus = "Ongoing";
      }
      this.createEvent(this.addEventForm.value);
    }
    else
    {
      this.errormessage = "Invalid (or) Overlapping Timings for the event (or) Invalid Due Date";
      console.log(this.errormessage);
    }
  }

  validateSHIFT(value:any)
  {
    var i=0;
    this.eventValid = false;
    if(this.addEventForm.value.time1 < this.addEventForm.value.time2)
    {
      if(this.currVisit.VISITDATE >= this.currDate)
      {
        if(this.currVisit.VISITDATE == this.currDate)
        {
            if(this.addEventForm.value.time1 >= this.currTime)
            {
                if(this.events.length == 0)
                {
                  this.eventValid = true;
                }

                for(i=0;i<this.events.length && !this.eventValid;i++)
                {
                  console.log('from if starttime:'+ this.addEventForm.value.time1 + ' >= event end time: ' + this.events[i].ENDTIME.substring(0,5) + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5)) + '');
                  console.log('from if endtime:' + this.addEventForm.value.time2 + ' <= event start time: ' + this.events[i].STARTTIME.substring(0,5) + ' ' +  (this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5)) + '');                      //console.log('if starttime:'+ this.addEventForm.value.time1 +' >= eventend: '+ this.events[i].ENDTIME + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME) + '');
                  //console.log('if endtime<= event start time' + (this.addEventForm.value.time2 <= this.events[i].STARTTIME) + '');
                  if(this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5) || this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5))
                  {
                      if(i == this.events.length-1)
                      {
                          this.eventValid = true;
                      }
                  }
                  else
                  {
                      break;
                  }
                }
            }
        }
        else
        {
            if(this.events.length == 0)
            {
              this.eventValid = true;
            }

            for(i=0;i<this.events.length && !this.eventValid;i++)
            {
                  console.log('from else starttime:'+ this.addEventForm.value.time1 + ' >= event end time: ' + this.events[i].ENDTIME.substring(0,5) + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5)) + '');
                  console.log('from else endtime:' + this.addEventForm.value.time2 + ' <= event start time: ' + this.events[i].STARTTIME.substring(0,5) + ' ' +  (this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5)) + '');
                if(this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5) || this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5))
                {
                  if(i == this.events.length-1)
                  {
                      this.eventValid = true;
                  }
                }
                else
                {
                  break;
                }
            }
        }
      }
    }
    
    console.log(this.addEventForm.value);
    //due date validation
    if(this.addEventForm.value.date1 > this.currVisit.VISITDATE || this.addEventForm.value.date1 < this.currDate)
    {
      this.eventValid = false;
    }

    if(this.eventValid)
    {
      this.errormessage = null;
      console.log("The event is valid and is going to be added to events");
      if(this.currVisit.VISITDATE == this.currDate && this.addEventForm.value.time1 == this.currTime)
      {
        this.eventStatus = "Ongoing";
      }
      this.createEvent(this.addEventForm.value);
    }
    else
    {
      this.errormessage = "Invalid (or) Overlapping Timings for the event (or) Invalid Due Date";
      console.log(this.errormessage);
    }
  }

  validateSHRINK(value:any)
  {
    var i=0;
    this.eventValid = false;
    if(this.addEventForm.value.time1 < this.addEventForm.value.time2)
    {
      if(this.currVisit.VISITDATE >= this.currDate)
      {
        if(this.currVisit.VISITDATE == this.currDate)
        {
            if(this.addEventForm.value.time1 >= this.currTime)
            {
                if(this.events.length == 0)
                {
                  this.eventValid = true;
                }

                for(i=0;i<this.events.length && !this.eventValid;i++)
                {
                  console.log('from if starttime:'+ this.addEventForm.value.time1 + ' >= event end time: ' + this.events[i].ENDTIME.substring(0,5) + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5)) + '');
                  console.log('from if endtime:' + this.addEventForm.value.time2 + ' <= event start time: ' + this.events[i].STARTTIME.substring(0,5) + ' ' +  (this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5)) + '');                      //console.log('if starttime:'+ this.addEventForm.value.time1 +' >= eventend: '+ this.events[i].ENDTIME + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME) + '');
                  //console.log('if endtime<= event start time' + (this.addEventForm.value.time2 <= this.events[i].STARTTIME) + '');
                  if(this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5) || this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5))
                  {
                      if(i == this.events.length-1)
                      {
                          this.eventValid = true;
                      }
                  }
                  else
                  {
                      break;
                  }
                }
            }
        }
        else
        {
            if(this.events.length == 0)
            {
              this.eventValid = true;
            }

            for(i=0;i<this.events.length && !this.eventValid;i++)
            {
                  console.log('from else starttime:'+ this.addEventForm.value.time1 + ' >= event end time: ' + this.events[i].ENDTIME.substring(0,5) + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5)) + '');
                  console.log('from else endtime:' + this.addEventForm.value.time2 + ' <= event start time: ' + this.events[i].STARTTIME.substring(0,5) + ' ' +  (this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5)) + '');
                if(this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5) || this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5))
                {
                  if(i == this.events.length-1)
                  {
                      this.eventValid = true;
                  }
                }
                else
                {
                  break;
                }
            }
        }
      }
    }
    
    console.log(this.addEventForm.value);
    //due date validation
    if(this.addEventForm.value.date1 > this.currVisit.VISITDATE || this.addEventForm.value.date1 < this.currDate)
    {
      this.eventValid = false;
    }

    if(this.eventValid)
    {
      this.errormessage = null;
      console.log("The event is valid and is going to be added to events");
      if(this.currVisit.VISITDATE == this.currDate && this.addEventForm.value.time1 == this.currTime)
      {
        this.eventStatus = "Ongoing";
      }
      this.createEvent(this.addEventForm.value);
    }
    else
    {
      this.errormessage = "Invalid (or) Overlapping Timings for the event (or) Invalid Due Date";
      console.log(this.errormessage);
    }
  }


  createEvent(value : any){
  	//console.log("ADD VISIT FUNDCTION");
    //console.log(data);

    var link = 'http://localhost:9000/TestRest/testrest/addEvent';
    var data = JSON.stringify(
      { 
        visitid: this.currVisit.VISITID,
        name: value.name,
        starttime: value.time1,
        endtime: value.time2,
        owner: value.owner,
        duedate: value.date1,
        venue: value.venue,
        status: this.eventStatus
      });
    
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
  	headers.append("username",this.myjsonObj.username);
	  headers.append("accesstoken",this.myjsonObj.accesstoken);
    
    this.http.post(link, data, {headers: headers})
    .subscribe(data => {

      this.jsonObj = JSON.parse(data["_body"]);
      this.status = this.jsonObj.status;
     
    if(this.status == "inserted")
    {
      this.presentConfirm(value);
      /*this.navCtrl.setRoot(ManagerHomePage).then(
      ()=>{
        this.navCtrl.popToRoot();
      }
      );*/
    }
    else
    {
      this.errormessage = "problem from server";
    }
  }, error => {
    this.errormessage = "problem from server";
    });

    /*
    this.navCtrl.push(ProjectpagePage, {visit:this.visit});
    */
  }

  presentConfirm(value:any) 
  {
    let alert = this.alertCtrl.create({
      title: 'Event Added Successfully!',
      message: 'Event: ' + value.name + ' added succesfully',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
	}

  getCurrDate()
  {
        this.date = new Date();
        this.day = ('0' + this.date.getDate()).slice(-2);
        this.month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        this.year = this.date.getFullYear();
        this.currDate = this.year + '-' + this.month + '-' + this.day;
        this.hours = ('0' + this.date.getHours()).slice(-2);
        this.minutes = ('0' + this.date.getMinutes()).slice(-2);
        this.currTime = this.hours + ":" + this.minutes;
        //console.log(" getCurr: current date is " + this.currDate + " and time is " + this.currTime);    
  }

  goBack()
  {
    this.navCtrl.pop();
  }

}
