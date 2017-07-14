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
  eventIndex: any = -1;
  fieldsValid: any;
  parentPage: any;

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
      this.parentPage = this.navParams.get('parentPage');
      this.currEvent = this.navParams.get('currEvent');
      this.addEventForm = formBuilder.group({
        name:  ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
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
            time1: this.currEvent.STARTTIME.substring(0,5),
            time2: this.currEvent.ENDTIME.substring(0,5),
            mode: "None",
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
                if(this.currTime < this.events[i].ENDTIME.substring(0,5))
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
        
        if(this.currVisit.VISITDATE < this.currDate)
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
      content: "Waiting for server response ...",
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
        this.eventValid = true;
        if(this.currEvent.STATUS!="SUSPENDED" && this.currEvent.STATUS!="COMPLETED")
        {
            this.validateFields(formvalue);
            if(this.fieldsValid)
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
        }
        else
        {
            this.errormessage = "Can't edit suspended or completed events";
        }
        this.eventValid = false;
    }
  }

  validateFields(value:any)
  {
      this.fieldsValid = true;

      //start time greater than equal to end time
      if(value.time1 >= value.time2)
      {
          this.fieldsValid = false;
          this.errormessage = "start time must be less than end time";
      }

      //start time
      if(this.fieldsValid && this.currVisit.VISITDATE == this.currDate && value.time1 <= this.currTime)
      {
          if(this.currEvent.STATUS != "ONGOING")
          {
            this.fieldsValid = false;
            this.errormessage = "start time should be greater than current time";
          }
      }

      //due date
      console.log("duedate: " + value.date1);
      console.log(" date of visit: " + this.currVisit.VISITDATE) 
      console.log(" Truth of date: " + (value.date > this.currVisit.VISITDATE) + " ");
      
      if(this.fieldsValid && (value.date1 < this.currDate || value.date1 > this.currVisit.VISITDATE))
      {
          this.fieldsValid = false;
          console.log("reached");
          this.errormessage = "the due date has to be greater than today's date and less than or equal to visit date";
          
          //due date of past if unchanged is valid for submission
          if(value.date1 < this.currDate && value.date1 == this.currEvent.DUEDATE)
          {
            this.fieldsValid = true;
            this.errormessage = null;
          }
      }

      // for ongoing events
      if(this.fieldsValid && this.currEvent.STATUS == "ONGOING")
      {
          //venue can't be changed for an ongoing event
          if(this.fieldsValid && this.currEvent.VENUE != value.venue)
          {              
              this.fieldsValid = false;
              this.errormessage = "venue can't be changed for an ongoing event";
          }

          //start time can't be changed for an ongoing event
          if(this.fieldsValid && this.currEvent.STARTTIME.substring(0,5) != value.time1)
          {              
              this.fieldsValid = false;
              this.errormessage = "Start time can't be changed for an ongoing event";
          }          
      }

      if(this.fieldsValid)
      {
        //start time or end time has been changed
        if((this.currEvent.STARTTIME.substring(0,5) != value.time1) || (this.currEvent.ENDTIME.substring(0,5) != value.time2))
        {
            //Not allowed to change start or end time while using Shrink or Shift mode 
            if(value.mode != "None")
            {
                this.fieldsValid = false;
                this.errormessage = "Not allowed to change start or end time while using Shrink or Shift mode";
            }
        }
      }

  }


  validateNONE(value:any)
  {
    var i=0;
    var eventIndex = 0;
    var wasFalse = false;
    this.eventValid = false;
    this.errormessage = null;

    for(i=0;i<this.events.length && !wasFalse;i++)
    {
      //console.log("i: " + i + "eventID: " + this.events[i].EVENTID + "  currEventID: " + this.currEvent.EVENTID);
      //console.log(' starttime:'+ this.addEventForm.value.time1 + ' >= event end time: ' + this.events[i].ENDTIME.substring(0,5) + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5)) + '');
      //console.log(' endtime:' + this.addEventForm.value.time2 + ' <= event start time: ' + this.events[i].STARTTIME.substring(0,5) + ' ' +  (this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5)) + '');                      //console.log('if starttime:'+ this.addEventForm.value.time1 +' >= eventend: '+ this.events[i].ENDTIME + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME) + '');
    
      if(this.events[i].EVENTID != this.currEvent.EVENTID)
      {
        if(this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5) || this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5))
        {

        }
        else
        {
            wasFalse = true;
        }
      }
      else
      {
         this.eventIndex = i;
      }
    }

    this.eventValid =  !wasFalse;
    
    console.log(this.addEventForm.value);

    if(this.eventValid)
    {
      this.errormessage = null;
      //update the event
      this.events[this.eventIndex].NAME = value.name;
      this.events[this.eventIndex].OWNER = value.owner;
      this.events[this.eventIndex].VENUE =  value.venue;
      this.events[this.eventIndex].DUEDATE =  value.date1;
      this.events[this.eventIndex].STARTTIME =  value.time1;
      this.events[this.eventIndex].ENDTIME = value.time2;
      console.log("The event is valid and is going to be updated");
      this.editEvent(value);
    }
    else
    {
      this.errormessage = "Overlapping Timings for the event";
      console.log(this.errormessage);
    }
  }

  validateSHIFT(value:any)
  {
    var i=0;
    this.eventValid = true;
    this.errormessage = null;
    for(i=0;i<this.events.length && this.eventValid;i++)
    {
      //console.log('from if starttime:'+ this.addEventForm.value.time1 + ' >= event end time: ' + this.events[i].ENDTIME.substring(0,5) + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5)) + '');
      //console.log('from if endtime:' + this.addEventForm.value.time2 + ' <= event start time: ' + this.events[i].STARTTIME.substring(0,5) + ' ' +  (this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5)) + '');                      //console.log('if starttime:'+ this.addEventForm.value.time1 +' >= eventend: '+ this.events[i].ENDTIME + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME) + '');
      
      if(value.time1 < this.events[i].STARTTIME.substring(0,5))
      {
          //console.log("increment by duration ");
          this.events[i].STARTTIME = this.timeAdd(this.events[i].STARTTIME.substring(0,5) , value.duration);
          this.events[i].ENDTIME = this.timeAdd(this.events[i].ENDTIME.substring(0,5) , value.duration);

          //increrment both start and end times
      }
      //console.log("tym"+ value.time1 + " " + this.events[i].STARTTIME.substring(0,5));
      if(value.time1 == this.events[i].STARTTIME.substring(0,5))
      { 
          this.eventIndex = i;
          this.events[i].ENDTIME = this.timeAdd(this.events[i].ENDTIME.substring(0,5) , value.duration);
          //increment only end time
      }
    }

    //update event
    //console.log("eventIndex is " + this.eventIndex);
    this.events[this.eventIndex].NAME = value.name;
    this.events[this.eventIndex].OWNER = value.owner;
    this.events[this.eventIndex].VENUE =  value.venue;
    this.events[this.eventIndex].DUEDATE =  value.date1;
    console.log("Event is valid and going to be updated");
    this.editEvent(value);
  }

  validateSHRINK(value:any)
  {
    var i=0;
    var ongoing=-1;
    this.eventValid = true;
    //shrink duration cant be more than or equal to event duration
    if(this.timeSub(value.time2 , value.time1) <= value.duration)
    {
        this.eventValid = false;
        this.errormessage = "shrink duration cant be more than or equal to event duration";
    }

    if(this.eventValid && this.currDate < this.currVisit.VISITDATE)
    {
      this.eventValid = false;
      this.errormessage = "shrink can be used only on day of event with atleast one ONGOING event to be extended";
    }

    for(i=0;i<this.events.length && this.eventValid;i++)
    {
      //console.log('from if starttime:'+ this.addEventForm.value.time1 + ' >= event end time: ' + this.events[i].ENDTIME.substring(0,5) + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME.substring(0,5)) + '');
      //console.log('from if endtime:' + this.addEventForm.value.time2 + ' <= event start time: ' + this.events[i].STARTTIME.substring(0,5) + ' ' +  (this.addEventForm.value.time2 <= this.events[i].STARTTIME.substring(0,5)) + '');                      //console.log('if starttime:'+ this.addEventForm.value.time1 +' >= eventend: '+ this.events[i].ENDTIME + ' ' + (this.addEventForm.value.time1 >= this.events[i].ENDTIME) + '');

      if(this.events[i].STATUS == "ONGOING")
      {
          if(this.events[i].EVENTID == this.currEvent.EVENTID)
          {
              this.eventValid = false;
              this.errormessage = "can't shrink ongoing event";
          }
          else
          {
              ongoing = i;
              this.events[i].ENDTIME = this.timeAdd(this.events[i].ENDTIME.substring(0,5) , value.duration);
          }
          break;
      }
    }

    if(this.eventValid && ongoing == -1)
    {
      this.eventValid = false;
      this.errormessage = "shrink can be used only on day of event with atleast one ONGOING event to be extended";
    }    
    
    for(i=ongoing+1;i<this.events.length && this.eventValid;i++)
    {
      if(this.events[i].EVENTID == this.currEvent.EVENTID)
      {
          this.eventValid = true;
          this.eventIndex = i;
          this.events[i].STARTTIME = this.timeAdd(this.events[i].STARTTIME.substring(0,5) , value.duration);
          break;
      }
      else
      {
          this.events[i].STARTTIME = this.timeAdd(this.events[i].STARTTIME.substring(0,5) , value.duration);
          this.events[i].ENDTIME = this.timeAdd(this.events[i].ENDTIME.substring(0,5) , value.duration);
      }
    }
    
    //console.log(this.addEventForm.value);

    if(this.eventValid)
    {
      this.errormessage = null;
      console.log("The event is valid and is going to be updated");
      this.events[this.eventIndex].NAME = value.name;
      this.events[this.eventIndex].OWNER = value.owner;
      this.events[this.eventIndex].VENUE =  value.venue;
      this.events[this.eventIndex].DUEDATE =  value.date1;
      this.editEvent(value);
    }
    else
    {
      console.log(this.errormessage);
    }
  }


  editEvent(value : any){
  	//console.log("ADD VISIT FUNDCTION");
    //console.log(data);

    var link = 'http://localhost:9000/TestRest/testrest/editEvent';
    var data = JSON.stringify(
      { 
        events: this.events
      });
    
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
  	headers.append("username",this.myjsonObj.username);
	  headers.append("accesstoken",this.myjsonObj.accesstoken);
    
    this.presentLoading();
    this.http.post(link, data, {headers: headers})
    .subscribe(data => {

      this.loader.dismiss();
      this.jsonObj = JSON.parse(data["_body"]);
      this.status = this.jsonObj.status;
     
    if(this.status == "updated")
    {
      this.storage.set("events", this.events);
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
      title: 'Event Updated Successfully!',
      message: 'Event: ' + value.name + ' updated succesfully',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
            this.parentPage.getCollectings();
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
    this.parentPage.getCollectings();
    this.navCtrl.pop();
  }

  timeAdd(t1:any, t2:any): any
  {
    var t:any = new Date("2017-07-13 00:00");
    var x:any = new Date("2017-07-13 " + t1);
    var y:any = new Date("2017-07-13 " + t2);
    var z:any = y.getTime() + x.getTime() - (2 * t.getTime());
    var hours: any = parseInt(z/3600000+'');
    var minutes: any = parseInt(((z%3600000)/60000) + '');
  
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);

    return hours+":"+minutes;
  }

  timeSub(t1:any, t2:any): any
  {
    //var t:any = new Date("2017-07-13 00:00");
    var x:any = new Date("2017-07-13 " + t1);
    var y:any = new Date("2017-07-13 " + t2);
    var z:any = x.getTime() - y.getTime();
    var hours: any = parseInt(z/3600000+'');
    var minutes: any = parseInt(((z%3600000)/60000) + '');
  
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);

    return hours+":"+minutes;
  }

}
