import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectpagePage } from '../projectpage/projectpage';
import {ShareService} from '../services/ShareService';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-mhome',
  templateUrl: 'mhome.html',
})
export class MhomePage {

  collectings=null;
  username: any;
  myjsonObj: any;
  jsonObj: any;
  c: any;
  f: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private shareService: ShareService, public storage: Storage) {
    this.collectings=this.getCollectings();
    this.storage.get("jsonObj").then(value=>{
      this.myjsonObj = value;
      this.username = this.myjsonObj.username;
      console.log('printing from ' + this.username);
      this.loadcf();
    });
  }

	loadcf()
  {

      //var link = 'http://Sample-env-1.i23yadcngp.us-west-2.elasticbeanstalk.com/testrest/ftoc';
      var link = 'http://localhost:9000/TestRest/testrest/ftoc/-40';
      var headers = new Headers();
      //headers.append("Content-Type", "application/json");
      //headers.append("authorization", "admin eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZG1pbiIsImlzcyI6IkFUT1NfQ1ZNIn0.3j0w8o0ig-ngpF8OK1ls87yCbfoMJvML_rEQsOsE79Y");
      //headers.append("username", "admin");
      //headers.append("accesstoken", "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZG1pbiIsImlzcyI6IkFUT1NfQ1ZNIn0.3j0w8o0ig-ngpF8OK1ls87yCbfoMJvML_rEQsOsE79Y");
      //var data = JSON.stringify({f: "98.4"});
      headers.append("username", this.myjsonObj.username);
      headers.append("accesstoken", this.myjsonObj.accesstoken);
      
      this.http.get(link, {"headers": headers})
      .subscribe(data => {
        this.jsonObj = JSON.parse(data["_body"]);
        this.c = this.jsonObj.c;
      this.f = this.jsonObj.f;
    }, error => {
        this.jsonObj = JSON.parse(error["_body"]);
        console.log("ERROR: " + this.jsonObj.error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MhomePage');
  }
  getCollectings() {
  return [
    {
      "CustomerName": "Customer 1",
      "ProjectName": "Project 1",
      "Date": "12/07/2017"
    },
    {
      "CustomerName": "Customer 2",
      "ProjectName": "Customer Visit Management",
      "Date": "14/07/2017"
    },
    {
      "CustomerName": "Customer 3",
      "ProjectName": "App Devlopment",
      "Date": "18/07/2017"
    },
    {
      "CustomerName": "Customer 4",
      "ProjectName": "Project 4",
      "Date": "21/07/2017"
    }
  ];
  }

  itemSelected(item) {
    this.navCtrl.push(ProjectpagePage);
    console.log(item.ProjectName + " is selected");
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.collectings=this.getCollectings();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.collectings = this.collectings.filter((item) => {
        return (item.ProjectName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
