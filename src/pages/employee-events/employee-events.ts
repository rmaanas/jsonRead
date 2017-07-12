import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {LoadingController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-employee-events',
  templateUrl: 'employee-events.html',
})
export class EmployeeEventsPage {

	allevents: any;
	date:any = new Date();
  day:any = ('0' + this.date.getDate()).slice(-2);
  month:any = ('0' + (this.date.getMonth() + 1)).slice(-2);
  year:any = this.date.getFullYear();
  
	currDate: any = this.year + '-' + this.month + '-' + this.day;
	jsonObj:any;
	loader : any;
	myjsonObj : any;
	username : string;
	accesstoken :any;

  constructor(public loadingCtrl: LoadingController,public storage: Storage,public http:Http,public navCtrl: NavController, public navParams: NavParams) {

  	this.storage.get("jsonObj").then(value=>{
    	this.myjsonObj = value;
    	this.storage.set('currDate' , this.currDate);
      	this.getallevents();
    });

  }

  getallevents(){

  	var link = 'http://localhost:9000/TestRest/testrest/getemployeeevents';
    var data = JSON.stringify({currdate: this.currDate});
    var headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("username", this.myjsonObj.username);
    headers.append("accesstoken", this.myjsonObj.accesstoken);
      
     this.presentLoading();
    this.http.post(link,data, {"headers": headers})
    .subscribe(data => {

        this.jsonObj = JSON.parse(data["_body"]);
        this.allevents = this.jsonObj.visits;
        this.loader.dismiss();
      
      }, error => {
        this.jsonObj = JSON.parse(error["_body"]);
        console.log("ERROR: " + this.jsonObj.error);
      });

  }


  presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Loading your Events....Please Wait!",
    });
    this.loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeEventsPage');
  }

}
