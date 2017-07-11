import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Visit1Page } from '../visit1/visit1';
import { Visit2Page } from '../visit2/visit2';

/**
 * Generated class for the VisitpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-visitpage',
  templateUrl: 'visitpage.html',
})
export class VisitpagePage {
 tab1Root =  Visit1Page;
 tab2Root = Visit2Page;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitpagePage');
  }

}
