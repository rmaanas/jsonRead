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
      "CustomerName": "OPEN",
      "ProjectName": "abc",
      "Date": "12/07/2014"
    },
    {
      "CustomerName": "sdb",
      "ProjectName": "zxy",
      "Date": "14/07/2014"
    },
    {
      "CustomerName": "kjugj",
      "ProjectName": "plm",
      "Date": "18/07/2014"
    },
    {
      "CustomerName": "werwr",
      "ProjectName": "trg",
      "Date": "21/07/2014"
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

  itemSelected(item) {
    console.log("Project Name", item.ProjectName);
  }

  SearchHist()
  {
  	console.log("No Data");
  }

}
