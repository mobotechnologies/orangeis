import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialloginService } from '../../../webservice/joinfree/sociallogin.service';
import { ProductserviceService } from '../../../webservice/product/productservice.service';
import { CookieService } from 'ngx-cookie-service';;
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private userService: SocialloginService, private router: Router,private productService: ProductserviceService,private cookieService: CookieService) {
  
   }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.loggedIn()) {
      if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) {
      const formData = new FormData();
      formData.append('cemail', this.cookieService.get('memberid'));
      formData.append('oauth', this.cookieService.get('oauth'));
      this.productService.getcart(formData).subscribe(response=>{
        if(response.success)
        {
            $("#cartcount").html(response.data.cartcount);
             
        }
       
        },error=>console.error('error',error)); 
      }
      console.log('fdf');
      return true;
    } else {
      console.log('dd');
      this.router.navigate(['/register/login'], {
        queryParams: {
          return: state.url, skipLocationChange: true
        }
      });
      return false;

    }
  }
}
