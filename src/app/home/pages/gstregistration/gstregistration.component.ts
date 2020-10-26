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
  imgsrc6: any;
  imgsrc7: any;
  imgsrc8: any;
  payKit: any;
  imgsrc9: any;
  selectedEntity: any;
  dtype: string;
  renttype: string;


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
    this.dtype="Proprietor";
    this.renttype="if not own place";
    $(".direc").hide();
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
    secondaryaddress: [''],
    goodsservice: ['', [Validators.required]],
    businessactivity: ['', [Validators.required]],
    commencement: ['', [Validators.required]],
    mobileno: ['', [Validators.required,ValidationService.numberValidator]],
    emailid: ['', [Validators.required,ValidationService.emailValidator]],
    compositionscheme: ['', [Validators.required]],
    Photograph:this.fb.array([this.initnewRows1()]),
    identityproof:this.fb.array([this.initnewRows2()]),
    pancard:this.fb.array([this.initnewRows3()]),
    addressproof: ['', [Validators.required]],
    electricitybill: ['', [Validators.required]],
    rentagreement: [''],
    noc: ['', [Validators.required]],
    bankaccountproof: ['', [Validators.required]],
    companypan: [''],
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
    this.formArray3.push(this.initnewRows3());
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
    $('.upldtext4').text(event.target.files[0].name);
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
    $('.upldtext5').text(event.target.files[0].name);
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
    $('.upldtext6').text(event.target.files[0].name);
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
    $('.upldtext7').text(event.target.files[0].name);
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
    $('.upldtext8').text(event.target.files[0].name);
    var reader = new FileReader();
  
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  public proof1= [];
  public proof2= [];
  public proof3= [];
  onSelectedfile6(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc6 = event.target.files[0].name;
    this.proof3.push(this.imgsrc6);
    $('.upldtext3'+index).text(event.target.files[0].name);
    var reader = new FileReader();
  
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  onSelectedfile7(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc7 = event.target.files[0].name;
    this.proof2.push(this.imgsrc7);
    $('.upldtext2'+index).text(event.target.files[0].name);
    var reader = new FileReader();
  
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  onSelectedfile8(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc8 = event.target.files[0].name;
    this.proof1.push(this.imgsrc8);
    $('.uploadtext'+index).text(event.target.files[0].name);
    var reader = new FileReader();
  
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  onSelectedfile9(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc9 = event.target.files[0].name;
    $('.upldtext9').text(event.target.files[0].name);
    var reader = new FileReader();
  
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     
    }
  }
  selectChangeBusinessEntity(event:any)
  {
    this.selectedEntity = event.target.value;
    const selectEl = event.target;
    const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-somedata');
    const control1 = <FormArray>this.gstregistration.controls['Photograph'];
 
    for(let i = control1.length; i > 0; i--) {
      
        control1.removeAt(i)
    }
    const control2 = <FormArray>this.gstregistration.controls['identityproof'];
        for(let i = control2.length; i > 0; i--) {
            control2.removeAt(i)
    }
    const control3 = <FormArray>this.gstregistration.controls['pancard'];
        for(let i = control3.length; i >0; i--) {
            control3.removeAt(i)
    }
    if(val=="privatelimited" || val=="llp" || val=="trust" )
    {
         this.dtype="Director";
         $(".direc").show();
         this.renttype="*";
         this.gstregistration.get('rentagreement').setValidators([Validators.required]);
         this.gstregistration.get('rentagreement').updateValueAndValidity();
         this.gstregistration.get('companypan').setValidators([Validators.required]);
         this.gstregistration.get('companypan').updateValueAndValidity();
    }
    else
    {
      this.dtype="Proprietor";
      $(".direc").hide();
      this.renttype="if not own place";
      this.gstregistration.get(' rentagreement').clearValidators();
      this.gstregistration.get(' rentagreement').updateValueAndValidity();
      this.gstregistration.get('companypan').clearValidators();
      this.gstregistration.get('compabypan').updateValueAndValidity();
    }
   
  }
  logofile1(index) {
    $("#file1" + index).trigger('click');
  }
  logofile2(index) {
    $("#file2" + index).trigger('click');
  }
  logofile3(index) {
    $("#filep" + index).trigger('click');
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
  logofile7() {
    $("#file7").trigger('click');
  }
  logofile8() {
    $("#file8").trigger('click');
  }
  logofile9() {
    $("#file9").trigger('click');
  }
  submitandpay()
  {
    var indate = (new Date(this.gstregistration.value.commencement)).toLocaleDateString();
    this.gstregistration.markAllAsTouched();
    if (this.gstregistration.valid) {
      this.spinner.show();
      for (let i = 0; i < this.tmp_files.length; i++) {
        const formData = new FormData();
        formData.append('Imagefile', this.tmp_files[i][0]);
        formData.append('dirname', this.gstregistration.value.emailid);
        this.coperate.gstregfileupload(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
          if (res.success == false) {

          }
        });
      }
    
      const formData = new FormData();
      formData.append('ApplicationType', this.gstregistration.value.applicanttype);
      formData.append('ApplicantFullName',this.gstregistration.value.applicantfullname);
      formData.append('NameofFirm',this.gstregistration.value.firmname);
      formData.append('TypeofBusinessEntity',this.gstregistration.value.businessentity);
      formData.append('BusinessAddress1',this.gstregistration.value.businessaddress);
      formData.append('BusinessAddress2', this.gstregistration.value.secondaryaddress);
      formData.append('Goods&Services',this.gstregistration.value.goodsservice);
      formData.append('BusinessActivity',this.gstregistration.value.businessactivity);
      formData.append('commencementDate',indate);
      formData.append('compositionscheme',this.gstregistration.value.compositionscheme);
      formData.append('MobileNumber',this.gstregistration.value.mobileno);
      formData.append('EmailID', this.gstregistration.value.emailid);
      formData.append('Photograph',JSON.stringify(this.proof1));
      formData.append('IdentityProof',JSON.stringify(this.proof2));
      formData.append('Pancard',JSON.stringify(this.proof3));
      formData.append('AddressproofBusiness',this.imgsrc1);
      formData.append('Electricitybill', this.imgsrc2);
      formData.append('RentAgreement',this.imgsrc3);
      formData.append('Noc',this.imgsrc4);
      formData.append('BankProof',this.imgsrc5);
      formData.append('CompanyPan',this.imgsrc9);
      formData.append('userId',"0");
      formData.append('userName', this.gstregistration.value.firmname);
      formData.append('userEmail', this.gstregistration.value.emailid);
      formData.append('userMobile', this.gstregistration.value.mobileno);
      formData.append('payAmount',"4500");
      formData.append('purpose', "gstregistration");
      this.coperate.gstregistration(formData).subscribe(
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
