import { Component, OnInit } from '@angular/core';

import { CountryService } from '../../../webservice/location/country.service';
import { ValidationService } from '../../../webservice/validation/validation.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie-service';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { retryWhen, delay, take } from 'rxjs/operators'
import { AuthService } from "ng-dynami-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from "ng-dynami-social-login";
import { SocialloginService } from '../../../webservice/joinfree/sociallogin.service';
import { RequestquoteService } from '../../../webservice/requestforquote/requestquote.service';
import * as $ from 'jquery';



declare function timer(remaining: any);
declare var IN: any;


@Component({
  selector: 'app-joinfree',
  templateUrl: './joinfree.component.html',
  styleUrls: ['./joinfree.component.css']
})

export class JoinfreeComponent implements OnInit {

  public country = [];
  public states = [];
  public phonecode = [
    {
      "phonecode": "Ac",
      "country_codes": "IN"
    },

  ];

  public errorMsg;
  return: string = '';
  cresponse: string;
  socialusers: any;
  response: any;
  displaybtn: any;
  rememberme: boolean;
  public isEnabled;
  public datetime;
  public count;
  invalidPhoneLength: boolean;
  invalidPhoneExist: boolean;
  invalidEmailExist: any;
  invalidotp: boolean;
  isTextFieldType: boolean;
  invalidFEmailExist: boolean;
  iscEnabled: boolean;

  constructor(private spinner: NgxSpinnerService, private cookieService: CookieService, private _countrymodel: CountryService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private _validation: ValidationService, private OAuth: AuthService, private SocialloginService: SocialloginService, private _requestquote: RequestquoteService) {

    this._countrymodel.getCountrycode()
      .subscribe(data => this.country = data,
        error => this.errorMsg = error);
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) {
      this.router.navigate(['consumeraccountsetup']);
    }

  }
  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }
  joinfree = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, ValidationService.emailValidator]],
    country: ['', Validators.required],
    phonecodes: [''],
    countrycode: [''],
    mobile_no: ['', [Validators.required, ValidationService.numberValidator]],
    otp: ['', ValidationService.numberValidator],
    agree: ['', Validators.required]
  });


  login = this.fb.group({
    memberid: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [''],
    recaptchaReactive: [''],
  });
  otpform = this.fb.group({
    otp: ['', [Validators.required, ValidationService.numberValidator]],
  });
  forgotemailform = this.fb.group({
    email: ['', [Validators.required, ValidationService.emailValidator]],
  });
  ngOnInit(): void {
    if (this.cookieService.check('remember')) {
      if (this.cookieService.get('remember') == "true") {
        this.login.patchValue({ memberid: this.cookieService.get('memberid') });
        this.login.patchValue({ password: this.cookieService.get('password') });
        this.isEnabled = true;
      }
    }
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) {

      this.router.navigate(['consumeraccountsetup']);
    }
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/popup');


    this.route.params.subscribe(params => {
      let mode = params['logs'];
      if (mode == 'signup') {
        $(".joinfree-login").hide();
        $(".joinfree-signin").show();
        $(".signin-btn").hide();
        $(".login-btn").show();
        $('.signin-btn').trigger("click");
      }
      else {
        $(".joinfree-signin").hide();
        $(".joinfree-login").show();
        $(".signin-btn").show();
        $(".login-btn").hide();
      }
    });
    $('.joinfree-popup-btn').click(function () {

      var popupBlock = $("#joinfree-popup");
      popupBlock.addClass('active')
        .find('.fade-out').click(function () {
          popupBlock.css('opacity', '0').find('.popup-content').css('margin-top', '350px');
          setTimeout(function () {
            $('.popup').removeClass('active');
            popupBlock.css('opacity', '').find('.popup-content').css('margin-top', '');
          }, 300);
        });
    });
    $('.forgot-popup-btn ').click(function () {

      var popupBlock = $("#forgot-popup");
      popupBlock.addClass('active')
        .find('.fade-out').click(function () {
          popupBlock.css('opacity', '0').find('.popup-content').css('margin-top', '350px');
          setTimeout(function () {
            $('.popup').removeClass('active');
            popupBlock.css('opacity', '').find('.popup-content').css('margin-top', '');
          }, 300);
        });
    });

  }
  emailexist() {
    if (this.joinfree.value.email != "") {
      const formData = new FormData();
      formData.append('email', this.joinfree.value.email);

      this.SocialloginService.emailexist(formData).subscribe(response => {
        if (response.success) {
          this.invalidEmailExist = false;
        }
        else {
          this.invalidEmailExist = true;
        }
      }, error => console.error('error', error));
    }

  }
  forgotemailcheck() {
    if (this.forgotemailform.controls['email'].valid) {
      const formData = new FormData();
      formData.append('email', this.forgotemailform.value.email);

      this.SocialloginService.emailexist(formData).subscribe(response => {
        if (response.success) {
          this.invalidFEmailExist = true;
        }
        else {
          this.invalidFEmailExist = false;
        }
      }, error => console.error('error', error));
    }

  }
  otpvalidator() {
    if (this.otpform.value.otp != "") {
      const formData = new FormData();
      formData.append('otp', this.otpform.value.otp);

      this.SocialloginService.otpvalid(formData).subscribe(response => {
        if (response.success) {
          this.invalidotp = false;
        }
        else {
          this.invalidotp = true;
        }
      }, error => console.error('error', error));

    }
  }
  PhoneValidator() {
    if (this.joinfree.value.countrycode != "" && this.joinfree.value.mobile_no != "") {
      const formData = new FormData();
      formData.append('phone_number', this.joinfree.value.mobile_no);
      formData.append('country_code', this.joinfree.value.countrycode);

      this.SocialloginService.phonelengthvalidator(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response => {
        if (response.success) {
          this.invalidPhoneLength = false;
          const formData = new FormData();
          formData.append('mobile_no', this.joinfree.value.mobile_no);
          this.SocialloginService.mobilexist(formData).subscribe(response => {
            if (response.success) {
              this.invalidPhoneExist = false;
            }
            else {
              this.invalidPhoneExist = false;
            }
          }, error => console.error('error', error));
        }
        else {
          this.invalidPhoneLength = true;
          
        }
      }, error => console.error('error', error));
    }


  }
  public timerOn = true;
  timer(remaining: number) {

    var m: any = Math.floor(remaining / 60);
    var s: any = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = m + ':' + s;
    remaining -= 1;

    if (remaining >= 0 && this.timerOn) {
      setTimeout(() => {
        this.timer(remaining);
      }, 1000);
      return;
    }

    if (!this.timerOn) {

      return;
    }

    this.displaybtn = true;

  }

  public coun;
  sendotp() {


    this.joinfree.markAllAsTouched();
    if (this.joinfree.controls['agree'].valid) {
      if (this.joinfree.valid && this.invalidPhoneExist == false && this.invalidPhoneLength == false && this.invalidEmailExist == false) {

        this.displaybtn = false;
        var popupBlock = $("#otp-popup");
        popupBlock.addClass('active')
          .find('.fade-out').click(function () {
            popupBlock.css('opacity', '0').find('.popup-content').css('margin-top', '350px');
            setTimeout(function () {
              $('.popup').removeClass('active');
              popupBlock.css('opacity', '').find('.popup-content').css('margin-top', '');
            }, 300);
          });
        const formData = new FormData();
        formData.append('email', this.joinfree.value.email);
        this.spinner.show();
        this.SocialloginService.otp(formData).subscribe((res: any) => {
          this.spinner.hide();
          if (res.success) {

            $('#otp').val('');
            this.timer(180);

          }
          else {
            $(".main-btn-circle").trigger('click');
            $("#otp-popup").removeClass('active');
            $("#otp-popup").css('opacity', '').find('.popup-content').css('margin-top', '');
            this.timer(0);
            this.timerOn = false;
            Swal.fire(res.message);
            this.otpform.reset();
            $('#otp').val('');
          }
        })
      }
      
    }
    else {
      Swal.fire('Kindly agree with famposo terms and conditions');
    }
  }
  resend() {





    this.displaybtn = false;
    var popupBlock = $("#otp-popup");
    popupBlock.addClass('active')
      .find('.fade-out').click(function () {
        popupBlock.css('opacity', '0').find('.popup-content').css('margin-top', '350px');
        setTimeout(function () {
          $('.popup').removeClass('active');
          popupBlock.css('opacity', '').find('.popup-content').css('margin-top', '');
        }, 300);
      });
    const formData = new FormData();
    formData.append('email', this.joinfree.value.email);
    this.spinner.show();
    this.SocialloginService.otp(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
      this.spinner.hide();
      if (res.success) {
        this.invalidotp = false;
        $('#otp').val('');
        this.timer(180);
      }
      else {
        $("#otp-popup").removeClass('active');
        $("#otp-popup").css('opacity', '').find('.popup-content').css('margin-top', '');
        Swal.fire(res.message);
        this.otpform.reset();
        $('#otp').val('');
      }
    })


  }
  forgotpopups() {
    $('.forgot-popup-btn').trigger("click");
  }
  forgotemaillink() {
    const formData = new FormData();
    formData.append('email', this.forgotemailform.value.email);
    if (this.forgotemailform.controls['email'].valid) {
      if( this.invalidFEmailExist == false)
      {
      $("#email").val('');
          this.spinner.show();
          this.SocialloginService.forgotemail(formData).subscribe((res: any) => {
            this.spinner.hide();
            if (res.success) {
              $("#forgot-popup").removeClass('active');
              $("#forgot-popup").css('opacity', '').find('.popup-content').css('margin-top', '');
              Swal.fire("Password reset link is sent to your mail");
            }
            else {
              $("#forgot-popup").removeClass('active');
              $("#forgot-popup").css('opacity', '').find('.popup-content').css('margin-top', '');
              Swal.fire("Error your request could not be proceeded");
            }
          });
        }
    }
   

  }
  selectedcountry: string = '';
  selectedstates: string = '';
  handleChecked(isChecked)
  {
    if (isChecked.target.checked) {
      this.iscEnabled=true;
      alert(this.iscEnabled);
    }
    else
    {
      this.iscEnabled=false;
      alert(this.iscEnabled);
    }
  }
  joinnow() {
    this.joinfree.markAllAsTouched();
    
    if (this.iscEnabled==true) {
      if (this.joinfree.valid) {

        if (this.invalidotp == false) {

          const formData = new FormData();
          formData.append('name', this.joinfree.value.name);
          formData.append('email', this.joinfree.value.email);
          formData.append('country', this.joinfree.value.country);
          formData.append('phone', this.joinfree.value.mobile_no);
          formData.append('countrycode', this.joinfree.value.countrycode);
          formData.append('oauthprovider', "JoinNow");
          formData.append('joinmode', "joinfree");
          formData.append('registrationtype', "JoinNow");
          this.Savesresponse(formData);
        }


      }
    }
    else {
      Swal.fire('Kindly agree with famposo terms and conditions');
    }
  }

  facebook() {
    this.OAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(async (socialusers) => {

      const formData = new FormData();
      formData.append('id', socialusers.id);
      formData.append('name', socialusers.name);
      formData.append('email', socialusers.email);
      formData.append('oauthprovider', socialusers.provider);
      formData.append('joinmode', "joinfree");
      formData.append('registrationtype', "socialmedia");
      this.SocialloginService.verify_oauthid(formData).subscribe((res: any) => {
        if (res.success) {
          this.Savesresponse(formData);
        }
        else {
          Swal.fire("Your account already exist kindly do sign in");
        }
      });


    })
  }
  google() {

    this.OAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialusers => {

      const formData = new FormData();
      formData.append('id', socialusers.id);
      formData.append('name', socialusers.name);
      formData.append('email', socialusers.email);
      formData.append('oauthprovider', socialusers.provider);
      formData.append('joinmode', "joinfree");
      formData.append('registrationtype', "socialmedia");
      this.SocialloginService.verify_oauthid(formData).subscribe((res: any) => {
        if (res.success) {
          this.Savesresponse(formData);
        }
        else {
          Swal.fire("Your account already exist kindly do sign in");
        }
      });
    })
  }
  Savesresponse(socialusers) {
    this.spinner.show();
    this.SocialloginService.Savesresponse(socialusers).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
      this.spinner.hide();
      if (res.success) {
        if (res.reference_no != false) {
          $("#otp-popup").removeClass('active');
          $("#otp-popup").css('opacity', '').find('.popup-content').css('margin-top', '');
          $('#otp').val('');

          Swal.fire({
            title: 'Famposo team received your request!',
            titleText: 'We have sent you the Login Credential to your registered email ID\n Reference_no   ' + res.reference_no + '\n Thank you',
            width: 600,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.value) {
              this.router.navigate(["register", "login"]);
            }
          })
        }
        else {

          Swal.fire({
            title: 'Famposo team received your request!',
            titleText: 'Registered successfully\n Thank you',
            width: 600,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.value) {
              this.router.navigate(["register", "login"]);
            }
          })
        }
      }
      else {
        Swal.fire("Registration failed");
      }
    })

  }
  selectChangeCountry(event: any) {

    this.selectedcountry = event.target.value;
    const selectEl = event.target;
    const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-somedata');
    this._countrymodel.getStates(val)
      .subscribe(data => this.states = data,
        error => this.errorMsg = error);
    this._countrymodel.getCode(val)
      .subscribe(data => this.phonecode = data,
        error => this.errorMsg = error);
  }
  handleSelected($event) {
    if ($event.target.checked === true) {

      this.rememberme = true;


    }
    else {
      this.rememberme = false;

    }
  }
  log() {


    this.login.markAllAsTouched();
    if (this.login.valid) {


      const formData = new FormData();
      formData.append('memberid', this.login.value.memberid);
      formData.append('password', this.login.value.password);
      formData.append('registrationtype', "JoinNow");


      this.SocialloginService.verifyuser(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {

        if (res.success) {
          this.cookieService.set('memberid', this.login.value.memberid);
          this.cookieService.set('password', this.login.value.password);
          this.cookieService.set('name', res.name);
        
          if (this.rememberme == true) {

            this.cookieService.set('remember', "true");

          }
          localStorage.setItem('token', res.success);

          this.router.navigateByUrl(this.return);
          $("#signedin").hide();
          $("#loggedin").show();
          $("#username").html(res.name);
         
        }
        else {
          $("#signedin").show();
          $("#loggedin").hide();
          Swal.fire("Invalid username or password");
        }
      })
    }
  }
  googlelog() {
    this.OAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (socialusers) => {
      const formData = new FormData();
      formData.append('id', socialusers.id);
      formData.append('name', socialusers.name);
      formData.append('oauthprovider', socialusers.provider);
      formData.append('registrationtype', "socialmedia");
      this.SocialloginService.verifyuser(formData).subscribe((res: any) => {
        if (res.success) {
          this.cookieService.set('oauth', socialusers.id);
          this.cookieService.set('name', res.name);
          localStorage.setItem('token', res.success);
          $("#signedin").hide();
          $("#loggedin").show();
          $("#username").html(res.name);
          this.router.navigateByUrl(this.return);
          //  Swal.fire({
          //   title: 'Welcome!',
          //   text: "Choose the business type you belong to",
          //   showCancelButton: true,
          //   confirmButtonColor:'#3085d6',
          //   cancelButtonColor: '#3085d6',
          //   cancelButtonText: 'Consumer',
          //   confirmButtonText: 'Company'
          // }).then((result) => {
          //   if (result.value) {
          //     this.router.navigate(['consumeraccountsetup']);
          //   }

          // })
        }
        else {
          $("#signedin").show();
          $("#loggedin").hide();
          Swal.fire({
            title: 'Famposo team received your request!',
            titleText: 'Your Account does not exist, kindly do sign up with our portal',
            width: 600,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.value) {
              this.router.navigate(["register", "signup"]);
            }
          })
        }
      })
    })
  }
  facebooklog() {
    this.OAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(async (socialusers) => {
      const formData = new FormData();
      formData.append('id', socialusers.id);
      formData.append('name', socialusers.name);
      formData.append('oauthprovider', socialusers.provider);
      formData.append('registrationtype', "socialmedia");
      this.SocialloginService.verifyuser(formData).subscribe((res: any) => {
        if (res.success) {
          this.cookieService.set('oauth', socialusers.id);
          this.cookieService.set('name', res.name);
          localStorage.setItem('token', res.success);
          $("#signedin").hide();
          $("#loggedin").show();
          $("#username").html(res.name);
          this.router.navigateByUrl(this.return);


          // Swal.fire({
          //   title: 'Welcome!',
          //   text: "Choose the business type you belong to",
          //   showCancelButton: true,
          //   confirmButtonColor:'#3085d6',
          //   cancelButtonColor: '#3085d6',
          //   cancelButtonText: 'Consumer',
          //   confirmButtonText: 'Company'
          // }).then((result) => {
          //   if (result.value) {
          //     this.router.navigate(['consumeraccountsetup']);
          //   }

          // })
        }
        else {
          $("#signedin").show();
          $("#loggedin").hide();
          Swal.fire({
            title: 'Famposo team received your request!',
            titleText: 'Your Account does not exist, kindly do sign up with our portal',
            width: 600,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.value) {
              this.router.navigate(["register", "signup"]);
            }
          })
        }
      })
    })
  }



}
