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
      "Start"     : "08:00",
      "End"       : "09:00",
      "Date"      : "2017-06-26",
      "Owner"     : "Anil",
      "Venue"     : "Airport"
    },
    {
      "Event"    : "Travel to Hotel",
      "Start"     : "09:00",
      "End"       : "09:15",
      "Date"      : "2017-06-26",
      "Owner"     : "Sunil",
      "Venue"     : "Cab"
    },
    {
      "Event"    : "Meet at Hotel",
      "Start"     : "09:15",
      "End"       : "09:30",
      "Date"      : "2017-06-26",
      "Owner"     : "Ram",
      "Venue"     : "Hotel Taj"
    },
    {
      "Event"     : "Travel to  Atos",
      "Start"    :  "09:31",
      "End"       :  "09:45",
      "Date"      :  "2017-06-26",
      "Owner"     :  "Sunil",
      "Venue"     :  "Cab"
    },
    {
      "Event"     : "Meeting",
      "Start"     :  "10:00",
      "End"       : "12:00",
      "Date"      : "2017-06-26",
      "Owner"     : "Rajesh",
      "Venue"     : "Atos, Pune"
    }
  ]
  }


  itemSelected(item) {
  /*
    var dob: Date = item.Date;
    console.log(dob);
    var newDate=new Date(dob);
    var day=newDate.getDate();
    var month=newDate.getMonth();
    month=month+1;
    var year = newDate.getFullYear();
    if(month<10)
    {
      var mo = "0"+month;
      month=parseInt(mo);
      var da = year + "-" + mo + "-" + day;
    }
    else
    {
      var da = year + "-" + month + "-" + day;
    }
    console.log(mo);
    item.Date=da;
*/
    this.navCtrl.push(AddEditPage,{
    item : 'Edit Event',
    item1 : item
    });
    console.log(item.Event + " is selected");
  }

  fab()
  {

    var item:any ;
    item = {
      "Event"     : "",
      "Start"     :  "00:00",
      "End"       : "00:00",
      "Date"      : "2017-07-28",
      "Owner"     : "",
      "Venue"     : ""
    }
    this.navCtrl.push(AddEditPage,{
    item:'Add An Event',
    item1:item
    });
    console.log("Add has reached");
  }
  

  

}
