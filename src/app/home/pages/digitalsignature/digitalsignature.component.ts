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

@Component({
  selector: 'app-digitalsignature',
  templateUrl: './digitalsignature.component.html',
  styleUrls: ['./digitalsignature.component.css']
})
export class DigitalsignatureComponent implements OnInit {
  country: import("f:/Famposov3/client/src/app/model/location/country").Countrymodel[];
  errorMsg: any;
  states: any;
  phonecode: any;
  cities: any;
  payKit: any;

  constructor(private spinner: NgxSpinnerService, private cookieService: CookieService, private _countrymodel: CountryService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private _validation: ValidationService,private coperate:CooperateserviceService) {
    this._countrymodel.getCountrycode()
    .subscribe(data => this.country = data,
      error => this.errorMsg = error);
   }

  ngOnInit() {
  }
  digitalsign = this.fb.group({
    commonname: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    emailid: ['', [Validators.required]],
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
    mobileno: ['', [Validators.required]],
    locality: ['', [Validators.required]],
    address: ['', [Validators.required]],
    photo: ['', [Validators.required]],
    pancard: ['', [Validators.required]],
    aadharcard: ['', [Validators.required]],
    includemailid: ['', [Validators.required]],
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
  submitandpay()
  {
      
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
      formData.append('dob',this.digitalsign.value.dob);
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
