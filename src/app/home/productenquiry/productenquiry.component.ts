import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../../webservice/product/productservice.service';
import { CountryService } from '../../webservice/location/country.service';
import { retryWhen, delay, take } from 'rxjs/operators'
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../webservice/validation/validation.service';
import { SocialloginService } from '../../webservice/joinfree/sociallogin.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-productenquiry',
  templateUrl: './productenquiry.component.html',
  styleUrls: ['./productenquiry.component.css']
})
export class ProductenquiryComponent implements OnInit {
  invalidPhoneLength: boolean;
  public country = [];
  public phonecode = [
    {
      "phonecode": "Ac",
      "country_codes": "IN"
    },

  ];
  productdetail: any;
  public errorMsg;
  selectedcountry: any;
  constructor(private productService: ProductserviceService,private  router: Router,private route:ActivatedRoute, private SocialloginService: SocialloginService,private cookieService: CookieService,private fb: FormBuilder,private _countrymodel: CountryService,private _validation: ValidationService) { }

  ngOnInit() {
    this._countrymodel.getCountrycode()
    .subscribe(data => this.country = data,
      error => this.errorMsg = error);
    
      this.route.params.subscribe(params => {
        const formData = new FormData();
        formData.append('product_id',params['id']);
        formData.append('cemail', this.cookieService.get('memberid'));
        formData.append('oauth', this.cookieService.get('oauth'));
        this.productService.productdetail(formData).subscribe(response=>{
          if(response.success)
          {
              this.productdetail=response.data;
         
             
          }
        
          },error=>console.error('error',error)); 
           
        }); 
        if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) {
          const formData = new FormData();
          formData.append('email', this.cookieService.get('memberid'));
          formData.append('cemail', this.cookieService.get('memberid'));
          formData.append('oauth', this.cookieService.get('oauth'));
          this.SocialloginService.getuserdata(formData).subscribe(
            (res: any) => {
              if (res.success) {
                this.enquiry.patchValue(res.data[0]);
              
              
                if (res.data[0].country != "" && res.data[0].country != "undefined") {
                  const formData = new FormData();
                  formData.append('country', res.data[0].country);
              
                  this.SocialloginService.getphonecodedata(formData).subscribe(data => this.phonecode = data,
                    error => this.errorMsg = error);
                }
    
              };
            }
          );
        }
  }
  enquiry = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, ValidationService.emailValidator]],
    country: ['', Validators.required],
    phonecodes: [''],
    mobile_no: ['', [Validators.required, ValidationService.numberValidator]],
    requirement: ['',Validators.required],
  });
  PhoneValidator()
  {
    if(this.enquiry.controls['mobile_no'].valid)
    {
     if(this.enquiry.value.mobile_no !="" && this.enquiry.value.mobile_no !="")
      {
          const formData = new FormData();
         
          formData.append('phone_number',this.enquiry.value.mobile_no);
          formData.append('country_code',$("#countryc").val());
       
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
  selectChangeCountry(event: any) {

    this.selectedcountry = event.target.value;
    const selectEl = event.target;
    const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-somedata');
    this._countrymodel.getCode(val)
      .subscribe(data => this.phonecode = data,
        error => this.errorMsg = error);
  }
  sendenquiry()
  {
    this.enquiry.markAllAsTouched();
    if (this.enquiry.valid) {
      if(this.invalidPhoneLength==false)
      {
          const formData = new FormData();
          formData.append('cemail', this.cookieService.get('memberid'));
          formData.append('oauth', this.cookieService.get('oauth'));
          formData.append('name',this.enquiry.value.name);
          formData.append('email',this.enquiry.value.email);
          formData.append('phone',this.enquiry.value.mobile_no);
          formData.append('country',this.enquiry.value.country);
          formData.append('product_id',this.productdetail.product_id);
          formData.append('requirement',this.enquiry.value.requirement);
          this.productService.sendenquiry(formData).subscribe(response=>{
            if(response.success)
            {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'enqiry submitted successfully'
              })
               
            }
            else
            {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'error',
                title: 'Process failed'
              })
            }
          
            },error=>console.error('error',error)); 
      }
    }
  }
}
