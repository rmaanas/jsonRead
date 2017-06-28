import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view-history',
  templateUrl: 'view-history.html',
})
export class ViewHistoryPage {

	collectings=null;
	sort: string = "Ascending";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.collectings=this.getCollectings();
  }

  getCollectings() {
  return [
    {
      "hint": "OPEN",
      "amount": 24
    },
    {
      "hint": "CREDIT CARD",
      "amount": 347
    },
    {
      "hint": "CASH",
      "amount": 256.5
    },
    {
      "hint": "REGE",
      "amount": 123
    }
  ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewHistoryPage');
  }

  public CValue:String;
onChange(CValue) {
     console.log(CValue);
}

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

}
