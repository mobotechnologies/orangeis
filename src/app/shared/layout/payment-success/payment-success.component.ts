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
          $('#orderpayment').hide();
      }
      else {
        $('#spayment').hide();
        $('#orderpayment').show();
      }
    });
  }

}
