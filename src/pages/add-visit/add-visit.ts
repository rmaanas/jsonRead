import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';

@IonicPage()
@Component({
  selector: 'page-add-visit',
  templateUrl: 'add-visit.html',
})
export class AddVisitPage {

   visit = { }
   members = [ 'member1','member2' ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //menu.enable(true);
  }

  goToHome(){
    this.navCtrl.setRoot(ManagerHomePage)
    this.navCtrl.popToRoot();
  }

  addevent()
  {
    console.log("ADD EVENT FUNCTION CALLED");
  }

  createvisit()
  {
  	console.log("ADD VISIT FUNDCTION");
    this.navCtrl.push(ProjectpagePage, {visit:this.visit});
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
