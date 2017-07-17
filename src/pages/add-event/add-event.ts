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
//import { Observable } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

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
  eventStatus: any = "YET TO START";
  parentPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage, public loadingCtrl: LoadingController, public http: Http, public alertCtrl: AlertController) {
      this.parentPage = this.navParams.get('parentPage');    
      this.addEventForm = formBuilder.group({
        name:  ['', Validators.compose([Validators.maxLength(500), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        owner: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        venue: ['', Validators.compose([Validators.maxLength(500), Validators.required])],
        date1:  ['', Validators.compose([Validators.required])],
        time1: ['', Validators.compose([Validators.required])],
        time2: ['', Validators.compose([Validators.required])]
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
      var link = 'http://localhost:9000/TestRest/testrest/getAllUsers';
      
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("username", this.myjsonObj.username);
      headers.append("accesstoken", this.myjsonObj.accesstoken);
          
      console.log('server call');
      this.http.get(link, {"headers": headers})
      .subscribe(data => {

        this.jsonObj = JSON.parse(data["_body"]);
        this.collectings = this.jsonObj.users;
        this.loader.dismiss();
        this.storage.set('users', this.collectings);
      }, error => {
        this.jsonObj = JSON.parse(error["_body"]);
        console.log("ERROR: " + this.jsonObj.error);
      });
  }

  presentLoading() 
  {
      this.loader = this.loadingCtrl.create({
      content: "Loading ...",
      });
      this.loader.present();
  }

  save()
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

        if(this.addEventForm.value.owner == "none")
        {
          this.eventValid = false;
          this.errormessage = "owner of the event cant be null";
        }

        if(this.eventValid)
        {
          this.errormessage = null;
          console.log("The event is valid and is going to be added to events");
          if(this.currVisit.VISITDATE == this.currDate && this.addEventForm.value.time1 == this.currTime)
          {
            this.eventStatus = "ONGOING";
          }
          this.createEvent(this.addEventForm.value);
        }
        else
        {
          this.errormessage = "Invalid (or) Overlapping Timings for the event (or) Invalid Due Date (or) event owner can't be null";
          console.log(this.errormessage);
        }
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
    this.presentLoading();
    this.http.post(link, data, {headers: headers})
    .subscribe(data => {
      this.loader.dismiss();
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

}
