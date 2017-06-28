import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeeAllProjectsPage } from '../employee-all-projects/employee-all-projects';
import { EmployeeMyProjectsPage } from '../employee-my-projects/employee-my-projects';

@IonicPage()
@Component({
  selector: 'page-employee-home',
  templateUrl: 'employee-home.html',
})
export class EmployeeHomePage {
  tab1Root = EmployeeAllProjectsPage;
  tab2Root = EmployeeMyProjectsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeHomePage');
  }

}
