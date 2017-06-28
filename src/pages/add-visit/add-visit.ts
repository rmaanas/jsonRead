import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the AddVisitPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-visit',
  templateUrl: 'add-visit.html',
})
export class AddVisitPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddVisitPage');
  }

}
