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
  selector: 'app-esiregistration',
  templateUrl: './esiregistration.component.html',
  styleUrls: ['./esiregistration.component.css']
})
export class EsiregistrationComponent implements OnInit {
  public country=[];
  errorMsg: any;
  states: any;
  public phonecode=[
    {"phonecode":"Ac",
    "country_codes":"IN"},
   ];
  cities: any;
  imgsrc4: any;
  imgsrc3: any;
  imgsrc5: any; 
  imgsrc6: any;
  payKit: any;
  invalidPhoneLength: boolean;
  invalidPhoneLength1: boolean;

  constructor(private spinner: NgxSpinnerService,private SocialloginService: SocialloginService,private cookieService: CookieService, private _countrymodel: CountryService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private _validation: ValidationService,private coperate:CooperateserviceService) { 
    this._countrymodel.getCountrycode()
    .subscribe(data => this.country = data,
      error => this.errorMsg = error);
  }

  ngOnInit() {
  }
  esiregistration = this.fb.group({
    nameproof: ['', [Validators.required]],
    addressproof: ['', [Validators.required]],
    emailid: ['', [Validators.required,ValidationService.emailValidator]],
    country: ['', [Validators.required]],
    state: ['', [Validators.required]],
    companypan: ['', [Validators.required]],
    empstrength: ['', [Validators.required]],
    menstrength: ['', [Validators.required]],
    womenstrength: ['', [Validators.required]],
    bankaccountnumber: ['', [Validators.required]],
    bankaddress: ['', [Validators.required]],
    bankifsc: ['', [Validators.required]],
    empfile: ['', [Validators.required]],
    directorpan: ['', [Validators.required]],
    directoraadhar: ['', [Validators.required]],
    directorphoto: ['', [Validators.required]],
    mobileno: ['', [Validators.required,ValidationService.numberValidator]],
    contactno: ['', [Validators.required,ValidationService.numberValidator]],
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
  onSelectedfile1(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc1 = event.target.files[0].name;
    $('.upldtext1').text(event.target.files[0].name);
    var reader = new FileReader();
  
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
  onSelectedfile4(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc4 = event.target.files[0].name;
    $('.upldtext4').text(event.target.files[0].name);
    var reader = new FileReader();
  
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  onSelectedfile5(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc5 = event.target.files[0].name;
    $('.upldtext5').text(event.target.files[0].name);
    var reader = new FileReader();
  
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  onSelectedfile6(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc6 = event.target.files[0].name;
    $('.upldtext6').text(event.target.files[0].name);
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
  logofile4() {
    $("#file4").trigger('click');
  }
  logofile5() {
    $("#file5").trigger('click');
  }
  logofile6() {
    $("#file6").trigger('click');
  }
  PhoneValidator()
  {
    if(this.esiregistration.controls['mobileno'].valid)
    {
     if(this.esiregistration.value.mobileno !="")
      {
          const formData = new FormData();
          formData.append('phone_number',this.esiregistration.value.mobileno);
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
  PhoneValidator1()
  {
    if(this.esiregistration.controls['contactno'].valid)
    {
     if(this.esiregistration.value.contactno !="")
      {
          const formData = new FormData();
          formData.append('phone_number',this.esiregistration.value.contactno);
          formData.append('country_code',$("#pcode").html());
       
          this.SocialloginService.phonelengthvalidator(formData).subscribe(response=>{
          if(response.success)
          {   
            this.invalidPhoneLength1=false;
          }
          else
          { 
              this.invalidPhoneLength1=true;
          }
          },error=>console.error('error',error)); 
      }
    }
      
  }
  submitandpay()
  {
    this.esiregistration.markAllAsTouched();
    if (this.esiregistration.valid && this.invalidPhoneLength == false && this.invalidPhoneLength1 == false) {
     this.spinner.show();
    for (let i = 0; i < this.tmp_files.length; i++) {
      const formDat = new FormData();
      formDat.append('Imagefile', this.tmp_files[i][0]);
      formDat.append('dirname',  this.esiregistration.value.emailid);
      this.coperate.ESIfileupload(formDat).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
        if (res.success == false) {

        }
      });
    }
    const formData = new FormData();
    formData.append('companyName',this.imgsrc1);
    formData.append('companyAddress',this.imgsrc2);
    formData.append('Email',this.esiregistration.value.emailid);
    formData.append('contactNo',this.esiregistration.value.contactno);
    formData.append('companyPan',this.esiregistration.value.companypan);
    formData.append('TotalEMP',this.esiregistration.value.empstrength);
    formData.append('MenEMP',this.esiregistration.value.menstrength);
    formData.append('WomenEMP',this.esiregistration.value.womenstrength);
    formData.append('BankAccountNumber',this.esiregistration.value.bankaccountnumber);
    formData.append('BankAddress',this.esiregistration.value.bankaddress);
    formData.append('BankIFSCcode',this.esiregistration.value.bankifsc);
    formData.append('EmployeesDetaillsFile',this.imgsrc3);
    formData.append('DirectorPAN',this.imgsrc4);
    formData.append('DirectorAadhar',this.imgsrc5);
    formData.append('directorPhoto',this.imgsrc6);
    formData.append('PersonalMobileNumber',this.esiregistration.value.mobileno);
    formData.append('userId',"0");
    formData.append('userName',this.esiregistration.value.emailid);
    formData.append('userEmail',this.esiregistration.value.emailid);
    formData.append('userMobile',this.esiregistration.value.mobileno);
    formData.append('payAmount',"6000");
    formData.append('purpose', "Esiregistration");
    this.coperate.esiregistration(formData).subscribe(
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
