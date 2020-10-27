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
import { enGbLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService, defineLocale, AlertComponent } from 'ngx-bootstrap';
import {  SocialloginService } from '../../../webservice/joinfree/sociallogin.service';

@Component({
  selector: 'app-esimonthlyfiling',
  templateUrl: './esimonthlyfiling.component.html',
  styleUrls: ['./esimonthlyfiling.component.css']
})
export class EsimonthlyfilingComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
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

  constructor(private SocialloginService: SocialloginService,private localeService: BsLocaleService,private spinner: NgxSpinnerService, private cookieService: CookieService, private _countrymodel: CountryService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private _validation: ValidationService,private coperate:CooperateserviceService) {
    enGbLocale.invalidDate = 'Select date';
    defineLocale('custom locale', enGbLocale);
    this.localeService.use('custom locale');
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY'
      });
    this._countrymodel.getCountrycode()
    .subscribe(data => this.country = data,
      error => this.errorMsg = error);
   }

  ngOnInit() {
  }
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
  esimonthlyfiling = this.fb.group({
    esiregisterno: ['', [Validators.required]],
    esiusername: ['', [Validators.required]],
    mobileno: ['',[Validators.required,ValidationService.numberValidator]],
    emailid: ['',[Validators.required,ValidationService.emailValidator]],
    country: ['', [Validators.required]],
    state: ['', [Validators.required]],
    logpassword: ['',Validators.required],
    confirmpassword: ['', [Validators.required,RxwebValidators.compare({fieldName:'logpassword'})]],
    date: ['', [Validators.required]],
    uploadwage: ['', [Validators.required,RxwebValidators.extension({extensions:["xlsx"]})]]
  });
  tmp_files: File[] = [];
  public imgsrc;
  onSelectedfile(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc = event.target.files[0].name;
    $('.upldtext').text(event.target.files[0].name);
    var reader = new FileReader();
  
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  logofile1() {
    $("#file1").trigger('click');
  }
  PhoneValidator()
  {
    if(this.esimonthlyfiling.controls['mobileno'].valid)
    {
     if(this.esimonthlyfiling.value.mobileno !="")
      {
          const formData = new FormData();
          formData.append('phone_number',this.esimonthlyfiling.value.mobileno);
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
    var indate = (new Date(this.esimonthlyfiling.value.date)).toLocaleDateString();
    this.esimonthlyfiling.markAllAsTouched();
    if (this.esimonthlyfiling.valid && this.invalidPhoneLength == false) {
      this.spinner.show();
    for (let i = 0; i < this.tmp_files.length; i++) {
      const formDat = new FormData();
      formDat.append('Imagefile', this.tmp_files[i][0]);
      formDat.append('dirname',  this.esimonthlyfiling.value.esiusername);
      this.coperate.ESIfileupload(formDat).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
        if (res.success == false) {

        }
      });
    }
   const formData = new FormData();
    formData.append('ESIRegNumber', this.esimonthlyfiling.value.esiregisterno);
    formData.append('MobileNumber',this.esimonthlyfiling.value.mobileno);
    formData.append('EmailID',this.esimonthlyfiling.value.emailid);
    formData.append('country',this.esimonthlyfiling.value.country);
    formData.append('state',this.esimonthlyfiling.value.state);
    formData.append('ESIUserName',this.esimonthlyfiling.value.esiusername);
    formData.append('ESILoginPassword',this.esimonthlyfiling.value.logpassword);
    formData.append('ESIdate',indate);
    formData.append('wagedetailfile',this.imgsrc);
    formData.append('userId',"0");
    formData.append('userName', this.esimonthlyfiling.value.esiusername);
    formData.append('userEmail', this.esimonthlyfiling.value.emailid);
    formData.append('userMobile', this.esimonthlyfiling.value.mobileno);
    formData.append('payAmount',"1500");
    formData.append('purpose', "ESImonthlyfiling");
    this.coperate.esimonthlyfiling(formData).subscribe(
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
