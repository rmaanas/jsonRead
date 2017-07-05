import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the AddEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-edit',
  templateUrl: 'add-edit.html',
})
export class AddEditPage {
  
 
 item:any ;
 data : any ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.item = navParams.get('item');
      this.data = navParams.get('item1');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditPage');
  }

}
