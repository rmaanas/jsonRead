
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProjectpagePage } from '../pages/projectpage/projectpage';
import { HomePage } from '../pages/home/home';
import {ManagerHomePage} from '../pages/manager-home/manager-home';
import { EmployeeHomePage } from '../pages/employee-home/employee-home';
import { AddRolePage } from '../pages/add-role/add-role';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AddRolePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

