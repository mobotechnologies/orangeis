import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../../../webservice/product/productservice.service';
import { ValidationService } from '../../../webservice/validation/validation.service';
import { CountryService } from '../../../webservice/location/country.service';
import { FormBuilder,Validators } from '@angular/forms';
import {  SocialloginService } from '../../../webservice/joinfree/sociallogin.service';
import { PaymentService } from 'src/app/webservice/payment/payment.service';
import { retryWhen, delay, take } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';
import {PopoverModule} from "ngx-smart-popover";
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { NgxSpinnerService } from "ngx-spinner";
import {Location} from '@angular/common';

@Component({
  selector: 'app-productshipping',
  templateUrl: './productshipping.component.html',
  styleUrls: ['./productshipping.component.css']
})
export class ProductshippingComponent implements OnInit {
  errorMsg: any;
  selectedcountry: any;
  invalidPhoneLength: boolean;
 
  public userData = [];
  userName = "";
  userEmail = "";
  userMobile = "";
  userId = "";
  public paymentValues = [];
  payKit
  amt
  public PayingAmt
  showinput: boolean;
  cartship: any;
  finaltotal: any;

  constructor(private productService: ProductserviceService,private location: Location, private spinner: NgxSpinnerService,private  router: Router,private _payment: PaymentService,private fb: FormBuilder,private SocialloginService: SocialloginService,private route:ActivatedRoute,private cookieService: CookieService,private _countrymodel:CountryService,private _validation:ValidationService) { 

    console.log('state >>>', history.state);
    console.log('location >>>', this.location.getState());
    const val: any = this.location.getState();
    const keys:any = Object.keys(val);

    if(val["type"]=="directbuy")
    {
         this.showinput=true;
    }
    else
    {
      this.showinput=false;
    }
  }
  mycart: any;
  carttotal: any;
 
  public country = [];
  public states = [];
  public phonecode = [
    {
      "phonecode": "Ac",
      "country_codes": "IN"
    },

  ];
  ngOnInit() {
   
    this._countrymodel.getCountrycode()
    .subscribe(data => this.country = data,
      error => this.errorMsg = error);
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) 
    {
      const formData = new FormData();
      formData.append('cemail', this.cookieService.get('memberid'));
      formData.append('email', this.cookieService.get('memberid'));
      formData.append('oauth', this.cookieService.get('oauth'));
      this.productService.getcart(formData).subscribe(response=>{
        if(response.success)
        {
             this.mycart=response.data.productlist;
             this.carttotal=response.data.subtotal;
             this.cartship=response.data.shippingcharge;
             this.finaltotal=response.data.total;
        }
        else
        {
            
          Swal.fire({
            title: 'Empty cart',
            titleText:'Add item to your cart',
            width: 600,
            allowOutsideClick:false,
                                    }).then((result) => {
        if(result.value)
        {
          this.router.navigate(['productlisting']);
        }
      })
        }
      
        },error=>console.error('error',error)); 
        this.productService.getshippingaddress(formData).subscribe(response=>{
          if(response.success)
          {
            const formData = new FormData();
            formData.append('country', response.data.country);
            this.SocialloginService.getstatedata(formData).subscribe(data => this.states = data,
              error => this.errorMsg = error);
               this.shippingaddress.patchValue({state:response.data.state});
            this.SocialloginService.getphonecodedata(formData).subscribe(data => this.phonecode = data,
              error => this.errorMsg = error);
            this.shippingaddress.patchValue(response.data);
            this.invalidPhoneLength=false;
               
          }
        
          },error=>console.error('error',error)); 
        this.SocialloginService.getuserdata(formData).subscribe(
          (res: any) => console.log(this.userData = res),
          error => this.errorMsg = error
  
        );
    }
    else 
    {
        this.router.navigate(["register","login"]);  
    } 
  }
  getshippingaddress()
  {
        const formData = new FormData();
        formData.append('cemail', this.cookieService.get('memberid'));
        formData.append('email', this.cookieService.get('memberid'));
        formData.append('oauth', this.cookieService.get('oauth'));
        this.productService.getshippingaddress(formData).subscribe(response=>{
          if(response.success)
          {
            this.shippingaddress.patchValue(response.data);
                const formData = new FormData();
                formData.append('country', response.data.country);
                this.SocialloginService.getstatedata(formData).subscribe(data => this.states = data,
                  error => this.errorMsg = error);
                this.SocialloginService.getphonecodedata(formData).subscribe(data => this.phonecode = data,
                  error => this.errorMsg = error);
                  this.shippingaddress.patchValue(response.data);
                 
                  this.invalidPhoneLength=false;
               
          }
        },error=>console.error('error',error)); 
  }
  getpermanentaddress()
  {
    const formData = new FormData();

    formData.append('email', this.cookieService.get('memberid'));
    formData.append('cemail', this.cookieService.get('memberid'));
    formData.append('oauth', this.cookieService.get('oauth'));

    this.SocialloginService.getuserdata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(
      (res: any) => {
       
        if (res.success) {

            this.shippingaddress.patchValue(res.data[0]);
           
            const formData = new FormData();
            formData.append('country', res.data[0].country);

            this.SocialloginService.getstatedata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.states = data,
              error => this.errorMsg = error);
            this.SocialloginService.getphonecodedata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.phonecode = data,
              error => this.errorMsg = error);
             
        };
      }
    );
    this.SocialloginService.getusercompanydata(formData).subscribe((res: any) => {
      
          this.shippingaddress.patchValue({
            name:res.data.contact_person_name,
            company:res.data.company_name,
            address:res.data.address1,
            state:res.data.state,
            city:res.data.city,
            email:res.data.email,
            phone:res.data.mobile_no
          });
          this.shippingaddress.setValue({postal_code:res.data.postal_code});
    },error => console.error('error', error));
  }
  shippingaddress=this.fb.group({
    name:['',[Validators.required]],
    company:[''],
    address:['',[Validators.required]],
    apartment:[''],
    country:['',[Validators.required]],
    city:['',[Validators.required]],
    state:['',[Validators.required]],
    postal_code:['',[Validators.required]],
    email:['',[Validators.required,ValidationService.emailValidator]],
    countrycode:[''],
    phone:['',[Validators.required]]
  });

  selectChangeCountry (event: any) 
  {
    this.selectedcountry = event.target.value;
    const selectEl = event.target;
    const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-somedata');
    this._countrymodel.getStates(val)
    .subscribe(data => this.states = data ,
      error => this.errorMsg = error);
    this._countrymodel.getCode(val)
    .subscribe(data => this.phonecode = data ,
    error => this.errorMsg = error);
  }
  PhoneValidator()
  {
    if(this.shippingaddress.controls['phone'].valid)
    {
     if(this. shippingaddress.value.phone !="" && this.shippingaddress.value.phone !="")
      {
          const formData = new FormData();
         
          formData.append('phone_number',this.shippingaddress.value.phone);
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
  placeorder()
  {
    this.shippingaddress.markAllAsTouched();
    if (this.shippingaddress.valid) {
      if(this.invalidPhoneLength==false)
      {
        this.spinner.show();
                for (var i = 0; this.userData['data'].length > i; i++) {

                  console.log(this.userData['data'][i].email);
                  this.userName = this.userData['data'][i].name;
                  this.userEmail = this.userData['data'][i].email;
                  this.userMobile = this.userData['data'][i].mobile_no;
                  this.userId = this.userData['data'][i].user_id;

                }
                      const formData = new FormData();
                      formData.append('cemail', this.cookieService.get('memberid'));
                      formData.append('oauth', this.cookieService.get('oauth'));
                      formData.append('name',this.shippingaddress.value.name);
                      formData.append('company',this.shippingaddress.value.company);
                      formData.append('address',this.shippingaddress.value.address);
                      formData.append('apartment',this.shippingaddress.value.apartment);
                      formData.append('country',this.shippingaddress.value.country);
                      formData.append('state',this.shippingaddress.value.state);
                      formData.append('city',this.shippingaddress.value.city)
                      formData.append('postal_code',this.shippingaddress.value.postal_code);
                      formData.append('email',this.shippingaddress.value.email);
                      formData.append('phone',this.shippingaddress.value.phone);
                      this.productService.placeorder(formData).subscribe(response=>{
                            if(response.success)
                            {
                            
                              const paymentValues = new FormData();
                              paymentValues.append('cemail', this.cookieService.get('memberid'));
                              paymentValues.append('oauth', this.cookieService.get('oauth'));
                              paymentValues.append('userId', this.userId);
                              paymentValues.append('userName', this.userName);
                              paymentValues.append('userEmail', this.userEmail);
                              paymentValues.append('userMobile', this.userMobile);
                              paymentValues.append('payAmount',this.carttotal);
                              paymentValues.append('purpose', "Orderconfirmation");
                              this._payment.orderpayment(paymentValues).subscribe(
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
                            else
                            {
                              
                                  Swal.fire("process failed");
                            }
                      
                        },error=>console.error('error',error)); 
                      }
                      }
                      else
                      {

                      }
  }
  addquantity(index,mquants)
  {
    var cq= $("#"+index).val();

    var str = mquants; 
    
    var matches = str.match(/(\d+)/); 
    if(parseInt(cq)<=matches[0])
    {
      
        $("#"+index).val(parseInt(cq));
        const formData = new FormData();
        formData.append('cemail', this.cookieService.get('memberid'));
        formData.append('oauth', this.cookieService.get('oauth'));
        formData.append('quantity',cq);
        formData.append('cartid',index);
        this.productService.updatecart(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
          if(response.success)
          {
              this.mycart=response.data.productlist;
              this.carttotal=response.data.subtotal;
              
          }
          else
          {
            Swal.fire({
              position: 'top-end',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          }
        
          },error=>console.error('error',error)); 
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
        title: 'maximium quantity is '+matches[0]
      })
    }
     
  }
}

