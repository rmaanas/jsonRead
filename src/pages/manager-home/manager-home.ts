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
import { ChecklistPage } from '../checklist/checklist';

@Component({
  selector: 'page-manager-home',
  templateUrl: 'manager-home.html',
  /*queries: {
    nav: new ViewChild('content')
  }*/
})
export class ManagerHomePage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = MhomePage;
  username: any;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,app: App,public menu: MenuController) {
  	menu.enable(true);
      this.pages = [
      { title: 'Manager Home', component: MhomePage },
      { title: 'Projects', component: ProjectsPage },
      { title: 'View History', component: ViewHistoryPage },
      { title: 'Add User', component: AddRolePage },
      { title: 'Checklist', component :ChecklistPage}
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
