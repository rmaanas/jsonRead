import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistdetavisitPage } from '../histdetavisit/histdetavisit';
import { HistdetaagendaPage } from '../histdetaagenda/histdetaagenda';

/**
 * Generated class for the HistdetaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-histdeta',
  templateUrl: 'histdeta.html',
})
export class HistdetaPage {
	tab1Root =  HistdetavisitPage;
 	tab2Root = HistdetaagendaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistdetaPage');
  }

}
