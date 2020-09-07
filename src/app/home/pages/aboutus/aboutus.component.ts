import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

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
