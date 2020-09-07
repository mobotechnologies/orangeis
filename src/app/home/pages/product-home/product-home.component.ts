import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../../../webservice/product/productservice.service';
import {Location} from '@angular/common';
import * as $ from 'jquery';
import { filter } from 'rxjs-compat/operator/filter';
import { retryWhen, delay, take } from 'rxjs/operators'

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {
  public productlist=[];
  public cproductlist=[];
   
  constructor(private productService: ProductserviceService,private location: Location) { }

  ngOnInit() {
    const formData = new FormData();
    this.productService.productlist(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
    
          this.productlist=response.data;
      
    
      },error=>console.error('error',error)); 
      this.productService.clearancesale(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
       
            this.cproductlist=response.data;
        
      
        },error=>console.error('error',error)); 
  }

}
