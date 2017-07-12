import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectpagePage } from '../projectpage/projectpage';

@IonicPage()
@Component({
  selector: 'page-employee-my-projects',
  templateUrl: 'employee-my-projects.html',
})
export class EmployeeMyProjectsPage {
  collectings=null;
  myjsonObj : any;
  username : string;
  currdate : any;
  constructor(public storage : Storage,public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get("jsonObj").then(value=>{
      this.myjsonObj = value;
      this.username = this.myjsonObj.username;
      console.log('printing from mhome constr. username= ' + this.username);
      this.getCollectings();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MhomePage');
  }
  getCollectings() {
  


  }

  itemSelected(item) {
    this.navCtrl.push(ProjectpagePage);
    console.log(item.ProjectName + " is selected");
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.collectings=this.getCollectings();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.collectings = this.collectings.filter((item) => {
        return (item.ProjectName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

}
}