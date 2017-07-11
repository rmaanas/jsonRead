import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Navbar } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import {AddEditPage } from '../add-edit/add-edit';
import {AddEventPage } from '../add-event/add-event';


@IonicPage()
@Component({
  selector: 'page-visit2',
  templateUrl: 'visit2.html',
})
export class Visit2Page {
 @ViewChild(Navbar) navBar:Navbar;

  collectings:any = [];
  loader:any;
  username: any;
  myjsonObj: any;
  currVisit: any;
  jsonObj: any;
  submitAttempt: boolean = false;
  visit : any;
  allprojects :any;
  addVisitForm : FormGroup;
  status : any;
  currdate : Date;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public storage: Storage) {

    this.presentLoading();
    this.storage.get("currVisit").then(value=>{
        this.currVisit = value;
        this.storage.get("jsonObj").then(val=>{
          this.myjsonObj = val;
          this.getCollectings();
        });
      });  
  }


	getCollectings()
  {
      //var link = 'http://Sample-env-1.i23yadcngp.us-west-2.elasticbeanstalk.com/testrest/ftoc';
      var link = 'http://localhost:9000/TestRest/testrest/getEvents';
      
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("username", this.myjsonObj.username);
        headers.append("accesstoken", this.myjsonObj.accesstoken);
        var data = JSON.stringify(
        { 
          visitid: this.currVisit.VISITID
        });
            
        console.log('server call');
        this.http.post(link,data, {"headers": headers})
        .subscribe(data => {

          this.jsonObj = JSON.parse(data["_body"]);
          this.collectings = this.jsonObj.events;
          this.loader.dismiss();
          this.storage.set('events', this.collectings);
        }, error => {
          this.jsonObj = JSON.parse(error["_body"]);
          console.log("ERROR: " + this.jsonObj.error);
        });
  }

  presentLoading() 
  {
      this.loader = this.loadingCtrl.create({
      content: "Loading Events...",
      });
      this.loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Visit2Page');
    this.navBar.backButtonClick = (e:UIEvent) => {
        console.log("Back button clicked");
        this.navCtrl.parent.viewCtrl.dismiss();
    };
  }

  itemSelected(item1) {
    this.navCtrl.push(AddEditPage,{
    item : 'Edit',
    item1 : item1
    });
    console.log(item1.NAME + " is selected");
  }

  fab()
  {
    this.navCtrl.push(AddEventPage);
  }

}
