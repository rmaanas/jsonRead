import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from  '../add/emailValid';
import { Storage } from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ProjectsPage} from '../projects/projects';

@IonicPage()
@Component({
  selector: 'page-edit-project',
  templateUrl: 'edit-project.html',
})
export class EditProjectPage {
    username: any;
    accesstoken: any;
    error_mssg: any = null;
    editProjectForm: FormGroup;
    submitAttempt: boolean = false;
    currProject: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,public http: Http, public storage: Storage, public alertCtrl: AlertController) {
       //this.getAccessCredentials();
       //this.getProject();
       this.currProject = this.navParams.get("currProject");
       this.editProjectForm = formBuilder.group({
        name: [this.currProject.NAME, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        clientName: [this.currProject.CLIENTHEAD, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        organization: [this.currProject.ORGANISATION, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        email: [this.currProject.CLIENTEMAIL, EmailValidator.isValid]
    });
  }

  getAccessCredentials(){
    return this.storage.get("jsonObj").then(value=>{
      this.username = value.username;
      this.accesstoken = value.accesstoken;
    });
  }
  getProject(){
    return this.storage.get("currProject").then(value=>{
      this.currProject = value;
    });
  }

    createproject(value : any){
       this.storage.get('jsonObj').then((val) => {
         this.username = val.username;
         this.accesstoken = val.accesstoken;
         this.editproject(value);
      });
    }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad AddPage');
  }

  save()
  {

    if(!this.editProjectForm.valid){
            this.submitAttempt = true;
        console.log("Invalid");
    } 
    
    else {
        this.createproject(this.editProjectForm.value);
        console.log("success!")
        //console.log(this.slideOneForm.value);
    }
 
  }

    	editproject(value : any){
  		let name : any = value.name;
  		let organisation: any = value.organization;
  		let clienthead: any = value.clientName;
      let clientemail: any = value.email;

  		let jsonObj : any;
  		let status: String;

  		let link : any = "http://localhost:9000/TestRest/testrest/editProject";
  		
  		var data = JSON.stringify(
  		{
  			name: value.name, 
  			organisation: value.organization, 
  			clienthead : value.clientName,
        clientemail: value.email,
        manager: this.username,
        projectid: this.currProject.PROJECTID
  		});
  	
  		//console.log(data);
	    
      var headers = new Headers();
	    headers.append("Content-Type", "application/json");
	    headers.append("username",this.username);
	    headers.append("accesstoken",this.accesstoken);

      this.http.post(link, data, {headers: headers})
	  	.subscribe(data => {
	    	value.response = data["_body"];
	      jsonObj = JSON.parse(data["_body"]);
	      
        status = jsonObj.status;

	     	if(status == "updated")
	    	{
		        this.presentConfirm(value);		
	    	}
	    	else{
	       	this.error_mssg = "* This project Name exists already! Please try again with different name!";
        }
	    },error => {
        this.error_mssg = "There was some problem! Please try again!";
        this.navCtrl.setRoot(HomePage,this.error_mssg);
	    });
  	}

		presentConfirm(value:any) 
		{
			let alert = this.alertCtrl.create({
				title: 'Project updated Successfully!',
				message: 'Project: ' + value.name + ' with Client Head: ' + value.clientName + ' and Organisation: ' + value.organization + ' has been updated successfully',
				buttons: [
					{
						text: 'OK',
						handler: () => {
							console.log('OK clicked');
							this.navCtrl.setRoot(ProjectsPage);
						}
					}
				]
			});
			alert.present();
		}

  	goBack(){
  		this.navCtrl.popToRoot();
  	}
}