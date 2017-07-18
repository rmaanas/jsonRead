import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {LoadingController, AlertController } from 'ionic-angular';
import { ManagerHomePage } from '../manager-home/manager-home';
import { HomePage } from '../home/home';
import { EmployeeHomePage } from '../employee-home/employee-home';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  loader: any;
  myjsonObj: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.presentLoading("loading..");
    this.storage.get("jsonObj").then(value=>{
      this.loader.dismiss();
	    this.myjsonObj = value;
	    this.presentConfirm();
	  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

    presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.presentLoading("Logging out...");
            this.storage.clear().then(val=>{
              this.loader.dismiss();
              this.navCtrl.setRoot(HomePage);
            }
            );  
          }
        },
        {
          text: 'NO',
          handler: () => {
              if(this.myjsonObj.role == "manager")
              {
                  this.navCtrl.setRoot(ManagerHomePage);
              }
              else
              {
                  this.navCtrl.setRoot(EmployeeHomePage);
              }
          }
        }
      ]
    });
    alert.present();
  }

    presentLoading(msg:any) {
      this.loader = this.loadingCtrl.create({
      content: msg,
    });
    this.loader.present();
  }
}
