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
      "CustomerName": "GFdsksdbj",
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

  getItems(ev) {
    // Reset items back to all of the items
    this.collectings=this.getCollectings();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.collectings = this.collectings.filter((item) => {
        return (item.CustomerName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
