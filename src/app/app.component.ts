import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ShareService} from '../pages/services/ShareService';
import { IonicStorageModule } from '@ionic/storage';
import {Storage} from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import {ManagerHomePage} from '../pages/manager-home/manager-home';
import { EmployeeHomePage } from '../pages/employee-home/employee-home';
@Component({
  templateUrl: 'app.html',
  providers: [ShareService, IonicStorageModule] 
})
export class MyApp {
  rootPage:any = HomePage;
  jsonObj: any = null;
  res: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    platform.ready().then(() => {
  
      this.storage.get("jsonObj").then(value=>{
        this.jsonObj = value;
        this.res = (this.jsonObj != null);
        console.log("bool: " + this.res);
        if(this.res)
        {
          if(this.jsonObj.role == "manager")
          {
            this.rootPage = ManagerHomePage;
            //this.rootPage = HomePage;
          }
          else
          {
            this.rootPage = EmployeeHomePage;
          }
        }
        else
        {
          this.rootPage = HomePage;
        }
      });
      
    statusBar.styleDefault();
    splashScreen.hide();
  });

  }

}

