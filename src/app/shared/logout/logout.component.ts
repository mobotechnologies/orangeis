import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private cookieService: CookieService,private router: Router) { }

  ngOnInit() {
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
