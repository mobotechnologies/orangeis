import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { ValidationService } from '../../../webservice/validation/validation.service';
import {  SocialloginService } from '../../../webservice/joinfree/sociallogin.service';
import Swal from 'sweetalert2';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { retryWhen, delay, take } from 'rxjs/operators'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private  router: Router,private route:ActivatedRoute,private _validation:ValidationService,private fb: FormBuilder,private SocialloginService: SocialloginService) { }

  public  oauth_select;
  public  oauth_token;
  ngOnInit() {
    this.route.params.subscribe(params => {
        this.oauth_select=params['selector'];
        this.oauth_token=params['validator'];
    });
    const formData = new FormData();
    formData.append('selector',this.oauth_select);
    formData.append('validator',this.oauth_token);
    this.SocialloginService.resetpassword(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
        if(res.success)
        {
            // Swal.fire("Password reset successful");
        }
        else
        {
               this.router.navigate(["pageexpired"]);  
        }
    });
  }
  resetpassform=this.fb.group({
    newpassword:['',[Validators.required]],
    confirmpassword:['',[Validators.required,,RxwebValidators.compare({fieldName:'newpassword'})]],
  },{ validator:[ ValidationService.passwordTest]});

  submit()
  {
      this.resetpassform.markAllAsTouched();
      if(this.resetpassform.valid)
      {  
          const formData = new FormData();
          formData.append('selector',this.oauth_select);
          formData.append('validator',this.oauth_token);
          formData.append('password',this.resetpassform.value.newpassword);
          this.SocialloginService.resetpassword(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
              if(res.success)
              {
                
                  Swal.fire({
                    title: 'Famposo team received your request!',
                    titleText:'Password reset successful',
                    width: 600,
                    allowOutsideClick:false,
                                            }).then((result) => {
                          if(result.value)
                          {
                            this.router.navigate(["register","login"]);  
                           }
                   })
         
              }
              else
              {
                     this.router.navigate(["pageexpired"]);  
              }
          });
      }
     
  }


}
