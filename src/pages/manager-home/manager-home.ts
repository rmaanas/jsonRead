import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { App, MenuController } from 'ionic-angular';
import {ViewHistoryPage} from '../view-history/view-history';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MhomePage } from '../mhome/mhome';
/**
 * Generated class for the ManagerHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 
@Component({
  selector: 'page-manager-home',
  templateUrl: 'manager-home.html',
  /*queries: {
    nav: new ViewChild('content')
  }*/
})
export class ManagerHomePage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = ViewHistoryPage;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,app: App,public menu: MenuController) {
    menu.enable(true);
      this.pages = [
      { title: 'View History', component: ViewHistoryPage },
      { title: 'Manager Home', component: MhomePage }
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
