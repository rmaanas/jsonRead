import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the History2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-history2',
  templateUrl: 'history2.html',
})
export class History2Page {

  collectings : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
              this.collectings=this.getCollectings();
  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad History2Page');
  }
 getCollectings() {
  return [
    {
      "Event"     : "Pickup the visitor",
      "Start"     : "8:00",
      "End"       : "9:00",
      "Date"      : "29/06/2017",
      "Owner"     : "Anil",
      "Venue"     : "Airport"
    },
    {
      "Event"    : "Travel to Hotel",
      "Start"     : "9:00",
      "End"       : "9:15",
      "Date"      : "29/06/2017",
      "Owner"     : "Sunil",
      "Venue"     : "Cab"
    },
    {
      "Event"    : "Meet at Hotel",
      "Start"     : "9:15",
      "End"       : "9:30",
      "Date"      : "29/06/2017",
      "Owner"     : "Ram",
      "Venue"     : "Hotel Taj"
    },
    {
      "Event"     : "Travel to  Atos",
      "Start "    :  "9:30",
      "End"       :  "9:45",
      "Date"      :  "29/06/2017",
      "Owner"     :  "Sunil",
      "Venue"     :  "Cab"
    },
    {
      "Event"     : "Meeting",
      "Start"     :  "10:00",
      "End"       : "12:00",
      "Date"      : "29/06/2017",
      "Owner"     : "Rajesh",
      "Venue"     : "Atos, Pune"
    }
  ] ;
  }


 

}


