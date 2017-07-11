import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
//import { Observable } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {


  submitAttempt: boolean = false;
  public visit : any;
  allprojects :any;
  public data :any;
  addEventForm : FormGroup;
  public http : Http;
  public jsonObj : any;
  public status : any;
  currdate : Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    
      this.allprojects = [
     {
        name: "Rahul",
        projectid: 1,
        organisation: "org1"
     },
     {
        name: "Ravinddfvdfvdfvfdvdfvra",
        projectid: 2,
        organisation: "org2"
     }
     ];
      
      this.addEventForm = formBuilder.group({
        name:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        owner: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        venue: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        date1:  ['', Validators.compose([Validators.required])],
        time1: ['', Validators.compose([Validators.required])],
        time2: ['', Validators.compose([Validators.required])]

    });
  }

  save(){
 
    
 
    if(!this.addEventForm.valid){

        this.submitAttempt = true;
        console.log("Invalid533");
    } 
    else 
    {

                this.submitAttempt = false;
        console.log("success!")
        console.log(this.addEventForm.value);
    }
 
}
}
