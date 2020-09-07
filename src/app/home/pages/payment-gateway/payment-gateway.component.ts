import { Component, OnInit } from '@angular/core';
import { SocialloginService } from '../../../webservice/joinfree/sociallogin.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from 'src/app/webservice/payment/payment.service';
import 'rxjs/add/operator/filter';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  public userData = [];
  userName = "";
  userEmail = "";
  userMobile = "";
  userId = "";
  durationAmt
  public paymentValues = [];
  errorMsg: any;
  payKit
  amt
  public PayingAmt
  public choosenPlanName
  public plan_duration
  constructor(private route: ActivatedRoute, private router: Router, private dhanus: HttpClient, private cookieService: CookieService, private SocialloginService: SocialloginService, private _payment: PaymentService) {

    // this.dhanus.get("https://www.famposo.com/testsoftlaunch/api/pay.php").subscribe();
  }

  ngOnInit() {
    $(document).ready(function (e) {

      //Define Defaults - Elements to be targets by user interaction/events
      var $defaults = {
        navigation: $('nav#navigation'), overlayDiv: $('#overlay'), menuTextIcons: $('.menu-text-icons'),
        menuText: $('.menu-text'), menuItemsContainer: $('.menu-items-container')
      }

      $defaults.menuItemsContainer.add($defaults.overlayDiv).fadeIn('slow');
      $defaults.menuTextIcons.addClass("effect-menu-text-icons");
      $defaults.menuText.addClass("effect-menu-text");
      e.stopPropagation();

    });
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) {
      const formData = new FormData();

      formData.append('email', this.cookieService.get('memberid'));

      formData.append('oauth', this.cookieService.get('oauth'));

      this.SocialloginService.getuserdata(formData).subscribe(
        (res: any) => console.log(this.userData = res),
        error => this.errorMsg = error

      );
      this.route.queryParams
        .filter(params => params.planAmt)
        .subscribe(params => {
          // console.log('dfx');
          // console.log(params); // {subscription: "details"}
          this.PayingAmt = params.planAmt * 12;
          this.choosenPlanName = params.planName;
          // console.log(this.PayingAmt); // Amount
          // console.log(this.choosenPlanName); // Plan Name
          this.plan_duration = "Yearly";

        });

    }
    else {
      //  this.router.navigate(["register","login"]);  
    }

  }

  duration(e) {
    // console.log(this.PayingAmt);
    // console.log('dfdf');
    if (e.target.checked) {
      console.log('cheched', this.PayingAmt * 12);
      this.PayingAmt = this.PayingAmt * 12;
      this.plan_duration = "Yearly";
    } else {

      console.log('un cheched', this.PayingAmt / 12);
      this.PayingAmt = this.PayingAmt / 12;
      this.plan_duration = "Monthly";
    }
    // this.durationAmt = this.amts;
    // console.log(this.durationAmt);
  }
  payNow() {
    // console.log('ff');
    // console.log(this.userData['data']);
    //  console.log(this.userData['data'].length);
    for (var i = 0; this.userData['data'].length > i; i++) {

      console.log(this.userData['data'][i].email);
      this.userName = this.userData['data'][i].name;
      this.userEmail = this.userData['data'][i].email;
      this.userMobile = this.userData['data'][i].mobile_no;
      this.userId = this.userData['data'][i].user_id;

    }

    const paymentValues = new FormData();

    paymentValues.append('userId', this.userId);
    paymentValues.append('userName', this.userName);
    paymentValues.append('userEmail', this.userEmail);
    paymentValues.append('userMobile', this.userMobile);
    paymentValues.append('payAmount', this.PayingAmt);
    paymentValues.append('plan_id', '1');
    paymentValues.append('purpose', this.choosenPlanName);
    paymentValues.append('plan_duration', this.plan_duration);



    this._payment.paymentCall(paymentValues).subscribe(
      apiResponse => {
        console.log(this.payKit = apiResponse);
        // console.log(this.payKit.success);
        if (this.payKit.success == true) {
          //console.log('dd');
          console.log(this.payKit.payment_request.longurl);
          window.location.href = this.payKit.payment_request.longurl;
        }
        else {
          Swal.fire({
            title: 'Oops !',
            titleText: 'Your Company information must be complete before your subcription plan',
            width: 600,
            allowOutsideClick: false,
            confirmButtonText: 'Company Setup'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/consumeraccountsetup']);
            }
          })
          console.log('Payment Error');
        }


      });
  }


}
