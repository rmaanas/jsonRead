import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddEditPage } from '../add-edit/add-edit';

@IonicPage()
@Component({
  selector: 'page-projectpage',
  templateUrl: 'projectpage.html',
})
export class ProjectpagePage{

collectings=null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.collectings=this.getCollectings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MhomePage');
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


  itemSelected(item,item1) {
    this.navCtrl.push(AddEditPage,{
    item : 'Edit',
    item1 : item1
    });
    console.log(item.Event + " is selected");
  }

  fab(item)
  {
    this.navCtrl.push(AddEditPage,{
    item:'Add',
    item1:null
    });
    console.log(item+"has reached");
  }
  

  

}
