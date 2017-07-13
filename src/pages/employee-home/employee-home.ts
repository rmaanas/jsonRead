import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { App, MenuController } from 'ionic-angular';
import {AddVisitPage} from '../add-visit/add-visit';
import {ProjectsPage} from '../projects/projects';
import { AddRolePage } from '../add-role/add-role';
import {UpdateVisitPage} from '../update-visit/update-visit';
import {MhomePage} from '../mhome/mhome';
import {ViewHistoryPage} from '../view-history/view-history';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { EmployeeAllProjectsPage } from '../employee-all-projects/employee-all-projects';
import { EmployeeMyProjectsPage } from '../employee-my-projects/employee-my-projects';
import { EmployeeEventsPage } from '../employee-events/employee-events';

@IonicPage()
@Component({
  selector: 'page-employee-home',
  templateUrl: 'employee-home.html',
})
export class EmployeeHomePage {
  tab1Root = EmployeeAllProjectsPage;
  tab2Root = EmployeeMyProjectsPage;

  @ViewChild(Nav) nav: Nav;
  rootPage: any = EmployeeEventsPage;
  username: any;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,app: App,public menu: MenuController) {
  	menu.enable(true);
      this.pages = [
      { title: 'My Events', component: EmployeeEventsPage },
      { title: 'Projects', component: ProjectsPage },
      { title: 'View History', component: ViewHistoryPage },
    ];

  }
  
  openPage(page: any)
  {
	  this.menu.close();
    this.nav.setRoot(page.component);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerHomePage');
  }

}
