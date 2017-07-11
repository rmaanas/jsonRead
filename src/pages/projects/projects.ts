import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectpagePage } from '../projectpage/projectpage';
import {ShareService} from '../services/ShareService';
import { Storage } from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import { AddProjectPage } from '../add-project/add-project';
import { AddPage } from '../add/add';
import { EditProjectPage } from '../edit-project/edit-project';

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {

  collectings:any = null;
  loader:any;
  username: any;
  myjsonObj: any;
  jsonObj: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public storage: Storage) {

    this.storage.get("jsonObj").then(value=>{
      this.myjsonObj = value;
      this.username = this.myjsonObj.username;
      console.log('printing from projects page constr. username= ' + this.username);
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
      content: "Loading All Projects...",
    });
    this.loader.present();
  }

  goToAddProject(){
    this.navCtrl.push(AddPage);
  }

  getLocalCollectings(){
    return this.storage.get("projects").then(value=>{
      this.collectings = value;
    });
  }

  itemSelected(item) {
    console.log(item.NAME + " is selected");
    this.storage.set("currProj", item);
    this.navCtrl.push(EditProjectPage, {currProject: item});
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
          //console.log(item.PROJECTNAME.toLowerCase() + " is seen");
          return (item.NAME.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    );
  }

}
