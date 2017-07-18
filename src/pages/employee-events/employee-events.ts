import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HistoryPage } from '../history/history';

@IonicPage()
@Component({
  selector: 'page-employee-events',
  templateUrl: 'employee-events.html',
})
export class EmployeeEventsPage {

	collectings:any = [];
  date:any = new Date();
  day:any = ('0' + this.date.getDate()).slice(-2);
  month:any = ('0' + (this.date.getMonth() + 1)).slice(-2);
  year:any = this.date.getFullYear();
  currDate: any = this.year + '-' + this.month + '-' + this.day;
  currTime:any = this.date.getTime();
  hours:any;
  minutes:any;
	jsonObj:any;
	loader : any;
	myjsonObj : any;
	username : string;
	accesstoken :any;

  constructor(public loadingCtrl: LoadingController,public storage: Storage,public http:Http,public navCtrl: NavController, public navParams: NavParams) {

    this.presentLoading();
    this.storage.get("jsonObj").then(value=>{
    	this.myjsonObj = value;
    	this.storage.set('currDate' , this.currDate);
      this.loader.dismiss();
      this.getallevents();
    });

  }

  getallevents(){

  	var link = 'http://testrest-env-cvm.us-west-2.elasticbeanstalk.com/testrest/getemployeeevents';
    //var link = 'http://localhost:9000/TestRest/testrest/getemployeeevents';
    var data = JSON.stringify({currdate: this.currDate, username : this.myjsonObj.username});
    var headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("username", this.myjsonObj.username);
    headers.append("accesstoken", this.myjsonObj.accesstoken);

    console.log("server call");
    this.presentLoading();  
    this.http.post(link,data, {"headers": headers})
    .subscribe(data => {

        this.jsonObj = JSON.parse(data["_body"]);
        this.collectings = this.jsonObj.events;
        this.updateEvents();
        this.loader.dismiss();
        this.storage.set('empevents',this.collectings);
      }, error => {
        this.jsonObj = JSON.parse(error["_body"]);
        console.log("ERROR: " + this.jsonObj.error);
      });

  }


  doRefresh(refresher:any){

  	var link = 'http://testrest-env-cvm.us-west-2.elasticbeanstalk.com/testrest/getemployeeevents';
    //var link = 'http://localhost:9000/TestRest/testrest/getemployeeevents';
    var data = JSON.stringify({currdate: this.currDate, username : this.myjsonObj.username});
    var headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("username", this.myjsonObj.username);
    headers.append("accesstoken", this.myjsonObj.accesstoken);

    console.log("server call");
      
    this.http.post(link,data, {"headers": headers})
    .subscribe(data => {

        this.jsonObj = JSON.parse(data["_body"]);
        this.collectings = this.jsonObj.events;
        this.updateEvents();
        refresher.complete();
        this.storage.set('empevents',this.collectings);
      }, error => {
        this.jsonObj = JSON.parse(error["_body"]);
        refresher.complete();
        console.log("ERROR: " + this.jsonObj.error);
      });

  }


  itemSelected(value:any)
  {
    this.storage.set('currVisit',value);
    this.navCtrl.push(HistoryPage);
  }

  
  presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Loading your Events....Please Wait!",
    });
    this.loader.present();
  }

  updateEvents()
  {
    var i;
    this.getCurrDate();
    for(i=0;i<this.collectings.length;i++)
    {
        if(this.collectings[i].VISITDATE == this.currDate)
        {
          if(this.collectings[i].STATUS != "SUSPENDED")
          {
            if(this.currTime < this.collectings[i].STARTTIME.substring(0,5))
            {

            }
            if(this.currTime >= this.collectings[i].STARTTIME.substring(0,5))
            {
                if(this.currTime < this.collectings[i].ENDTIME.substring(0,5))
                {
                  this.collectings[i].STATUS = "ONGOING";
                }
                else
                {
                  this.collectings[i].STATUS = "COMPLETED";
                }
            }            
          }
        }
        
        if(this.collectings[i].VISITDATE < this.currDate)
        {
          if(this.collectings[i].STATUS != "SUSPENDED")
          {
            this.collectings[i].STATUS = "COMPLETED";
          }
        }
    }
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeEventsPage');
  }

  getLocalCollectings(){
    return this.storage.get("empevents").then(value=>{
      this.collectings = value;
    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    //this.collectings=this.getCollectings();
    return this.getLocalCollectings().then(value=>{   
      //this.collectings = value;
      var val = ev.target.value;
      console.log(val.toLowerCase());
      if (val && val.trim() != '') {
        this.collectings = this.collectings.filter((item) => {
          console.log(item.EVENTNAME.toLowerCase() + " is seen");
          return (item.EVENTNAME.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    );
  }  

}
