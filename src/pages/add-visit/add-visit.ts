import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
//import { Observable } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-add-visit',
  templateUrl: 'add-visit.html',
})
export class AddVisitPage {


  submitAttempt: boolean = false;
  public visit : any;
  allprojects :any;
  public data :any;
  addVisitForm : FormGroup;
  public http : Http;
  public jsonObj : any;
  public status : any;
  currdate : Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    
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
      
      this.addVisitForm = formBuilder.group({
        project: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        venue: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        date: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])]
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
   save(){
 
    
 
    if(!this.addVisitForm.valid){
        this.submitAttempt = true;

        console.log("Invalid");
    } 
    
    else {
        console.log("success!")
        console.log(this.addVisitForm.value);
    }
 
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
