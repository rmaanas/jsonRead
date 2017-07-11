import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage, public loadingCtrl: LoadingController, public http: Http) {
      
      this.addEventForm = formBuilder.group({
        name:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        owner: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        venue: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        date1:  ['', Validators.compose([Validators.required])],
        time1: ['', Validators.compose([Validators.required])],
        time2: ['', Validators.compose([Validators.required])]
    });

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
 
    if(!this.addEventForm.valid)
    {
        this.submitAttempt = true;
        console.log("Invalid addEventForm");
    } 
    else 
    {
        if(this.addEventForm.value.time1 >= this.addEventForm.value.time2)
        {
          console.log("invalid start and end time");
          this.errormessage = "invalid start and end time";
        }
        else
        {
          this.errormessage = null;
        }
        console.log(this.addEventForm.value);
    }
 
  }

  getCurrDate()
  {
        this.date = new Date();
        this.day = ('0' + this.date.getDate()).slice(-2);
        this.month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        this.year = this.date.getFullYear();
        this.currDate = this.year + '-' + this.month + '-' + this.day;    
  }

  goBack()
  {
    this.navCtrl.pop();
  }

}
