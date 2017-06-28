import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ManagerHomePage } from '../pages/manager-home/manager-home';
import { ViewHistoryPage } from '../pages/view-history/view-history';
import { AddCustomerPage } from '../pages/add-customer/add-customer';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ManagerHomePage,
    ViewHistoryPage,
    AddCustomerPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ManagerHomePage,
    ViewHistoryPage,
    AddCustomerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
