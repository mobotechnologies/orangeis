import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../../../webservice/product/productservice.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { retryWhen, delay, take } from 'rxjs/operators'

@Component({
  selector: 'app-productwhishlist',
  templateUrl: './productwhishlist.component.html',
  styleUrls: ['./productwhishlist.component.css']
})
export class ProductwhishlistComponent implements OnInit {
  mycart: any;
  carttotal: any;
  isempty: boolean;
  constructor(private productService: ProductserviceService,private  router: Router,private route:ActivatedRoute,private cookieService: CookieService) { }

  ngOnInit() {
    
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) 
    {
      const formData = new FormData();
      formData.append('cemail', this.cookieService.get('memberid'));
      formData.append('oauth', this.cookieService.get('oauth'));
      this.productService.getfavourite(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
        if(response.success)
        {
             this.mycart=response.data.productlist;
          
             if(response.favcount!=0)
             {
               
                this.isempty=true;
                
             }
             else
             {
              this.isempty=false;
             }
             
        }
        
        },error=>console.error('error',error)); 
    }
    else 
    {
        this.router.navigate(["register","login"]);  
    } 
  }
  removefavourite(index)
  {
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) 
    {
      const formData = new FormData();
      formData.append('cemail', this.cookieService.get('memberid'));
      formData.append('oauth', this.cookieService.get('oauth'));
      formData.append('product_id',index);
      this.productService.deletefavourite(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
        this.mycart=response.data.productlist;
        if(response.favcount!=0)
        {
          
           this.isempty=true;
        }
        else
        {
         this.isempty=false;
        }
      },error=>console.error('error',error));
    }
    else 
    {
        this.router.navigate(["register","login"]);  
    } 
  }

}
