import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddEditPage } from '../add-edit/add-edit';


/**
 * Generated class for the Visit2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-visit2',
  templateUrl: 'visit2.html',
})
export class Visit2Page {
 
 collectings : any ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
       this.collectings=this.getCollectings();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Visit2Page');
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
  ]
  }


  itemSelected(item1) {
    this.navCtrl.push(AddEditPage,{
    item : 'Edit',
    item1 : item1
    });
    console.log(item1.Event + " is selected");
  }

  fab()
  {
    this.navCtrl.push(AddEditPage,{
    item:'Add',
    item1:{
    "Event"     : "",
      "Start"     : "",
      "End"       : "",
      "Date"      : "",
      "Owner"     : "",
      "Venue"     : ""
    }
    });
    console.log("has reached");
  }

}
