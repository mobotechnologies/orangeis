import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../webservice/location/country.service';
import { CooperateserviceService } from '../../../webservice/cooperateservice.service';
import { ValidationService } from '../../../webservice/validation/validation.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { retryWhen, delay, take } from 'rxjs/operators'
import * as $ from 'jquery';
import { RxwebValidators, fileSize } from '@rxweb/reactive-form-validators';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService, defineLocale, AlertComponent } from 'ngx-bootstrap';
@Component({
  selector: 'app-gstregistration',
  templateUrl: './gstregistration.component.html',
  styleUrls: ['./gstregistration.component.css']
})
export class GstregistrationComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  country: import("f:/Famposov3/client/src/app/model/location/country").Countrymodel[];
  errorMsg: any;
  states: any;
  phonecode: any;
  cities: any;
  imgsrc3: any;
  imgsrc4: any;
  imgsrc5: any;


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
     $(".gstform").show();
     $(".gstinfo").hide();
  }
  previous()
  {
     $(".gstform").hide();
     $(".gstinfo").show();
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
  gstregistration = this.fb.group({
    applicanttype: ['', [Validators.required]],
    applicantfullname: ['', [Validators.required]],
    firmname: ['', [Validators.required]],
    businessentity: ['', [Validators.required]],
    businessaddress: ['', [Validators.required]],
    goodsservice: ['', [Validators.required]],
    businessactivity: ['', [Validators.required]],
    commencement: ['', [Validators.required]],
    mobileno: ['', [Validators.required]],
    emailid: ['', [Validators.required]],
    compositionscheme: ['', [Validators.required]],
    Photograph:this.fb.array([this.initnewRows1()]),
    identityproof:this.fb.array([this.initnewRows2()]),
    pancard:this.fb.array([this.initnewRows3()]),
    addressproof: ['', [Validators.required]],
    electricitybill: ['', [Validators.required]],
    rentagreement: ['', [Validators.required]],
    noc: ['', [Validators.required]],
    bankaccountproof: ['', [Validators.required]],
  });
  initnewRows1(): FormGroup {
    return this.fb.group({
      Photograph: ['',Validators.required],
    });
  }
  initnewRows2(): FormGroup {
    return this.fb.group({
      identityproof: ['',Validators.required],
    });
  }
  initnewRows3(): FormGroup {
    return this.fb.group({
      pancard: ['',Validators.required],
    });
  }
  addNewRow1() {
    this.formArray1.push(this.initnewRows1());
  }
  deleteRow1(index: number) {
    this.formArray1.removeAt(index);
  }
  addNewRow2() {
    this.formArray2.push(this.initnewRows2());
  }
  deleteRow2(index: number) {
    this.formArray2.removeAt(index);
  }
  addNewRow3() {
    this.formArray3.push(this.initnewRows1());
  }
  deleteRow3(index: number) {
    this.formArray3.removeAt(index);
  }
  get formArray1() {
    return this.gstregistration.get('Photograph') as FormArray;
  }
  get formArray2() {
    return this.gstregistration.get('identityproof') as FormArray;
  }
  get formArray3() {
    return this.gstregistration.get('pancard') as FormArray;
  }
  tmp_files: File[] = [];
  public imgsrc1;
  public imgsrc2;
  onSelectedfile1(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc1 = event.target.files[0].name;
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
    var reader = new FileReader();
  
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  submitandpay()
  {
    
  }
}
