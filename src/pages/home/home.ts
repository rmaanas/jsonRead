import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { NavController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {ManagerHomePage} from '../manager-home/manager-home';
import {EmployeeHomePage} from '../employee-home/employee-home';
import {ShareService} from '../services/ShareService';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //public imglink = "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Atos.svg/800px-Atos.svg.png";
  data: any;
  loader: any;
  jsonObj: any;
  authenticated: any;
  constructor(public loadingCtrl : LoadingController,public navCtrl: NavController, public http: Http,public shareService: ShareService, public storage: Storage) {
        this.data = {};
        this.data.username = '';
        this.data.response = '';
        this.http = http;
  }
 
  submit() {
	//var link = 'http://Sample-env-1.i23yadcngp.us-west-2.elasticbeanstalk.com/testrest/login';
  var link = 'http://localhost:9000/TestRest/testrest/login';
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
	if(this.authenticated == "yes")
	{
      this.shareService.setUserName(this.jsonObj.username);
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
	}}, error => {
		console.log("Oooops!");
	});
  }

  presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Authenticating...",
    });
    this.loader.present();
  }
}
