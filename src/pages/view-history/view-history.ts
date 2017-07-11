import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { HistoryDetailsPage } from '../history-details/history-details';
import {ShareService} from '../services/ShareService';
import { Storage } from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import {Http, Headers} from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-view-history',
  templateUrl: 'view-history.html',
})
export class ViewHistoryPage {

  showList: boolean = false;
	collectings: any = null;
  loader:any;
  username: any;
  myjsonObj: any;
  shjsonObj: any;
  jsonObj: any;
	sort: string = "Ascending";
  cname: any = "";
  pname: any = "";
  fdate:any = "";
  tdate:any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public storage: Storage) {
  this.storage.get("jsonObj").then(value=>{
      this.myjsonObj = value;
      this.username = this.myjsonObj.username;
      console.log('printing from viewhistory constr. username= ' + this.username);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewHistoryPage');
  }

  public CValue:String;
onChange(CValue) {
     console.log(CValue);
}

presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Loading Current Visits...",
    });
    this.loader.present();
  }

  getLocalCollectings(){
    return this.storage.get("projects").then(value=>{
      this.collectings = value;
    });
  }

  itemSelected(item) {
    
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
        this.showList = true;
      }
    }
    );
  }


  searchhistory() {

    console.log(this.fdate);
    var link = 'http://localhost:9000/TestRest/testrest/searchhistory';
    var data = JSON.stringify({cname: this.cname, pname: this.pname, fdate: this.fdate, tdate: this.tdate});
    
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("username", this.myjsonObj.username);
    headers.append("accesstoken", this.myjsonObj.accesstoken);

     this.http.post(link, data, {headers: headers})
    .subscribe(data => {
      //value.response = data["_body"];
      this.jsonObj = JSON.parse(data["_body"]);


      console.log(this.jsonObj.organisation);

      },error => {
        console.log("Error!");
    });
  }

}
