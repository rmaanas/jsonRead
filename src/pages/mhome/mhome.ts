import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MhomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mhome',
  templateUrl: 'mhome.html',
})
export class MhomePage {

collectings=null;
	sort: string = "Ascending";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.collectings=this.getCollectings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MhomePage');
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
      "ProjectName": "zxyqwertyghcgvnbmnvmujhbvcdsertyhujhg",
      "Date": "14/07/2014"
    },
    {
      "CustomerName": "KJHNB",
      "ProjectName": "plm",
      "Date": "18/07/2014"
    },
    {
      "CustomerName": "werbn vhhgfchjhbmvgfjhbnn vhjbcvjhkmb ncgg bcjbv ghvjbghcvwr",
      "ProjectName": "trg",
      "Date": "21/07/2014"
    }
  ];
  }

  public CValue:String;
onChange(CValue) {
     console.log(CValue);
}

  itemSelected(item) {
    //this.navCtrl.push(HistoryDetailsPage);
    console.log(item.CustomerName + " is selected");
  }

  SearchHist()
  {
  	console.log("No Data");
  }

}
