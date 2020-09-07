import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { retryWhen, delay, take } from 'rxjs/operators'
import { Router } from '@angular/router';
// import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-subcription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubcriptionComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router) { }

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
    $(document).ready(function () {
      $('.popup-btn').click(function () {
        var popupBlock = $('#' + $(this).data('popup'));
        popupBlock.addClass('active')
          .find('.fade-out').click(function () {
            popupBlock.css('opacity', '0').find('.popup-content').css('margin-top', '350px');
            setTimeout(function () {
              $('.popup').removeClass('active');
              popupBlock.css('opacity', '').find('.popup-content').css('margin-top', '');
            }, 300);
          });
      });
    });

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
  }

  // PG intergration calling function

  payment_params(amt, plan) {
    console.log(amt, plan);
    this.router.navigate(['/paymentgateway'], { queryParams: { planAmt: amt, planName: plan }, queryParamsHandling: 'merge' });
    //, skipLocationChange: true
  }


  logout() {
    this.cookieService.delete('memberid');
    this.cookieService.delete('password');
    this.cookieService.delete('oauth');
    this.cookieService.delete('remember');
    localStorage.removeItem('token');
    $("#signedin").show();
    $("#loggedin").hide();
    $("#cartcount").html("0");
    this.router.navigate(["register", "login"]);
  }

}
