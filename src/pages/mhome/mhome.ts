import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ProjectpagePage } from '../projectpage/projectpage';
import {ShareService} from '../services/ShareService';
import { Storage } from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import { AddProjectPage } from '../add-project/add-project';
import { AddVisitPage } from '../add-visit/add-visit';
import { VisitpagePage } from '../visitpage/visitpage';

@IonicPage()
@Component({
  selector: 'page-mhome',
  templateUrl: 'mhome.html',
})
export class MhomePage {

  collectings:any = null;
  loader:any;
  username: any;
  myjsonObj: any;
  jsonObj: any;
  date:any = new Date();
  day:any = ('0' + this.date.getDate()).slice(-2);
  month:any = ('0' + (this.date.getMonth() + 1)).slice(-2);
  year:any = this.date.getFullYear();
  currDate: any = this.year + '-' + this.month + '-' + this.day;

  constructor(public navCtrl: NavController,public angularevents: Events, public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public storage: Storage) {

    this.storage.get("jsonObj").then(value=>{
      this.myjsonObj = value;
      this.username = this.myjsonObj.username;
      console.log('printing from mhome constr. username= ' + this.username);
      this.storage.set('currDate' , this.currDate);
      this.getCollectings();
    });

    this.angularevents.subscribe('reloadManagerHomePage',() => {  this.getCollectings();});
  }

	getCollectings()
  {
      //var link = 'http://Sample-env-1.i23yadcngp.us-west-2.elasticbeanstalk.com/testrest/ftoc';
      var link = 'http://testrest-env-cvm.us-west-2.elasticbeanstalk.com/testrest/getCurrentVisits';
      //var link = 'http://localhost:9000/TestRest/testrest/getCurrentVisits';
      var data = JSON.stringify({currdate: this.currDate});
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("username", this.myjsonObj.username);
      headers.append("accesstoken", this.myjsonObj.accesstoken);
      
      console.log('server call');
      this.presentLoading();
      this.http.post(link,data, {"headers": headers})
      .subscribe(data => {

        this.jsonObj = JSON.parse(data["_body"]);
        this.collectings = this.jsonObj.visits;
        this.loader.dismiss();
        this.storage.set("visits", this.collectings);
      
      }, error => {
        this.jsonObj = JSON.parse(error["_body"]);
        console.log("ERROR: " + this.jsonObj.error);
      });
  }

  doRefresh(refresher:any)
  {
      //var link = 'http://Sample-env-1.i23yadcngp.us-west-2.elasticbeanstalk.com/testrest/ftoc';
      var link = 'http://testrest-env-cvm.us-west-2.elasticbeanstalk.com/testrest/getCurrentVisits';
      //var link = 'http://localhost:9000/TestRest/testrest/getCurrentVisits';
      var data = JSON.stringify({currdate: this.currDate});
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("username", this.myjsonObj.username);
      headers.append("accesstoken", this.myjsonObj.accesstoken);
      
      console.log('server call');
      
      this.http.post(link,data, {"headers": headers})
      .subscribe(data => {

        this.jsonObj = JSON.parse(data["_body"]);
        this.collectings = this.jsonObj.visits;
        refresher.complete();
        this.storage.set("visits", this.collectings);
      
      }, error => {
        this.jsonObj = JSON.parse(error["_body"]);
        refresher.complete();
        console.log("ERROR: " + this.jsonObj.error);
      });
  }

  presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Loading Current Visits...",
    });
    this.loader.present();
  }

  goToAddVisit(){
    this.navCtrl.push(AddVisitPage);
  }

  getLocalCollectings(){
    return this.storage.get("visits").then(value=>{
      this.collectings = value;
    });
  }

  itemSelected(item) {
    this.storage.set("currVisit", item);
    this.navCtrl.push(VisitpagePage, {currVisit: item});
    //console.log(item.NAME + " is selected");
  }


  getItems(ev) {
    // Reset items back to all of the items
    //this.collectings=this.getCollectings();
    return this.getLocalCollectings().then(value=>{   
      //this.collectings = value;
      var val = ev.target.value;
      console.log(val.toLowerCase());
      if (val && val.trim() != '') {
        this.collectings = this.collectings.filter((item) => {
          console.log(item.NAME.toLowerCase() + " is seen");
          return (item.NAME.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    );
  }

}
