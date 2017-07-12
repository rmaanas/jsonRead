import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Nav, Navbar } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the HistdetavisitPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-histdetavisit',
  templateUrl: 'histdetavisit.html',
})
export class HistdetavisitPage {

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

  constructor(public nav: Nav,public navCtrl: NavController,public http : Http,public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public storage: Storage, public alertCtrl: AlertController) {
  	this.presentLoading();
    this.getData();
  }

  getData()
  {
      return this.storage.get("currVisit").then(value=>{
        this.currVisit = value;
        this.projectname = this.currVisit.NAME;
        this.clienthead = this.currVisit.CLIENTHEAD;
        this.organisation = this.currVisit.ORGANISATION;
        this.clientemail = this.currVisit.CLIENTEMAIL;
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
    console.log('ionViewDidLoad HistdetavisitPage');
  }

}
