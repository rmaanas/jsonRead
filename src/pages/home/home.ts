import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { NavController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {ManagerHomePage} from '../manager-home/manager-home';
import {EmployeeHomePage} from '../employee-home/employee-home';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public imglink = "assets/800px-Atos.svg.png";
  
  loader: any;
  jsonObj: any;
  authenticated: any;
  loginForm : FormGroup;
  splash = true;
  /*
  myDate: any = new Date().toISOString().split('T')[0];
  myDate:any = new Date();
  newDate:any = this.myDate.getFullYear() + '-' + (this.myDate.getMonth()+1) + '-' + this.myDate.getDate();
  
  date:any = new Date();
  day:any = ('0' + this.date.getDate()).slice(-2);
  month:any = ('0' + (this.date.getMonth() + 1)).slice(-2);
  year:any = this.date.getFullYear();
  currDate: any = this.year + '-' + this.month + '-' + this.day;
  currTime:any = this.date.getTime();
  hours:any;
  minutes:any;
  */

  public error_mssg : any = null;

  constructor(public storage : Storage,public loadingCtrl : LoadingController,public navCtrl: NavController, public formBuilder : FormBuilder, public http : Http) {
    
        this.loginForm = formBuilder.group({
        'username': [null,Validators.compose([Validators.required,Validators.maxLength(50)])],
        'password': [null,Validators.compose([Validators.required, Validators.maxLength(50)])]
    });
  }
 
  submit(value : any) {
  	//var link = 'http://testrest-env-cvm.us-west-2.elasticbeanstalk.com/testrest/login';
    var link = 'http://localhost:9000/TestRest/testrest/login';
  	var data = JSON.stringify({username: value.username, password: value.password});
  	
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    this.presentLoading();
  	
    this.http.post(link, data, {headers: headers})
  	.subscribe(data => {
    	value.response = data["_body"];
      this.jsonObj = JSON.parse(data["_body"]);
      this.authenticated = this.jsonObj.authenticated;
      this.loader.dismiss();

      if(this.authenticated == "yes")
      {
        this.storage.set("jsonObj", this.jsonObj);
        if(this.jsonObj.role == "manager")
        {
          console.log(this.jsonObj.username);
          this.navCtrl.setRoot(ManagerHomePage).then(
          ()=>{
          this.navCtrl.popToRoot();
          }
          );
        }
        else
        {
          this.navCtrl.setRoot(EmployeeHomePage).then(
          ()=>{
          this.navCtrl.popToRoot();
          }
          );
        }
      }
      else
	  {
         this.error_mssg = "Invalid Credentials! Please try again!";
      }
    },error => {
    		console.log("Error!");
    });
  }

  presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Authenticating...",
    });
    this.loader.present();
  }
/*
  ionViewDidLoad(){
    setTimeout(()=>{
      this.splash = false;
    },3000);
  }

/*  
  printValue()
  {
    //this.getCurrDate();
    //console.log("current date is " + this.currDate + " and time is " + this.currTime);
    //console.log("current time is among noon or afternoon? " + (this.currTime > "12:00"));
    var t:any = new Date("2017-07-13 00:00");
    var x:any = new Date("2017-07-13 09:59");
    var y:any = new Date("2017-07-13 10:01");
    var z:any = y.getTime() + x.getTime() - (2 * t.getTime());
    var hours: any = parseInt(z/3600000+'');
    var minutes: any = parseInt(((z%3600000)/60000) + '');
    //z = y-x;
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);
    console.log(this.timeAdd("09:01","00:59"));
    //console.log(z.getHours());
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
*/

}
