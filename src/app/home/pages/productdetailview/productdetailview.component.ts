import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../../../webservice/product/productservice.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { retryWhen, delay, take } from 'rxjs/operators'

@Component({
  selector: 'app-productdetailview',
  templateUrl: './productdetailview.component.html',
  styleUrls: ['./productdetailview.component.css']
})
export class ProductdetailviewComponent implements OnInit {
  productdetail: any;
  isempty: any;
  isemp: boolean;
  isfav: boolean;
  product_clip: any;
  brochuretab1: boolean;
  brochuretab2: boolean;
  brochuretab3: boolean;
  brochuretab4: boolean;
  
  constructor(private productService: ProductserviceService,private  router: Router,private route:ActivatedRoute,private cookieService: CookieService) { }

  ngOnInit() {
    
    $(".mini img").click(function(){  

      $(".maxi").attr("src",$(this).attr("src").replace("100x100","400x400"));
     
     });
     this.route.params.subscribe(params => {
      const formData = new FormData();
      formData.append('product_id',params['id']);
      formData.append('cemail', this.cookieService.get('memberid'));
      formData.append('oauth', this.cookieService.get('oauth'));
      this.productService.productdetail(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
        if(response.success)
        {
         
            this.productdetail=response.data;
            this.product_clip=response.data.product_clip;
            var videoURL = response.data.product_clip;
              var source = $("<source>");
              source.attr("src", videoURL);
              source.attr("type", "video/mp4");
              $("video").append(source);
              let videoextension = response.data.product_clip.substring(response.data.product_clip.lastIndexOf("."));
              if(videoextension==".webm" || videoextension==".mp4" || videoextension==".mpeg" || videoextension==".mkv" || videoextension==".avi")
              {
                $("#videoclip").show();
              }
              else
              {
                $("#videoclip").hide();
              }
            let extension1 = response.data.brochure_img1.substring(response.data.brochure_img1.lastIndexOf("."));
            let extension2 = response.data.brochure_img2.substring(response.data.brochure_img2.lastIndexOf("."));
            let extension3 = response.data.brochure_img3.substring(response.data.brochure_img3.lastIndexOf("."));
            let extension4 = response.data.brochure_img4.substring(response.data.brochure_img4.lastIndexOf("."));
            var fileName_Index1 = response.data.brochure_img1.lastIndexOf("/");
            var  fileName1 = response.data.brochure_img1.substr(fileName_Index1);
            var fileName_Index2= response.data.brochure_img2.lastIndexOf("/");
            var  fileName2 = response.data.brochure_img2.substr(fileName_Index2);
            var fileName_Index3= response.data.brochure_img3.lastIndexOf("/");
            var  fileName3 = response.data.brochure_img3.substr(fileName_Index3);
            var fileName_Index4= response.data.brochure_img4.lastIndexOf("/");
            var  fileName4 = response.data.brochure_img4.substr(fileName_Index4);
            if(extension1==".pdf" || extension1==".PDF")
            {
               $("#brochure1").attr("src","https://www.famposo.com/testsoftlaunch/assets/images/page/pdfthumb.jpg");
               $("#brochurelink1").attr("href",response.data.brochure_img1);;
               $('#brochuretxt1').text(fileName1.substr(1));
               this.brochuretab1=true;
            }
            else if(extension1==".jpeg" || extension1==".jpg")
            {
              $("#brochure1").attr("src",response.data.brochure_img1);
              $("#brochurelink1").attr("href",response.data.brochure_img1);;
              $('#brochuretxt1').text(fileName1.substr(1));
              this.brochuretab1=true;
            }
            else
            {
                 $("#brochurelink1").hide();
                 this.brochuretab1=false;
            }
            if(extension2==".pdf"  || extension2==".PDF")
            {
               $("#brochure2").attr("src","https://www.famposo.com/testsoftlaunch//assets/images/page/pdfthumb.jpg");
               $("#brochurelink2").attr("href",response.data.brochure_img2);;
               $('#brochuretxt2').text(fileName2.substr(1));
               this.brochuretab2=true;
            }
            else if(extension2==".jpeg" || extension2==".jpg")
            {
              $("#brochure2").attr("src",response.data.brochure_img2);
              $("#brochurelink2").attr("href",response.data.brochure_img2);;
              $('#brochuretxt2').text(fileName2.substr(1));
              this.brochuretab2=true;
            }
            else
            {
                 $("#brochurelink2").hide();
                 this.brochuretab2=false;
            }
            if(extension3==".pdf"  || extension3==".PDF")
            {
               $("#brochure3").attr("src","https://www.famposo.com/testsoftlaunch/assets/images/page/pdfthumb.jpg");
               $("#brochurelink3").attr("href",response.data.brochure_img3);;
               $('#brochuretxt3').text(fileName3.substr(1));
               this.brochuretab3=true;
            }
            else if(extension3==".jpeg" || extension3==".jpg")
            {
              $("#brochure3").attr("src",response.data.brochure_img3);
              $("#brochurelink3").attr("href",response.data.brochure_img3);;
              $('#brochuretxt3').text(fileName3.substr(1));
              this.brochuretab3=true;
            }
            else
            {
                 $("#brochurelink3").hide();
                 this.brochuretab3=false;

            }
            if(extension4==".pdf"  || extension4==".PDF")
            {
               $("#brochure4").attr("src","https://www.famposo.com/testsoftlaunch//assets/images/page/pdfthumb.jpg");
               $("#brochurelink4").attr("href",response.data.brochure_img4);;
               $('#brochuretxt4').text(fileName4.substr(1));
               this.brochuretab4=true;
            }
            else if(extension4==".jpeg" || extension4==".jpg")
            {
              $("#brochure4").attr("src",response.data.brochure_img4);
              $("#brochurelink4").attr("href",response.data.brochure_img4);;
              $('#brochuretxt4').text(fileName4.substr(1));
              this.brochuretab4=true;
            }
            else
            {
                 $("#brochurelink4").hide();
                 this.brochuretab4=false;
            }
            
            if(this.brochuretab1==false && this.brochuretab2==false && this.brochuretab3==false && this.brochuretab4==false)
            {
              $(".brochuretabview").hide();
            }
            if(response.data.cart)
            {
              this.isempty=false;
              
             
            }
            else
            {
              this.isempty=true;
              
            }
            if(response.data.fav)
            {
              this.isfav=true;
              
            }
            else
            {
              this.isfav=false;
              
            }
           
        }
      
        },error=>console.error('error',error)); 
         
      }); 
    
  }
  minion(srcval)
  {
    $(".maxi").attr("src",srcval);
  }
  addtocart(index)
  {
      if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) 
      {
        const formData = new FormData();
        formData.append('cemail', this.cookieService.get('memberid'));
        formData.append('oauth', this.cookieService.get('oauth'));
        formData.append('product_id',index);
        this.productService.addcart(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
          if(response.success)
          {
            $("#cartcount").html(response.data.cartcount);
            this.isempty=false;
          }
          else
          {
            this.isempty=true;
          }
          },error=>console.error('error',error)); 
      }
      else 
      {
          this.router.navigate(["register","login"]);  
      } 
  }
  addfavourite(index)
  {
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) 
    {
      const formData = new FormData();
      formData.append('cemail', this.cookieService.get('memberid'));
      formData.append('oauth', this.cookieService.get('oauth'));
      formData.append('product_id',index);
      this.productService.addfavourite(formData).subscribe(response=>{
        if(response.success)
        {
          this.isfav=true;
        }
        else
        {
         
          this.productService.deletefavourite(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
            this.isfav=false;
          },error=>console.error('error',error));
        }
        },error=>console.error('error',error)); 
    }
    else 
    {
        this.router.navigate(["register","login"]);  
    } 
  }
  buynow(index)
  {
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) 
    {
      const formData = new FormData();
      formData.append('cemail', this.cookieService.get('memberid'));
      formData.append('oauth', this.cookieService.get('oauth'));
      formData.append('product_id',index);
      this.productService.addcart(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response=>{
        if(response.success)
        {
          $("#cartcount").html(response.data.cartcount);
         
          this.router.navigate(["productshipping"], { state: {type:"directbuy"}});  
        }
        else
        {
          this.router.navigate(["productshipping"], { state: {type:"directbuy"}}); 
        }
      
        },error=>console.error('error',error)); 
    }
    else 
    {
        this.router.navigate(["register","login"]);  
    } 
  }

}
