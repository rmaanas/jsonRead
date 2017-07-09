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
  public imglink = "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Atos.svg/800px-Atos.svg.png";
  
  loader: any;
  jsonObj: any;
  authenticated: any;
  loginForm : FormGroup;

  public error_mssg : any = null;

  constructor(public storage : Storage,public loadingCtrl : LoadingController,public navCtrl: NavController, public formBuilder : FormBuilder, public http : Http) {
        this.loginForm = formBuilder.group({
        'username': [null,Validators.compose([Validators.required,Validators.maxLength(50)])],
        'password': [null,Validators.compose([Validators.required, Validators.maxLength(50)])]
    });
  }
 
  submit(value : any) {
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
}
