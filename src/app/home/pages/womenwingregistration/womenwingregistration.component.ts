import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../webservice/location/country.service';
import { CooperateserviceService } from '../../../webservice/cooperateservice.service';
import { ValidationService } from '../../../webservice/validation/validation.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators,FormArray, FormGroup, FormControl } from '@angular/forms';
import { retryWhen, delay, take } from 'rxjs/operators'
import * as $ from 'jquery';
import { RxwebValidators} from '@rxweb/reactive-form-validators';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService, defineLocale, AlertComponent } from 'ngx-bootstrap';
import {PopoverModule} from "ngx-smart-popover";
import {  SocialloginService } from '../../../webservice/joinfree/sociallogin.service';


@Component({
  selector: 'app-womenwingregistration',
  templateUrl: './womenwingregistration.component.html',
  styleUrls: ['./womenwingregistration.component.css']
})
export class WomenwingregistrationComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  errorMsg: any;
  public country=[];
  states: any;
  public phonecode=[
    {"phonecode":"Ac",
    "country_codes":"IN"},
   ];
  cities: any;
  invalidPhoneLength: boolean;
  invalidPhoneLength1: boolean;
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
    this.invalidPhoneLength1=false;
  }
   womenswing = this.fb.group({
    firstname: ['',Validators.required],
    lastname: ['',Validators.required],
    dob: [''],
    age: ['',[Validators.required,ValidationService.numberValidator]],
    maritialstatus: [''],
    anniversarydate: [''],
    highqualification: [''],
    currentprofession: [''],
    currentaddress: ['',Validators.required],
    email: ['',[Validators.required,ValidationService.emailValidator]],
    country: ['',Validators.required],
    city: [''],
    state: [''],
    zipcode: [''],
    phonenumber: ['',[Validators.required,ValidationService.numberValidator]],
    spfname: [''],
    splname: [''],
    spdob: [''],
    spage: ['',ValidationService.numberValidator],
    spcurrentprofession: [''],
    spaddress: [''],
    spemail: [''],
    spcity: [''],
    spstate: [''],
    spzipcode: [''],
    spphonenumber: ['',[ValidationService.numberValidator]],
    children:this.fb.array([this.initnewRows1()]),
    agree: [''],
  });
  initnewRows1(): FormGroup {
    return this.fb.group({
      cname: [''],
      cpdob: [''],
      cgender: [''],
    });
  }
  addNewRow1() {
    this.formArray1.push(this.initnewRows1());
  }
  deleteRow1(index: number) {
    this.formArray1.removeAt(index);
  }
  get formArray1() {
    return this.womenswing.get('children') as FormArray;
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
  PhoneValidator1()
  {
    if(this.womenswing.controls['phonenumber'].valid)
    {
     if(this.womenswing.value.phonenumber !="")
      {
          const formData = new FormData();
          formData.append('phone_number',this.womenswing.value.phonenumber);
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
  PhoneValidator2()
  {
    if(this.womenswing.controls['spphonenumber'].valid)
    {
     if(this.womenswing.value.spphonenumber !="")
      {
          const formData = new FormData();
          formData.append('phone_number',this.womenswing.value.spphonenumber);
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
  reset()
  {
    this.womenswing.reset();
  }
  submit()
  {
    var dob = (new Date(this.womenswing.value.dob)).toLocaleDateString();
    var anniversary = (new Date(this.womenswing.value.anniversarydate)).toLocaleDateString();
    var sdob = (new Date(this.womenswing.value.spdob)).toLocaleDateString();
  
    this.womenswing.markAllAsTouched();
    if(this.womenswing.valid  && this.invalidPhoneLength == false && this.invalidPhoneLength1 == false)
    {
      this.spinner.show();
    const formData = new FormData();
    formData.append('name',this.womenswing.value.firstname+this.womenswing.value.lastname);
    formData.append('dob',dob);
    formData.append('age',this.womenswing.value.age);
    formData.append('maritialstatus',this.womenswing.value.maritialstatus);
    formData.append('marriageanniversary',anniversary);
    formData.append('highestqualification',this.womenswing.value.highqualification);
    formData.append('currentprofession',this.womenswing.value.currentprofession);
    formData.append('permanentaddress',this.womenswing.value.currentaddress);
    formData.append('email',this.womenswing.value.email);
    formData.append('city',this.womenswing.value.city);
    formData.append('state',this.womenswing.value.state);
    formData.append('zipcode',this.womenswing.value.zipcode);
    formData.append('phonenumber',this.womenswing.value.phonenumber);
    formData.append('spousename',this.womenswing.value.spfname+this.womenswing.value.splname);
    formData.append('sdob',sdob);
    formData.append('sage',this.womenswing.value.spage);
    formData.append('scurrentprofession',this.womenswing.value.spcurrentprofession);
    formData.append('saddress',this.womenswing.value.spaddress);
    formData.append('semail',this.womenswing.value.spemail);
    formData.append('scity',this.womenswing.value.spcity);
    formData.append('sState',this.womenswing.value.spstate);
    formData.append('szipcode',this.womenswing.value.spzipcode);
    formData.append('sphonenumber',this.womenswing.value.spphonenumber);
    formData.append('childname',this.womenswing.value.cname);
    formData.append('childdob',this.womenswing.value.cpdob);
    formData.append('childgender',JSON.stringify(this.womenswing.value.children));
    this.coperate.womenswing(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(
      (res: any) => {
        if (res.success) {
          this.spinner.hide();

          Swal.fire({
            title: 'REGISTERED SUCESSFULLY!',
            titleText: 'We sent the member Id to your email ID !\n YOUR MEMBER ID   ' + res.reference_no + '\n Thank you',
            width: 600,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['home']);
            }
          })

        }
        else {
          Swal.fire("Unable to process your request");
        }
      }
    );
  }
  

  }
}
