import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { NavController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ManagerHomePage } from '../manager-home/manager-home';
//import {MyApp } from '../../app/app.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: any;
  loader: any;
  jsonObj: any;
 // myApp: MyApp;
  authenticated: any;
  constructor(public loadingCtrl : LoadingController,public navCtrl: NavController, public http: Http) {
        this.data = {};
        this.data.username = '';
        this.data.response = '';
        this.http = http;
  }
 
  submit() {
<<<<<<< HEAD
  var link = 'http://Sample-env-1.i23yadcngp.us-west-2.elasticbeanstalk.com/testrest/login';
  var data = JSON.stringify({username: this.data.username, password: this.data.password});
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  this.presentLoading();
  this.http.post(link, data, {headers: headers})
  .subscribe(data => {
    this.data.response = data["_body"];
    this.jsonObj = JSON.parse(data["_body"]);
    this.authenticated = this.jsonObj.authenticated;
    this.loader.dismiss();
    if(this.authenticated=="yes")
    {
      this.navCtrl.setRoot(ManagerHomePage);
    }
  }, error => {
    console.log("Oooops!");
  });
=======
  	var link = 'http://Sample-env-1.i23yadcngp.us-west-2.elasticbeanstalk.com/testrest/login';
  	var data = JSON.stringify({username: this.data.username, password: this.data.password});
  	var headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.presentLoading();
  	this.http.post(link, data, {headers: headers})
  	.subscribe(data => {
  		this.data.response = data["_body"];
      this.jsonObj = JSON.parse(data["_body"]);
      this.authenticated = this.jsonObj.authenticated;
      this.loader.dismiss();
  	}, error => {
  		console.log("Oooops!");
  	});
>>>>>>> c86a565490d6d35e06fc377794ddb21fdb6f3a5f
  }

  presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Authenticating...",
    });
    this.loader.present();
  }
}
