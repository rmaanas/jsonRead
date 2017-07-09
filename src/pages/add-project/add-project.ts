import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'add-project-page',
  templateUrl: 'add-project.html',
})
export class AddProjectPage {

	addProjectForm : FormGroup;
	error_mssg : any = null;
  public username : any;
	public accesstoken : any;
  projectid : any;

  constructor(public storage : Storage,public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http : Http) {
    	this.addProjectForm = formBuilder.group({
        'projectname': [null,Validators.compose([Validators.required,Validators.maxLength(50)])],
        'clienthead': [null,Validators.compose([Validators.required, Validators.maxLength(50)])],
        'organisation': [null,Validators.compose([Validators.required, Validators.maxLength(50)])],
    	});
  	}

    createproject(value : any){
       this.storage.get('jsonObj').then((val) => {
         this.username = val.username;
         this.accesstoken = val.accesstoken;
         this.addproject(value);
      });
    }

  	addproject(value : any){
  		let projectname : any = value.projectname;
  		let organisation: any = value.organisation;
  		let clienthead: any = value.clienthead;

  		let jsonObj : any;
  		let status: String;

  		let link : any = "http://localhost:9000/TestRest/testrest/addProject";
  		
  		var data = JSON.stringify(
  		{
  			projectname: value.projectname, 
  			organisation: value.organisation, 
  			clienthead : value.clienthead
  		});
  	
  		console.log(data);
	    
      var headers = new Headers();
	    headers.append("Content-Type", "application/json");
	    headers.append("username",this.username);
	    headers.append("accesstoken",this.accesstoken);

      this.http.post(link, data, {headers: headers})
	  	.subscribe(data => {
	    	value.response = data["_body"];
	      jsonObj = JSON.parse(data["_body"]);
	      
        status = (jsonObj.status).substring(0,8);
        this.projectid = (jsonObj.status).substring(8);

	     	if(status == "inserted")
	    	{
		        this.navCtrl.setRoot(ProjectpagePage, {
              projectname : value.projectname, 
              clienthead : value.clienthead,
              organisation : value.organisation
            });		
	    	}
	    	else{
	       	this.error_mssg = "* This project Name exists already! Please try again with different name!";
        }
	    },error => {
        this.error_mssg = "There was some problem! Please try again!";
        this.navCtrl.setRoot(HomePage,this.error_mssg);
	    });
  	}

  	goBack(){
  		this.navCtrl.popToRoot();
  	}
}
