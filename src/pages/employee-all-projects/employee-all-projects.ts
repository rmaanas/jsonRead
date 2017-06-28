import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-employee-all-projects',
  templateUrl: 'employee-all-projects.html',
})
export class EmployeeAllProjectsPage {
  collectings=null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.collectings=this.getCollectings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MhomePage');
  }
  getCollectings() {
  return [
    {
      "CustomerName": "Customer 1",
      "ProjectName": "Project 1",
      "Date": "12/07/2017"
    },
    {
      "CustomerName": "Customer 2",
      "ProjectName": "Customer Visit Management",
      "Date": "14/07/2017"
    },
    {
      "CustomerName": "Customer 3",
      "ProjectName": "App Devlopment",
      "Date": "18/07/2017"
    },
    {
      "CustomerName": "Customer 4",
      "ProjectName": "Project 4",
      "Date": "21/07/2017"
    }
  ];
  }

  itemSelected(item) {
    //this.navCtrl.push(HistoryDetailsPage);
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
