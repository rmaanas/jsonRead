import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
//import { Observable } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-add-visit',
  templateUrl: 'add-visit.html',
})
export class AddVisitPage {

  collectings:any = null;
  loader:any;
  username: any;
  myjsonObj: any;
  jsonObj: any;
  submitAttempt: boolean = false;
  public visit : any;
  allprojects :any;
  addVisitForm : FormGroup;
  public status : any;
  currdate : Date;
  
  constructor(public navCtrl: NavController,public http : Http,public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public storage: Storage) {
    
      this.allprojects = [
     {
        name: "project1",
        projectid: 1,
        organisation: "org1"
     },
     {
        name: "project13",
        projectid: 2,
        organisation: "org2"
     }
     ];

      this.storage.get("jsonObj").then(value=>{
        this.myjsonObj = value;
        this.username = this.myjsonObj.username;
        console.log('printing from add-visit page constr. username= ' + this.username);
        this.getCollectings();
      });

      this.addVisitForm = formBuilder.group({
        project: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        venue: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        date: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
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
        this.allprojects = this.jsonObj.projects;
        this.loader.dismiss();
        this.storage.set('projects', this.allprojects);
      
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

  goToHome(){
    this.navCtrl.setRoot(ManagerHomePage)
    this.navCtrl.popToRoot();
  }

  createvisit(value : any){
  	//console.log("ADD VISIT FUNDCTION");
    //console.log(data);

    var link = 'http://localhost:9000/TestRest/testrest/addVisit';
    var data = JSON.stringify(
      { 
        projectid: value.project, 
        visitdate: value.date, 
        venue: value.venue, 
      });
    
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
  	headers.append("username",this.myjsonObj.username);
	  headers.append("accesstoken",this.myjsonObj.accesstoken);
    
    this.http.post(link, data, {headers: headers})
    .subscribe(data => {

      this.jsonObj = JSON.parse(data["_body"]);
      this.status = this.jsonObj.status;
     
    if(this.status == "inserted")
    {
      this.navCtrl.setRoot(ManagerHomePage).then(
      ()=>{
        this.navCtrl.popToRoot();
      }
      );
    }
    else
    {

    }
  }, error => {
    });

    /*
    this.navCtrl.push(ProjectpagePage, {visit:this.visit});
    */
  }

   save(){
 
    this.submitAttempt = true;
 
    if(!this.addVisitForm.valid){
        this.submitAttempt = true;

        console.log("Invalid");
    } 
    
    else {
        console.log("success!")
        this.createvisit(this.addVisitForm.value);
    }
 
}

  	goBack(){
  		this.navCtrl.popToRoot();
  	}

}
