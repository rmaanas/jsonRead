import { Component,ViewChild } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, Nav } from 'ionic-angular';
import {AddEditPage } from '../add-edit/add-edit';
import {MhomePage} from '../mhome/mhome';
import {ViewHistoryPage} from '../view-history/view-history';
import {AddVisitPage} from '../add-visit/add-visit';

@IonicPage()
@Component({
   selector : 'page-add-project',
   templateUrl: 'projectpage.html',
 })
export class ProjectpagePage{
  @ViewChild(Nav) nav: Nav;
  collectings=null;
  pages : any;
  public project : any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController) {
    menu.enable(true);
    this.pages = [
      { title: 'Manager Home', component: MhomePage },
      { title: 'Add Visit', component: AddVisitPage },
      { title: 'View History', component: ViewHistoryPage }
    ];
    this.collectings=null;
 
     this.collectings=this.getCollectings();

    this.project = {
      projectname : navParams.get("projectname"),
      clienthead : navParams.get("clienthead"),
      organisation : navParams.get("organisation")
    }

    console.log(this.project);
   }
 
  openPage(page: any)
  {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
  
  getCollectings() {
    
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