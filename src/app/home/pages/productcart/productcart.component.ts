import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../../../webservice/product/productservice.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { retryWhen, delay, take } from 'rxjs/operators'

@Component({
  selector: 'app-productcart',
  templateUrl: './productcart.component.html',
  styleUrls: ['./productcart.component.css']
})
export class ProductcartComponent implements OnInit {
  mycart: any;
  carttotal: any;
  isempty: boolean;
  cartship: any;
  finaltotal: any;

  constructor(private productService: ProductserviceService,private  router: Router,private route:ActivatedRoute,private cookieService: CookieService) { }

  ngOnInit() {
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) 
    {
      const formData = new FormData();
      formData.append('cemail', this.cookieService.get('memberid'));
      formData.append('oauth', this.cookieService.get('oauth'));
      this.productService.getcart(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
        if(response.success)
        {
             this.mycart=response.data.productlist;
             this.carttotal=response.data.subtotal;
             this.cartship=response.data.shippingcharge;
             this.finaltotal=response.data.total;
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
  removecart(index)
  {
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) 
    {
      const formData = new FormData();
      formData.append('cemail', this.cookieService.get('memberid'));
      formData.append('oauth', this.cookieService.get('oauth'));
      formData.append('cartid',index);
      this.productService.removecart(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
        if(response.success)
        {
             this.mycart=response.data.productlist;
             this.carttotal=response.data.subtotal;
             this.cartship=response.data.shippingcharge;
             this.finaltotal=response.data.total;
             $("#cartcount").html(response.data.cartcount);
             if(response.data.cartcount!=0)
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
  removequantity(index,mquants)
  {
       
          
        var cq= $("#"+index).val();
        cq=cq-1;
        
        if(cq!=0 && parseInt(cq)>=mquants) 
        {
            $("#"+index).val(cq);
            const formData = new FormData();
            formData.append('cemail', this.cookieService.get('memberid'));
            formData.append('oauth', this.cookieService.get('oauth'));
            formData.append('quantity',cq);
            formData.append('cartid',index);
            this.productService.updatecart(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
              if(response.success)
              {
                  this.mycart=response.data.productlist;
                  this.carttotal=response.data.subtotal;
                  this.cartship=response.data.shippingcharge;
             this.finaltotal=response.data.total;
              }
            
              },error=>console.error('error',error)); 
        }
        else
        {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'error',
            title: 'minimium order  quantity is '+mquants
          })
        }
       
  }
  addquantity(index,mquants)
  {
    var cq= $("#"+index).val();
    cq=parseInt(cq) + 1;
    var str = mquants; 
    var matches = str.match(/(\d+)/); 
    if(parseInt(cq)<=matches[0])
    {
      
        $("#"+index).val(parseInt(cq));
        const formData = new FormData();
        formData.append('cemail', this.cookieService.get('memberid'));
        formData.append('oauth', this.cookieService.get('oauth'));
        formData.append('quantity',cq);
        formData.append('cartid',index);
        this.productService.updatecart(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
          if(response.success)
          {
              this.mycart=response.data.productlist;
              this.carttotal=response.data.subtotal;
              this.cartship=response.data.shippingcharge;
             this.finaltotal=response.data.total;
          }
          else
          {
            Swal.fire({
              position: 'top-end',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          }
        
          },error=>console.error('error',error)); 
    }
    else
    {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'maximium quantity is '+matches[0]
      })
    }
     
  }
}
