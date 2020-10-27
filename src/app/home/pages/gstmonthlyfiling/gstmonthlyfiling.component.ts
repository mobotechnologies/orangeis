import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../webservice/location/country.service';
import { CooperateserviceService } from '../../../webservice/cooperateservice.service';
import { ValidationService } from '../../../webservice/validation/validation.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { retryWhen, delay, take } from 'rxjs/operators'
import * as $ from 'jquery';
import { RxwebValidators, fileSize } from '@rxweb/reactive-form-validators';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {  SocialloginService } from '../../../webservice/joinfree/sociallogin.service';

@Component({
  selector: 'app-gstmonthlyfiling',
  templateUrl: './gstmonthlyfiling.component.html',
  styleUrls: ['./gstmonthlyfiling.component.css']
})
export class GstmonthlyfilingComponent implements OnInit {
  public country=[];
  errorMsg: any;
  states: any;
  public phonecode=[
    {"phonecode":"Ac",
    "country_codes":"IN"},
   ];
  cities: any;
  payKit: any;
  invalidPhoneLength: boolean;

  constructor(private spinner: NgxSpinnerService,private SocialloginService: SocialloginService,private cookieService: CookieService, private _countrymodel: CountryService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private _validation: ValidationService,private coperate:CooperateserviceService) {
    this._countrymodel.getCountrycode()
    .subscribe(data => this.country = data,
      error => this.errorMsg = error);
   }

  ngOnInit() {
  }
  gstmonthlyfiling = this.fb.group({
    gstnumber: ['', [Validators.required]],
    gstusername: ['', [Validators.required]],
    country: ['', [Validators.required]],
    state: ['', [Validators.required]],
    mobileno: ['',[Validators.required,ValidationService.numberValidator]],
    emailid: ['',[Validators.required,ValidationService.emailValidator]],
    logpassword: ['',Validators.required],
    confirmpassword: ['', [Validators.required,RxwebValidators.compare({fieldName:'logpassword'})]],
  });
  selectedcountry: string = '';
  selectedstates: string = '';
  selectChangeCountry(event: any) {
    this.selectedcountry = event.target.value;
    const selectEl = event.target;
    const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-somedata');
    this._countrymodel.getStates(val).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.states = data,
        error => this.errorMsg = error);
    this._countrymodel.getCode(val).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.phonecode = data,
        error => this.errorMsg = error);
  }
  selectChangeStates(event: any) {
    this.selectedstates = event.target.value;
    const selectEl = event.target;
    const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-somedata');
    this._countrymodel.getCity(val).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.cities = data,
        error => this.errorMsg = error);
  }
  tmp_files: File[] = [];
  public imgsrc;
  onSelectedfile(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc = event.target.files[0].name;
    var reader = new FileReader();
  
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  PhoneValidator()
  {
    if(this.gstmonthlyfiling.controls['mobileno'].valid)
    {
     if(this.gstmonthlyfiling.value.mobileno !="")
      {
          const formData = new FormData();
          formData.append('phone_number',this.gstmonthlyfiling.value.mobileno);
          formData.append('country_code',$("#pcode").html());
       
          this.SocialloginService.phonelengthvalidator(formData).subscribe(response=>{
          if(response.success)
          {   
            this.invalidPhoneLength=false;
          }
          else
          { 
              this.invalidPhoneLength=true;
          }
          },error=>console.error('error',error)); 
      }
    }
      
  }
  submitandpay()
  {
    
    this.gstmonthlyfiling.markAllAsTouched();
    if (this.gstmonthlyfiling.valid  && this.invalidPhoneLength == false) {
     this.spinner.show();
    const formData = new FormData();
    formData.append('GSTNumber', this.gstmonthlyfiling.value.gstnumber);
    formData.append('MobileNumber',this.gstmonthlyfiling.value.gstusername);
    formData.append('EmailID',this.gstmonthlyfiling.value.mobileno);
    formData.append('country',this.gstmonthlyfiling.value.country);
    formData.append('state',this.gstmonthlyfiling.value.state);
    formData.append('GSTUserName',this.gstmonthlyfiling.value.emailid);
    formData.append('GSTLoginPassword',this.gstmonthlyfiling.value.logpassword);
    formData.append('userId',"0");
    formData.append('userName',this.gstmonthlyfiling.value.gstusername);
    formData.append('userEmail',this.gstmonthlyfiling.value.emailid);
    formData.append('userMobile',this.gstmonthlyfiling.value.mobileno);
    formData.append('payAmount',"1300");
    formData.append('purpose', "GSTmonthlyfiling");
    this.coperate.gstmonthlyfiling(formData).subscribe(
      apiResponse => {
        console.log(this.payKit = apiResponse);
        // console.log(this.payKit.success);
        if (this.payKit.success == true) {
          //console.log('dd');
          this.spinner.hide();
          console.log(this.payKit.payment_request.longurl);
          window.location.href = this.payKit.payment_request.longurl;
        }
        else {
          this.spinner.hide();
          Swal.fire({
            title: 'Oops !',
            titleText: 'Payment failed!Please contact famposo for more info ',
            width: 600,
            allowOutsideClick: false,
            confirmButtonText: 'ok'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/contactus']);
            }
          })
          console.log('Payment Error');
        }


      });
    }
  }
}
