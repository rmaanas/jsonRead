import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
//import { Observable } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-add-visit',
  templateUrl: 'add-visit.html',
})
export class AddVisitPage {

  visit : any;
  data :any;
  addVisitForm : FormGroup;
  allprojects : any = null;
  myjsonObj: any;
  jsonObj : any;
  status : any;
  currdate : Date;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public http:Http,public formBuilder: FormBuilder) {
    
    /*
    this.getjsonObj().then(value=>{
      this.getProjects().then(val=>{    
      }
      );
    }
    );
    */
    this.getjsonObj();
    this.getProjects();
    this.addVisitForm = formBuilder.group({
    'projectname': [null,Validators.compose([Validators.required,Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*')])],
    'clienthead': [null,Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
    'organisation': [null,Validators.compose([Validators.required, Validators.maxLength(30)])],
    'customeremail': [null,Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-z]*')])],
    'visitdate': [null,Validators.compose([Validators.required])]
    });


  }
  
  getjsonObj()
  {
    return this.storage.get("jsonObj").then(value => {
          this.myjsonObj = value;
    });
  }

  getProjects()
  {
    return this.storage.get("projects").then(value => {
          this.allprojects = value;
    });
  }

  goToHome(){
    this.navCtrl.setRoot(ManagerHomePage)
    this.navCtrl.popToRoot();
  }

  createvisit(data : any):void{
  	console.log("ADD VISIT FUNDCTION");
     console.log(data);
     /*
    var link = 'http://localhost:9000/TestRest/testrest/addvisit';
    var data = JSON.stringify({ projectname: this.visit.projectname, clienthead: this.visit.clienthead, organisation:this.visit.organisation, customeremail: this.visit.customeremail, duedate:this.visit.duedate });
    
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    this.http.post(link, data, {headers: headers})
    .subscribe(data => {
      this.data.response = data["_body"];
      this.jsonObj = JSON.parse(data["_body"]);
      this.status = this.jsonObj.status;
     
    if(this.status == "true")
    {
      this.navCtrl.setRoot(ManagerHomePage).then(
      ()=>{
        this.navCtrl.popToRoot();
      }
      );
    }}, error => {
    });

    this.navCtrl.push(ProjectpagePage, {visit:this.visit});*/
  }

  addmembers()
  {
  	console.log("ADD MEMBERS");
  }

  editmember()
  {
    console.log("Edit successful");
  }
  
  removemember()
  {
    console.log("Removal successful");
  }

}
