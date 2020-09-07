import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ValidationService } from '../../../webservice/validation/validation.service';
import {  SocialloginService } from '../../../webservice/joinfree/sociallogin.service';
import Swal from 'sweetalert2';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { retryWhen, delay, take } from 'rxjs/operators'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private  router: Router,private route:ActivatedRoute,private _validation:ValidationService,private cookieService: CookieService,private fb: FormBuilder,private SocialloginService: SocialloginService) { }

  ngOnInit() {
  }
  changepassform=this.fb.group({
    newpassword:['',[Validators.required]],
    confirmpassword:['',[Validators.required,,RxwebValidators.compare({fieldName:'newpassword'})]],
  },{ validator:[ ValidationService.passwordTest]});
  submit()
  {
    
    this.changepassform.markAllAsTouched();
    if(this.changepassform.valid)
    {  
      
    
      const formData = new FormData();
      formData.append('email', this.cookieService.get('memberid'));
      formData.append('password',this.changepassform.value.newpassword);
      this.SocialloginService.changepassword(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
        if(res.success)
        {
          
            Swal.fire({
              title: 'Famposo team received your request!',
              titleText:'Password change successful',
              width: 600,
              allowOutsideClick:false,
                                      }).then((result) => {
                    if(result.value)
                    {
                      this.router.navigate(["home"]);  
                     }
             })
   
        }
        else
        {
               Swal.fire("Your request could be procceed !try again");  
        }
    });
    }
  }
}
