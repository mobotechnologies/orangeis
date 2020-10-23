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
import { RxwebValidators} from '@rxweb/reactive-form-validators';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService, defineLocale, AlertComponent } from 'ngx-bootstrap';
import {PopoverModule} from "ngx-smart-popover";

@Component({
  selector: 'app-companyincoperation',
  templateUrl: './companyincoperation.component.html',
  styleUrls: ['./companyincoperation.component.css']
})
export class CompanyincoperationComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  errorMsg: any;
  country: import("f:/Famposov3/client/src/app/model/location/country").Countrymodel[];
  states: any;
  phonecode: any;
  cities: any;
  imgsrc2: any;
  imgsrc3: any;
  imgsrc4: any;
  payKit: any;

  constructor(private localeService: BsLocaleService,private spinner: NgxSpinnerService, private cookieService: CookieService, private _countrymodel: CountryService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private _validation: ValidationService,private coperate:CooperateserviceService) {
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
  next()
  {
      $(".companyincinfo").hide();
      $(".companyform").show();
  }
  prev()
  {
      $(".companyincinfo").show();
      $(".companyform").hide();
  }
  companyinc = this.fb.group({
    applicanttype: ['', Validators.required],
    applicantfullname: ['', Validators.required],
    firmname: ['', Validators.required],
    businessentity: ['', Validators.required],
    primaryaddress: ['', Validators.required],
    secondaryaddress: ['',Validators.required],
    goodservice: ['', Validators.required],
    businessactivity:['', Validators.required],
    commencement: ['', Validators.required],
    webpage: ['', Validators.required],
    directorpan: ['', Validators.required],
    directoraadhar: ['', Validators.required],
    directorphoto: ['',[Validators.required, RxwebValidators.extension({extensions:["jpeg","jpg"]})]],
    bankstatement: ['', Validators.required],
    mobileno: ['',[Validators.required,ValidationService.numberValidator]],
    emailid: ['',[Validators.required,ValidationService.emailValidator]]
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
  submitandpay()
  {
   
    var indate = (new Date(this.companyinc.value.commencement)).toLocaleDateString();

    this.companyinc.markAllAsTouched();
    if (this.companyinc.valid) {
      this.spinner.show();
    for (let i = 0; i < this.tmp_files.length; i++) {
      const formDat = new FormData();
      formDat.append('Imagefile', this.tmp_files[i][0]);
      formDat.append('dirname',  this.companyinc.value.firmname);
      this.coperate.companyincfileupload(formDat).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
        if (res.success == false) {

        }
      });
    }
      const formData = new FormData();
    formData.append('ApplicationType', this.companyinc.value.applicanttype);
    formData.append('ApplicantFullName',this.companyinc.value.applicantfullname);
    formData.append('FirmName',this.companyinc.value.firmname);
    formData.append('BusinessEntityType',this.companyinc.value.businessentity);
    formData.append('Businessaddress1',this.companyinc.value.primaryaddress);
    formData.append('Businessaddress2',this.companyinc.value.secondaryaddress);
    formData.append('Goods&Services', this.companyinc.value.goodservice);
    formData.append('BusinessActivity',this.companyinc.value.esiusername);
    formData.append('commencementDate',indate);
    formData.append('company_website',this.companyinc.value.webpage);
    formData.append('DirectorPAN',this.imgsrc);
    formData.append('DirectorAadhar',this.imgsrc2);
    formData.append('DirectorPhoto',this.imgsrc3);
    formData.append('Last3MonthBankStatement',this.imgsrc4);
    formData.append('PersonalMobileNumber',this.companyinc.value.mobileno);
    formData.append('PeronalEmailID',this.companyinc.value.emailid);
    formData.append('userId',"0");
    formData.append('userName',this.companyinc.value.applicantfullname);
    formData.append('userEmail',this.companyinc.value.emailid);
    formData.append('userMobile',this.companyinc.value.mobileno);
    formData.append('payAmount',"18000");
    formData.append('purpose', "companyregistration");
    this.coperate.companyinc(formData).subscribe(
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
