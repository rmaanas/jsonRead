import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { ManagerHomePage } from '../manager-home/manager-home';
import { ProjectpagePage } from '../projectpage/projectpage';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html',
})
export class AddMemberPage {
	
}