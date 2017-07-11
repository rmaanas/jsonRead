import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddEventPage } from '../add-event/add-event';
//import {Printer, PrintOptions} from 'ionic-native';



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

 /* print(){

        Printer.isAvailable().then(function(){
            Printer.print("https://www.techiediaries.com").then(function(){
            alert("printing done successfully !");
            },function(){
            alert("Error while printing !");
            });
        }, function(){
        alert('Error : printing is unavailable on your device ');
        });

} */

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


  fab()
  {
    this.navCtrl.push(AddEventPage);
    console.log("has reached");
  }

}
