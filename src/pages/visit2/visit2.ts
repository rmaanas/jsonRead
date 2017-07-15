import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Navbar } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import {AddEditPage } from '../add-edit/add-edit';
import {AddEventPage } from '../add-event/add-event';
import {EditEventPage } from '../edit-event/edit-event';

@IonicPage()
@Component({
  selector: 'page-visit2',
  templateUrl: 'visit2.html',
})
export class Visit2Page {
 @ViewChild(Navbar) navBar:Navbar;

  collectings:any = [];
  loader:any;
  username: any;
  myjsonObj: any;
  currVisit: any;
  jsonObj: any;
  submitAttempt: boolean = false;
  visit : any;
  allprojects :any;
  addVisitForm : FormGroup;
  status : any;
  currdate : Date;
  date:any = new Date();
  day:any = ('0' + this.date.getDate()).slice(-2);
  month:any = ('0' + (this.date.getMonth() + 1)).slice(-2);
  year:any = this.date.getFullYear();
  currDate: any = this.year + '-' + this.month + '-' + this.day;
  currTime:any = this.date.getTime();
  hours:any;
  minutes:any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public storage: Storage) {

    this.presentLoading();
    this.storage.get("currVisit").then(value=>{
        this.currVisit = value;
        this.storage.get("jsonObj").then(val=>{
          this.myjsonObj = val;
          this.getCollectings();
        });
      });  
  }


	getCollectings()
  {
      //var link = 'http://Sample-env-1.i23yadcngp.us-west-2.elasticbeanstalk.com/testrest/ftoc';
      var link = 'http://localhost:9000/TestRest/testrest/getEvents';
      
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("username", this.myjsonObj.username);
        headers.append("accesstoken", this.myjsonObj.accesstoken);
        var data = JSON.stringify(
        { 
          visitid: this.currVisit.VISITID
        });

        this.http.post(link,data, {"headers": headers})
        .subscribe(data => {
          this.jsonObj = JSON.parse(data["_body"]);
          this.collectings = this.jsonObj.events;
          this.updateEvents();
          this.loader.dismiss();
          this.storage.set('events', this.collectings);
        }, error => {
          this.jsonObj = JSON.parse(error["_body"]);
          console.log("ERROR: " + this.jsonObj.error);
        });
  }


  updateEvents()
  {
    var i;
    this.getCurrDate();
    for(i=0;i<this.collectings.length;i++)
    {
        if(this.currVisit.VISITDATE == this.currDate)
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
        
        if(this.currVisit.VISITDATE < this.currDate)
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




  presentLoading() 
  {
      this.loader = this.loadingCtrl.create({
      content: "Loading Events...",
      });
      this.loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Visit2Page');
    this.navBar.backButtonClick = (e:UIEvent) => {
        console.log("Back button clicked");
        this.navCtrl.parent.viewCtrl.dismiss();
    };
  }

  itemSelected(item1) {
    console.log(item1.NAME + " is selected");
    this.navCtrl.push(EditEventPage,{
    currEvent : item1,
    parentPage: this
    });
  }

  fab()
  {
    this.navCtrl.push(AddEventPage, {parentPage: this});
  }

}
