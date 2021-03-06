import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../../../webservice/product/productservice.service';
import { CategoryService } from '../../../webservice/category/category.service';
import {Location} from '@angular/common';
import * as $ from 'jquery';
import { filter } from 'rxjs-compat/operator/filter';
import { retryWhen, delay, take } from 'rxjs/operators'

@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrls: ['./productlisting.component.css']
})
export class ProductlistingComponent implements OnInit {
 public productlist=[];
 public brand=[];
 public subcategory=[];
 public industry=[];


  constructor(private productService: ProductserviceService,private location: Location,private _category:CategoryService) { 
 
  }

  ngOnInit() {
    
    console.log('state >>>', history.state);
    console.log('location >>>', this.location.getState());
    const val: any = this.location.getState();
    const keys:any = Object.keys(val);

    const formData = new FormData();
    formData.append('category',val["category"]);
    formData.append('category_id',val["category"]);
    formData.append('subcategory',val["subcategory"]);
    formData.append('search',val["search"]);
   
    this.productService.getindustry(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
      if(response.success)
      {
        
          this.industry=response.data;
      }
    
      },error=>console.error('error',error));
      this._category.getsubcategoryfilter(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
       
            this.subcategory=response.data;
        
      
        },error=>console.error('error',error));
    this.productService.getbrand(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
      if(response.success)
      {
          this.brand=response.data;
      }
    
      },error=>console.error('error',error)); 
    this.productService.productlist(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
      if(response.success)
      {
       
          this.productlist=response.data;
      }
    
      },error=>console.error('error',error)); 
      $(".search-category").on("change",(e)=>{
        this.productsearch();
        
      });
      $("#subcategory").on("change",(e)=>{
        this.productsearch();
     
      });
      $("#search").on("click",(e)=>{
      
        this.productsearch();
        
      });
      $("#search-input").on("input",(e)=>{
      
        this.productsearch();
        
      });
  }
   productsearch()
   {
    const formData = new FormData();
    formData.append('category',$("#category").val());
    formData.append('subcategory',$("#subcategory").val());
    formData.append('search',$("#search-input").val());
    formData.append('category_id',$("#category").val());
    this._category.getsubcategoryfilter(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
      
          this.subcategory=response.data;
      
    
      },error=>console.error('error',error));
    this.productService.getindustry(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
      if(response.success)
      {
          this.industry=response.data;
      }
    
      },error=>console.error('error',error));
    this.productService.getbrand(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
      if(response.success)
      {
          this.brand=response.data;
      }
    
      },error=>console.error('error',error));
    this.productService.productlist(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
      if(response.success)
      {
          this.productlist=response.data;
      }
    
      },error=>console.error('error',error)); 
   }
   relatedcategory(data:any)
   {
    const formData = new FormData();
    formData.append('category',$("#category").val());
    formData.append('subcategory',data);
    this.productService.productlist(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
      if(response.success)
      {
          this.productlist=response.data;
      }
    
      },error=>console.error('error',error)); 

   }
   brandsearch(data:any)
   {
    const formData = new FormData();
    formData.append('brand',data);
    this.productService.productlist(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
      if(response.success)
      {
          this.productlist=response.data;
      }
    
      },error=>console.error('error',error)); 

   }
   industrysearch(data:any)
   {
    const formData = new FormData();
    formData.append('industry',data);
    this.productService.productlist(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
      if(response.success)
      {
          this.productlist=response.data;
      }
    
      },error=>console.error('error',error)); 

   }

}
