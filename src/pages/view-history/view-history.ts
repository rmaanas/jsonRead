import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { HistoryDetailsPage } from '../history-details/history-details';


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
      "CustomerName": "Customer 1",
      "ProjectName": "Project 1",
      "Date": "12/07/2014"
    },
    {
      "CustomerName": "Customer 2",
      "ProjectName": "Project 2",
      "Date": "14/07/2014"
    },
    {
      "CustomerName": "Customer 3",
      "ProjectName": "Project 3",
      "Date": "18/07/2014"
    },
    {
      "CustomerName": "Customer 4",
      "ProjectName": "Project 4",
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
    //this.navCtrl.push(HistoryDetailsPage);
  }

  SearchHist()
  {
  	console.log("No Data");
  }

}
