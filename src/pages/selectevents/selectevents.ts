import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';

@IonicPage()
@Component({
  selector: 'page-selectevents',
  templateUrl: 'selectevents.html',
})
export class SelecteventsPage {

  loader: any;
  collectings: any = [];
  selectBoxes: any = [];
  events:any = [];
  visitid: any;
  myjsonObj: any;
  jsonObj: any;
  currVisit: any;
  status: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: Http, public storage: Storage) {
    this.presentLoading();
    this.storage.get("currVisit").then(value=>{
      this.currVisit = value;
      this.storage.get("jsonObj").then(val=>{
        this.myjsonObj = val;
        this.getCollectings();
      });
    }); 
  }


  getCollectings(){
  	  var link = 'http://localhost:9000/TestRest/testrest/getchecklist';
      
      var headers = new Headers();
      headers.append("username", this.myjsonObj.username);
      headers.append("accesstoken", this.myjsonObj.accesstoken);
      
      this.http.get(link, {"headers": headers})
      .subscribe(data => {

        this.jsonObj = JSON.parse(data["_body"]);
        this.collectings = this.jsonObj.checklist;
        //this.count =  this.jsonObj.count;
        this.storage.set("checklist" ,this.collectings);
        this.loader.dismiss();
      
      }, error => {
      	this.jsonObj = JSON.parse(error["_body"]);
        console.log("ERROR: " + this.jsonObj);
      });
  }

  add()
  {
    var i;
    console.log("visitid is " + this.visitid);
    console.log("the following are ticked: ");
    for(i=0;i<this.collectings.length;i++)
    {
      if(this.collectings[i].checked)
      {
        this.selectBoxes.push(this.collectings[i]);
        console.log(this.collectings[i].name);
      }
    }

    for(i=0;i<this.selectBoxes.length;i++)
    {
      this.events.push(
        {
          visitid: this.currVisit.VISITID,
          name: this.selectBoxes[i].name,
          starttime: "23:59",
          endtime: "23:59",
          owner: "none",
          duedate: this.currVisit.VISITDATE,
          venue: "",
          status: "INITIALIZE"  
        }
      );
    }

    this.addEvents();
  }

  addEvents()
  {
    var link = 'http://localhost:9000/TestRest/testrest/addEvents';
    var data = JSON.stringify(
      { 
        events: this.events
      });
    
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
  	headers.append("username",this.myjsonObj.username);
	  headers.append("accesstoken",this.myjsonObj.accesstoken);
    
    this.presentLoading();
    this.http.post(link, data, {headers: headers})
    .subscribe(data => {

      this.loader.dismiss();
      this.jsonObj = JSON.parse(data["_body"]);
      this.status = this.jsonObj.status;
     
    if(this.status == "inserted")
    {
      //this.storage.set("events", this.events);
      this.presentConfirm();
      /*this.navCtrl.setRoot(ManagerHomePage).then(
      ()=>{
        this.navCtrl.popToRoot();
      }
      );*/
    }
  }, error => {

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelecteventsPage');
  }

  presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Events added',
    message: 'Events added to the visit.. please edit the events to provide actual details',
    buttons: [
      {
        text: 'YES',
        handler: () => {
            this.navCtrl.setRoot(ManagerHomePage);
        }
      }
    ]
  });
  alert.present();
  }

  presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Loading ...",
    });
    this.loader.present();
  }

}
