import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery';
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      let mode = params['logs'];
      if (mode == 0) {
          $('#spayment').show();
          $('#digitalsignpayment').hide();
          $('#esimonthlyfilpayment').hide();
          $('#gstmonthlyfilpayment').hide();
          $('#esiregpayment').hide();
          $('#gstregpayment').hide();
          $('#orderpayment').hide();
          $('#companyincpayment').hide();
      }
      if(mode==1){
        $('#spayment').hide();
        $('#digitalsignpayment').hide();
        $('#esimonthlyfilpayment').hide();
        $('#gstmonthlyfilpayment').hide();
        $('#esiregpayment').hide();
        $('#gstregpayment').hide();
        $('#orderpayment').show();
        $('#companyincpayment').hide();
      }
      if(mode==2)
      {
        $('#spayment').hide();
        $('#digitalsignpayment').show();
        $('#esimonthlyfilpayment').hide();
        $('#gstmonthlyfilpayment').hide();
        $('#esiregpayment').hide();
        $('#gstregpayment').hide();
        $('#orderpayment').hide();
        $('#companyincpayment').hide();
      }
      if(mode==3)
      {
        $('#spayment').hide();
        $('#digitalsignpayment').hide();
        $('#esimonthlyfilpayment').show();
        $('#gstmonthlyfilpayment').hide();
        $('#esiregpayment').hide();
        $('#gstregpayment').hide();
        $('#orderpayment').hide();
        $('#companyincpayment').hide();
      }
      if(mode==4)
      {
        $('#spayment').hide();
        $('#digitalsignpayment').hide();
        $('#esimonthlyfilpayment').hide();
        $('#gstmonthlyfilpayment').hide();
        $('#esiregpayment').hide();
        $('#gstregpayment').hide();
        $('#orderpayment').hide();
        $('#companyincpayment').show();
      }
      if(mode==5)
      {
        $('#spayment').hide();
        $('#digitalsignpayment').hide();
        $('#esimonthlyfilpayment').hide();
        $('#gstmonthlyfilpayment').show();
        $('#esiregpayment').hide();
        $('#gstregpayment').hide();
        $('#orderpayment').hide();
        $('#companyincpayment').hide();
      }
      if(mode==6)
      {
        $('#spayment').hide();
        $('#digitalsignpayment').hide();
        $('#esimonthlyfilpayment').hide();
        $('#gstmonthlyfilpayment').hide();
        $('#esiregpayment').show();
        $('#gstregpayment').hide();
        $('#orderpayment').hide();
        $('#companyincpayment').hide();
      }
      if(mode==7)
      {
        $('#spayment').hide();
        $('#digitalsignpayment').hide();
        $('#esimonthlyfilpayment').hide();
        $('#gstmonthlyfilpayment').hide();
        $('#esiregpayment').hide();
        $('#gstregpayment').show();
        $('#orderpayment').hide();
        $('#companyincpayment').hide();
      }

    });
  }

}
