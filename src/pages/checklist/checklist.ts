import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import {LoadingController, AlertController } from 'ionic-angular';
import {CreateeventPage} from '../createevent/createevent';
import { ManagerHomePage } from '../manager-home/manager-home';
import { EditChecklistEventPage } from '../edit-checklist-event/edit-checklist-event';

@IonicPage()
@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html',
})
export class ChecklistPage {

	myjsonObj : any;
	username : string;
	accesstoken:string;
	collectings : any;
	jsonObj : any;
	loader : any;
	imglink :string = "../assets/icon/edit.png";
  count : any;
  reload : any;
  item : any;

  constructor(public http : Http, public alertCtrl: AlertController,public navCtrl: NavController,public loadingCtrl: LoadingController, public storage: Storage, public navParams: NavParams) {
  	this.storage.get("jsonObj").then(value=>{
	    this.myjsonObj = value;
	    this.getchecklist();
	  });
  }

  getchecklist(){
  	  var link = 'http://localhost:9000/TestRest/testrest/getchecklist';
      
      var headers = new Headers();
      headers.append("username", this.myjsonObj.username);
      headers.append("accesstoken", this.myjsonObj.accesstoken);
      
      this.presentLoading();
      
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

  presentConfirm(item : any) {
    let alert = this.alertCtrl.create({
      title: 'Delete Event',
      message: 'Do you want to delete the event from checklist?',
      buttons: [
        {
          text: 'CANCEL',
          handler: () => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'DELETE',
          role: 'DELETE',
          handler: () => {
              this.deleteitem(item);
          }
        }
      ]
    });
    alert.present();
  }

  deleteitem(item){
    var link = 'http://localhost:9000/TestRest/testrest/deletefromchecklist';
      
      var headers = new Headers();
      headers.append("username", this.myjsonObj.username);
      headers.append("accesstoken", this.myjsonObj.accesstoken);
      this.presentLoading();
      this.http.post(link, { "eventname" : item.name },{"headers": headers})
      .subscribe(data => {

        this.jsonObj = JSON.parse(data["_body"]);
        let status = this.jsonObj.status;
        this.loader.dismiss();
        if(status == "deleted")
        {
          this.navCtrl.setRoot(ChecklistPage);
        }
      }, error => {
        this.navCtrl.setRoot(ManagerHomePage);
      });
  }

  editevent(data:any)
  {
    this.navCtrl.push(EditChecklistEventPage,{"currevent" : data});
  }

  presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Loading ...",
    });
    this.loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChecklistPage');
  }

  goBack(){
    this.navCtrl.setRoot(ManagerHomePage);
  }

  addevent(){
  	this.navCtrl.push(CreateeventPage);
  }

}
