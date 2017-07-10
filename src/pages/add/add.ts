import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from  '../add/emailValid';


/**
 * Generated class for the AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

 
    slideOneForm: FormGroup;
    submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams) {

   this.slideOneForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        clientName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        organization: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        email: ['', EmailValidator.isValid]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }
  save(){
 
 
    if(!this.slideOneForm.valid){
            this.submitAttempt = true;
        console.log("Invalid");
    } 
    
    else {
        console.log("success!")
        console.log(this.slideOneForm.value);
    }
 
}

}
