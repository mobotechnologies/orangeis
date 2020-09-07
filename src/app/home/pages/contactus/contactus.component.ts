import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/webservice/contact/contact.service';
import { ValidationService } from 'src/app/webservice/validation/validation.service';
import { CountryService } from 'src/app/webservice/location/country.service';
import { retryWhen, delay, take } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { SocialloginService } from '../../../webservice/joinfree/sociallogin.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from "ngx-spinner";
import {Location} from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  lat: number = 11.895490;
  lng: number = 79.811784;

  slat: number = 1.280061;
  slng: number = 103.854858;

  zoom: number = 2;

  public country = [];
  public states = [];
  public errorMsg;
  checkcategory: any;
  invalidPhoneLength: boolean;

  constructor(private cookieService: CookieService, public fb: FormBuilder,private spinner: NgxSpinnerService,private SocialloginService: SocialloginService,private location: Location,private router: Router, public contactApi: ContactService, private _validation: ValidationService, private _countrymodel: CountryService) {
    this._countrymodel.getCountrycode().pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.country = data,
        error => this.errorMsg = error);

  }

 
  submitted = false;
  selectedcountry: string = '';
  public phonecode = [];
  ngOnInit() {
        
    $(document).ready(function (e) {

      //Define Defaults - Elements to be targets by user interaction/events
      var $defaults = {
        navigation: $('nav#navigation'), overlayDiv: $('#overlay'), menuTextIcons: $('.menu-text-icons'),
        menuText: $('.menu-text'), menuItemsContainer: $('.menu-items-container')
      }

      $defaults.menuItemsContainer.add($defaults.overlayDiv).fadeIn('slow');
      $defaults.menuTextIcons.addClass("effect-menu-text-icons");
      $defaults.menuText.addClass("effect-menu-text");
      e.stopPropagation();

    });
    console.log('state >>>', history.state);
    console.log('location >>>', this.location.getState());
    const val: any = this.location.getState();
    const keys:any = Object.keys(val);

   this.checkcategory=val["category"];
   if( val["category"]!="" && val["category"]!=undefined)
  {
   
    if(val["category"]!="")
    {
    
       this.contactForm.patchValue({category:val["category"]});
       $(".menu-cdata").show();
    }
    else
    {
        $(".menu-cdata").hide();
      
    }
    if(val["subcategory"]!="")
    {
        this.contactForm.patchValue({subcategory:val["subcategory"]});
        $(".menu-sdata").show();
    }
    else
    {
      $(".menu-sdata").hide();
    }
  }
  else
  {
    $(".menu-cdata").hide();
    $(".menu-sdata").hide();
  }
  
  }
  contactForm = this.fb.group({
    contactName: ['', [Validators.required]],
    contactEmail: ['', [Validators.required, ValidationService.emailValidator]],
    phonecode: [''],
    category: [''],
    subcategory: [''],
    mobile_no: ['', [Validators.required, ValidationService.numberValidator]],
    country: ['', [Validators.required]],
    countrycode: [],
    state: ['', [Validators.required]],
    comment: ['', [Validators.required]]
  })
  PhoneValidator() {
    if (this.contactForm.value.countrycode != "" && this.contactForm.value.mobile_no != "") {
      const formData = new FormData();
      formData.append('phone_number', this.contactForm.value.mobile_no);
      formData.append('country_code', this.contactForm.value.countrycode);

      this.SocialloginService.phonelengthvalidator(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response => {
        if (response.success) {
          this.invalidPhoneLength = false;
         ;
        }
        else {
          this.invalidPhoneLength = true;
          
        }
      }, error => console.error('error', error));
    }


  }
  selectChangeCountry(event: any) {
    this.selectedcountry = event.target.value;
    const selectEl = event.target;
    const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-somedata');
    this._countrymodel.getStates(val).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.states = data,
        error => this.errorMsg = error);
    this._countrymodel.getCode(val).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.phonecode = data,
        error => this.errorMsg = error);
  }

  submitContact(): void {

    console.log(this.contactForm.value);
    //this.submitted = true;
    
    // stop here if form is invalid
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid  ) {
      
      this.submitted = false;
   
      return;

    } else {
    
      if(this.invalidPhoneLength ==false)
      {
      this.spinner.show(); 
      this.submitted = true;
      const formData = new FormData();
      formData.append('category',$(".menu-cdata").val());
      formData.append('subcategory',$(".menu-sdata").val());
      formData.append('contactName', this.contactForm.value.contactName);
      formData.append('contactEmail', this.contactForm.value.contactEmail);
      formData.append('phoneCode', this.contactForm.value.phonecode);
      formData.append('contactPhone', this.contactForm.value.mobile_no);
      formData.append('country', this.contactForm.value.country);
      formData.append('state', this.contactForm.value.state);
      formData.append('comment', this.contactForm.value.comment);
      
      this.contactApi.AddContact(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(
        data => {
          // let message= data['message'];
          this.spinner.hide();
        });
      Swal.fire({
        allowOutsideClick: false,
        title: 'Submitted Successfully \n FAMPOSO Team will contact you as soon as possible ',
        width: 600,
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['']);
        }
      })
    }
    //  Swal.fire("Submitted Successfully");
  }
  }
  logout() {
    this.cookieService.delete('memberid');
    this.cookieService.delete('password');
    this.cookieService.delete('oauth');
    this.cookieService.delete('remember');
    localStorage.removeItem('token');
    $("#signedin").show();
    $("#loggedin").hide();
    $("#cartcount").html("0");
    this.router.navigate(["register", "login"]);
  }
  
 
}

