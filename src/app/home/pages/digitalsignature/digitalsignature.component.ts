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
  selector: 'app-digitalsignature',
  templateUrl: './digitalsignature.component.html',
  styleUrls: ['./digitalsignature.component.css']
})
export class DigitalsignatureComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  public country = [];
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
   
   }

  ngOnInit() {
    this._countrymodel.getCountrycode()
    .subscribe(data => this.country = data,
      error => this.errorMsg = error);
  }
  digitalsign = this.fb.group({
    commonname: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    emailid: ['', [Validators.required,ValidationService.emailValidator]],
    classtype: ['', [Validators.required]],
    organization: ['', [Validators.required]],
    department: ['', [Validators.required]],
    aadhar: ['', [Validators.required]],
    country: ['', [Validators.required]],
    pan: ['', [Validators.required]],
    state: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    postalcode: ['', [Validators.required]],
    nationality: ['', [Validators.required]],
    mobileno: ['', [Validators.required,ValidationService.numberValidator]],
    locality: ['', [Validators.required]],
    address: ['', [Validators.required]],
    photo: ['', [Validators.required]],
    pancard: ['', [Validators.required]],
    aadharcard: ['', [Validators.required]],
    includemailid: [''],
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
  public imgsrc1;
  public imgsrc2;
  public imgsrc3;
  onSelectedfile1(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc1 = event.target.files[0].name;
    var reader = new FileReader();
    $('.upldtext1').text(event.target.files[0].name);
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  onSelectedfile2(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc2 = event.target.files[0].name;
    $('.upldtext2').text(event.target.files[0].name);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  onSelectedfile3(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc3 = event.target.files[0].name;
    $('.upldtext3').text(event.target.files[0].name);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  logofile1() {
    $("#file1").trigger('click');
  }
  logofile2() {
    $("#file2").trigger('click');
  }
  logofile3() {
    $("#file3").trigger('click');
  }
  PhoneValidator()
  {
    if(this.digitalsign.controls['mobileno'].valid)
    {
     if(this.digitalsign.value.mobileno !="")
      {
          const formData = new FormData();
          formData.append('phone_number',this.digitalsign.value.mobileno);
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
    var indate = (new Date(this.digitalsign.value.dob)).toLocaleDateString();
    this.digitalsign.markAllAsTouched();
    if (this.digitalsign.valid && this.invalidPhoneLength == false) {
      this.spinner.show();
      
    for (let i = 0; i < this.tmp_files.length; i++) {
      const formDat = new FormData();
      formDat.append('Imagefile', this.tmp_files[i][0]);
      formDat.append('dirname',  this.digitalsign.value.aadhar);
      this.coperate.digitalsignfileupload(formDat).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
        if (res.success == false) {

        }
      });
    }
      const formData = new FormData();
      formData.append('commonName', this.digitalsign.value.commonname);
      formData.append('dob',indate);
      formData.append('EmailID', this.digitalsign.value.emailid);
      formData.append('Classtype',this.digitalsign.value.classtype);
      formData.append('organization',this.digitalsign.value.organization);
      formData.append('department',this.digitalsign.value.department);
      formData.append('Aadhar',this.digitalsign.value.aadhar);
      formData.append('country',this.digitalsign.value.country);
      formData.append('state',this.digitalsign.value.state);
      formData.append('gender',this.digitalsign.value.gender);
      formData.append('nationality',this.digitalsign.value.nationality);
      formData.append('PostalCode',this.digitalsign.value.postalcode);
      formData.append('Pan', this.digitalsign.value.pan);
      formData.append('mobileNo',this.digitalsign.value.mobileno);
      formData.append('Locality',this.digitalsign.value.locality);
      formData.append('address',this.digitalsign.value.address);
      formData.append('photo',this.imgsrc1);
      formData.append('panproof',this.imgsrc2);
      formData.append('Aadharproof',this.imgsrc3);
      formData.append('EmailIDcertificate',this.digitalsign.value.includemailid);
      formData.append('userId',"0");
      formData.append('userName',this.digitalsign.value.organization);
      formData.append('userEmail',this.digitalsign.value.emailid);
      formData.append('userMobile',this.digitalsign.value.mobileno);
      formData.append('payAmount',"1500");
      formData.append('purpose', "digitalsignature");
      this.coperate.digitalsignregistration(formData).subscribe(
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