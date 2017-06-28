import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App, MenuController } from 'ionic-angular';
import { ViewHistoryPage } from '../view-history/view-history';
import { AddCustomerPage } from '../add-customer/add-customer';

/**
 * Generated class for the ManagerHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-manager-home',
  templateUrl: 'manager-home.html',
})
export class ManagerHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,app: App, menu: MenuController) {
  	//menu.enable(true);
  	this.navCtrl=navCtrl;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerHomePage');
  }

  openPage(page: string) {
  console.log(page);
    this.navCtrl.push(ViewHistoryPage);
  }

}
