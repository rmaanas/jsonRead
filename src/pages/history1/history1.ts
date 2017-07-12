import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the History1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-history1',
  templateUrl: 'history1.html',
})
export class History1Page {

  @ViewChild(Navbar) navBar:Navbar;
  loader:any;
  username: any;
  myjsonObj: any;
  jsonObj: any;
  submitAttempt: boolean = false;
  visit : any;
  allprojects :any;
  status : any;
  currdate : Date;
  projectname:any = '';
  clienthead:any = '';
  organisation:any = '';
  clientemail:any = '';
  currVisit: any;
  venue : any ;
  visitdate : any ;
  item:any;

 constructor(public navCtrl: NavController,public navParams: NavParams, public loadingCtrl: LoadingController, public storage: Storage) {
    this.presentLoading();
    this.getData();
  }

  getData()
  {
      return this.storage.get("currVisit").then(value=>{
        this.currVisit = value;
        this.projectname = this.currVisit.NAME;
        this.clienthead =  this.currVisit.CLIENTHEAD;
        this.organisation= this.currVisit.ORGANISATION;
        this.clientemail = this.currVisit.CLIENTEMAIL;
        this.visitdate  =  this.currVisit.VENUE;
        this.venue      =  this.currVisit.VISITDATE;
        console.log(this.projectname);
        //this.addVisitForm.controls['venue'].setValue = this.currVisit.VENUE;
        this.loader.dismiss();
      });    
  }

  presentLoading() 
  {
      this.loader = this.loadingCtrl.create({
      content: "Loading Visit Details...",
      });
      this.loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad History1Page');
    this.navBar.backButtonClick = (e:UIEvent) => {
        console.log("Back button clicked");
        this.navCtrl.parent.viewCtrl.dismiss();
    };
  }

}
