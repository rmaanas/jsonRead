import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
loader:any;
  username: any;
  myjsonObj: any;
  jsonObj: any;
  submitAttempt: boolean = false;
  visit : any;
  allprojects :any;
  addVisitForm : FormGroup;
  status : any;
  currdate : Date;
  projectname:any = '';
  clienthead:any = '';
  organisation:any = '';
  clientemail:any = '';
  currVisit: any;
  venue : any ;
  visitdate : any ;

 constructor(public nav: Nav,public navCtrl: NavController,public http : Http,public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public storage: Storage, public alertCtrl: AlertController) {
    
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
  }

}
