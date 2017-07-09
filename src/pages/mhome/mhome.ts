import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectpagePage } from '../projectpage/projectpage';
import {ShareService} from '../services/ShareService';
import { Storage } from '@ionic/storage';
import {LoadingController} from 'ionic-angular';

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
  c: any;
  f: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public storage: Storage) {

    this.storage.get("jsonObj").then(value=>{
      this.myjsonObj = value;
      this.username = this.myjsonObj.username;
      console.log('printing from mhome constr. username= ' + this.username);
      this.getCollectings();
    });
  }

	getCollectings()
  {
      //var link = 'http://Sample-env-1.i23yadcngp.us-west-2.elasticbeanstalk.com/testrest/ftoc';
      var link = 'http://localhost:9000/TestRest/testrest/getAllProjects';
      
      var headers = new Headers();
      headers.append("username", this.myjsonObj.username);
      headers.append("accesstoken", this.myjsonObj.accesstoken);
      
      console.log('server call');
      this.presentLoading();
      this.http.get(link, {"headers": headers})
      .subscribe(data => {

        this.jsonObj = JSON.parse(data["_body"]);
        this.collectings = this.jsonObj.projects;
        this.loader.dismiss();
        this.storage.set('projects', this.collectings);
      
      }, error => {
        this.jsonObj = JSON.parse(error["_body"]);
        console.log("ERROR: " + this.jsonObj.error);
      });
  }

  presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Loading Current Visits...",
    });
    this.loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MhomePage');
  }
  
  getLocalCollectings(){
    return this.storage.get("projects").then(value=>{
      this.collectings = value;
    });
  }

  itemSelected(item) {
    this.navCtrl.push(ProjectpagePage, {
     "projectname" : item.projectname,
     "clienthead" : item.clienthead,
     "organisation" : item.organisation 
    });
    console.log(item.PROJECTNAME + " is selected");
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
          console.log(item.PROJECTNAME.toLowerCase() + " is seen");
          return (item.PROJECTNAME.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    );
  }

}
