import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ManagerHomePage} from '../pages/manager-home/manager-home';
import { MhomePage} from '../pages/mhome/mhome';
import { AddVisitPage} from '../pages/add-visit/add-visit';
import { UpdateVisitPage} from '../pages/update-visit/update-visit';
import { ViewHistoryPage } from '../pages/view-history/view-history';
import { EmployeeHomePage } from '../pages/employee-home/employee-home';
import { EmployeeAllProjectsPage } from '../pages/employee-all-projects/employee-all-projects';
import { EmployeeMyProjectsPage } from '../pages/employee-my-projects/employee-my-projects';
import { AddEditPage } from '../pages/add-edit/add-edit';
import { ProjectpagePage } from '../pages/projectpage/projectpage';
import { AddProjectPage } from '../pages/add-project/add-project';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	  ManagerHomePage,
    MhomePage,
    AddVisitPage,
    EmployeeHomePage,
    EmployeeAllProjectsPage,
    EmployeeMyProjectsPage,
    UpdateVisitPage,
    ViewHistoryPage,
    AddEditPage,
    ProjectpagePage,
    AddProjectPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	  ManagerHomePage,
    MhomePage,
    EmployeeHomePage,
    EmployeeAllProjectsPage,
    EmployeeMyProjectsPage,
    AddVisitPage,
    UpdateVisitPage,
    ViewHistoryPage,
    AddEditPage,
    ProjectpagePage,
    AddProjectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
