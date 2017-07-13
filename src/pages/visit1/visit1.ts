import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Nav, Navbar } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {Events} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-visit1',
  templateUrl: 'visit1.html',
})
export class Visit1Page {
  @ViewChild(Navbar) navBar:Navbar;
  
  loader:any;
  username: any;
  myjsonObj: any;
  jsonObj: any;
  submitAttempt: boolean = false;
  visit : any;
  allprojects :any;
  addVisitForm : FormGroup;
  status : any;
  currdate : Date;
  projectname:any = '';
  clienthead:any = '';
  organisation:any = '';
  clientemail:any = '';
  currVisit: any;
  date:any = new Date();
  day:any = ('0' + this.date.getDate()).slice(-2);
  month:any = ('0' + (this.date.getMonth() + 1)).slice(-2);
  year:any = this.date.getFullYear();
  currDate: any = this.year + '-' + this.month + '-' + this.day;
  currTime:any = this.date.getTime();
  hours:any;
  minutes:any;
  errormessage:any =  null;


  constructor(public nav: Nav,public angularevents: Events,public navCtrl: NavController,public http : Http,public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public storage: Storage, public alertCtrl: AlertController) {
        this.addVisitForm = formBuilder.group({
        venue: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
        date: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
    });
    this.presentLoading();
    this.getData();
  }

  getData()
  {
      return this.storage.get("currVisit").then(value=>{
        this.currVisit = value;
        this.projectname = this.currVisit.NAME;
        this.clienthead = this.currVisit.CLIENTHEAD;
        this.organisation = this.currVisit.ORGANISATION;
        this.clientemail = this.currVisit.CLIENTEMAIL;
        //this.addVisitForm.controls['venue'].setValue = this.currVisit.VENUE;
        this.addVisitForm.setValue({venue: this.currVisit.VENUE,date: this.currVisit.VISITDATE});
        this.loader.dismiss();
      });    
  }

  presentLoading() 
  {
      this.loader = this.loadingCtrl.create({
      content: "Loading Visit Details...",
      });
      this.loader.present();
  }


  createvisit(value : any){
  	//console.log("ADD VISIT FUNDCTION");
    //console.log(data);

    var link = 'http://localhost:9000/TestRest/testrest/editVisit';
    var data = JSON.stringify(
      { 
        visitid: this.currVisit.VISITID, 
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
     
    if(this.status == "updated")
    {
      this.presentConfirm(value);
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

  presentConfirm(value:any) 
		{
			let alert = this.alertCtrl.create({
				title: 'Visit updated Successfully',
				message: 'Visit Venue: ' + value.venue + ' and Visit Date: ' + value.date + ' ' ,
				buttons: [
					{
						text: 'OK',
						handler: () => {
							console.log('OK clicked');
              this.angularevents.publish('reloadManagerHomePage');
              this.navCtrl.parent.viewCtrl.dismiss();
						}
					}
				]
			});
			alert.present();
		}


   save(){
 
    if(!this.addVisitForm.valid){
        this.submitAttempt = true;

        console.log("Invalid");
    } 
    
    else 
    {
        console.log(this.addVisitForm.value);
        if(this.addVisitForm.value.date < this.currDate)
        {
            this.errormessage = "Date has to be greater than or equal to visit date";
        }
        else
        {
          this.storage.get("jsonObj").then(value=>{
              this.myjsonObj = value;
              this.createvisit(this.addVisitForm.value);
          });
        }

    }
 
}

  goBack()
  {
    this.navCtrl.parent.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Visit1Page');
    this.navBar.backButtonClick = (e:UIEvent) => {
        console.log("Back button clicked");
        this.navCtrl.parent.viewCtrl.dismiss();
    };
  }

  getCurrDate()
  {
        this.date = new Date();
        this.day = ('0' + this.date.getDate()).slice(-2);
        this.month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        this.year = this.date.getFullYear();
        this.currDate = this.year + '-' + this.month + '-' + this.day;
        this.hours = ('0' + this.date.getHours()).slice(-2);
        this.minutes = ('0' + this.date.getMinutes()).slice(-2);
        this.currTime = this.hours + ":" + this.minutes;
        //console.log(" getCurr: current date is " + this.currDate + " and time is " + this.currTime);    
  }

}
