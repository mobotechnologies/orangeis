import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { HttpClient, HttpErrorResponse } from '@angular/common/Http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/debounceTime';

import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import {Injector} from '@angular/core';

export let InjectorInstance: Injector;

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  
  constructor(private injector: Injector) {
    InjectorInstance = this.injector;
  }
  
 
   static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
        'required':'This field is required',
        'invalidNumber': 'Input should be an integer value',
        'invalidEmailAddress': 'Invalid email address',
        'invalidUrl': 'Invalid URL',
        'alphaNumericAllowed': 'Only apha numeric input is allowed',
        'numericAllowed': 'Only numeric values are allowed',
        'charAllowed': 'Only characters A-Z are allowed',
        'invalidQuantity':'Value should not be < or = Min Quantity',
        'invalidDimension':'Max Dimension should not be < Min Dimension',
        'invalidWeight':'Min Weight should not be < or = to Min Weight',
        'invalidPrice':'Value should not be < or =  Min Price',
        'invalidPhoneLength':'Invalid phone number',
        'invalidDate':'Expected delivery date is same as by date',
        'invalidEmailExist':'Email already exist',
        'invalidPhoneExist':'Mobile no already exist',
        'Passwordmismatch':'Password does not match',
        'compare':'Password does not match',
        'invalidpass':'Password does not meet the requirement',
        'invalidFileFormat':'Invalid file format',
        'invalidRefcode':'Invalid referral code',
        'fileSize':'File size is greater than the given limit',
        'file':'Max file to upload one ',
        'phonematch':'Alternate mobile  must not be same as mobile no',
        'emailmatch':'Alternate email id  must not be same as email id',
        'invalidcompanyname':'company name already exist',
        'invalidregno':'company registration no already exist'
    };

    return config[validatorName];
}


  static emailValidator(control: AbstractControl) {
    if (control.value.length == 0 || control.value.match( /^([a-zA-Z])+([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9_.+-])+\.+?(com|co|in|org|net|uk|sg|us|edu|info|gov|vekomy|COM|CO|IN|ORG|NET|UK|SG|US|EDU|INFO|GOV|VEKOMY))\.?(com|co|in|org|net|uk|sg|us|edu|info|gov|COM|CO|IN|ORG|NET|UK|SG|US|EDU|INFO|GOV)?$/)) {
        return null;
    } else {
        return { 'invalidEmailAddress': true };
    }
}

static alpaNumValidator(control: AbstractControl) {
    if (control.value.match(/^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/)) {
        return null;
    } else {
        return { 'alphaNumericAllowed': true };
    }
}


static numberValidator(control: AbstractControl) {
    if (control.value.length == 0 || control.value.match(/^[0-9]*$/)) {
        return null;
    } else {
        return { 'numericAllowed': true };
    }
}
static charValidator(control: AbstractControl) {
    if (control.value.length == 0 || control.value.match(/^[a-zA-Z]+$/)) {
        return null;
    } else {
        return { 'charAllowed': true };
    }
}
static fileValidator(control: AbstractControl)
{
    const file = control.value;
    if(file)
    {
           // Allowing file type 
            var allowedExtensions =/(\.jpg|\.jpeg|\.png|\.pdf)$/i; 
  
            if (!file.match(allowedExtensions)) { 
                return { 'invalidFileFormat': true };
            }
            return null; 
    }
    
}
static documentValidator(control: AbstractControl)
{
    const file = control.value;
    if(file)
    {
           // Allowing file type 
            var allowedExtensions =/(\.jpg|\.jpeg|\.png|\.pdf)$/i; 
  
            if (!file.match(allowedExtensions)) { 
                return { 'invalidFileFormat': true };
            }
            return null; 
    }
    
}
static urlValidator(control: AbstractControl) {
    const URL_REGEXP = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    if(control.value!="")
    {
        if (control.value.match(URL_REGEXP)) {
            return null;
        } else {
            
            return { invalidUrl: true };
        }
    }
}
static DimensionValidator(control: AbstractControl) {
    const Dmin: any = control.get('dimension_length').value;
    const Dmax: any = control.get('dimension_width').value; 
    if (Dmin > Dmax) {
        control.get('dimension_width').setErrors({ invalidDimension: true });
    }
    return null
}
static WeightValidator(control: AbstractControl) {
    const Wmin: any = control.get('weight_min').value;
    const Wmax: any = control.get('weight_max').value; 
    if(Wmin!="" && Wmax!="")
    {
        if (Wmin > Wmax || Wmin == Wmax) {
            control.get('weight_max').setErrors({ invalidWeight: true });
        }
        return null
    }
}
    static QuantityValidator(control: AbstractControl) {
        const Qmin: any = control.get('quantity_min').value;
        const Qmax: any = control.get('quantity_max').value; 
        if(Qmax!="" && Qmin!="")
        {
            if (Qmin > Qmax  || Qmin==Qmax) {
                control.get('quantity_max').setErrors({ invalidQuantity: true });
            }
            return null
        }
    }
    static PriceRangeValidator(control: AbstractControl) {
        const Pmin: any = control.get('buyprice_min').value;
        const Pmax: any = control.get('buyprice_max').value; 
        if(Pmin!="" && Pmax!="")
        {
            if (Pmin > Pmax || Pmin == Pmax) {
                control.get('buyprice_max').setErrors({ invalidPrice: true });
            }
            return null
        }
    }
    static DateRangeValidator(control: AbstractControl)
    {
       
        if(new Date(control.get('expected_delivery_date').value)>=new Date(control.get('by_date').value)){
            control.get('by_date').setErrors({ invalidDate: true });
        }
    }
    static PhoneLengthValidator(control: AbstractControl)
    {
        if(control.get('mobile_no').value!="" && control.get('countrycode').value!="")
        {
            const formData = new FormData();
            formData.append('phone_number',control.get('mobile_no').value);
            formData.append('country_code',control.get('countrycode').value);
            const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
            httpClient.post<any>(environment.url+"PhoneNumberLengthValidation.php",formData).debounceTime(3000).subscribe(response=>{
            if(response.success)
            {
                return null;
            }
            else
            { 
                control.get('mobile_no').setErrors({ invalidPhoneLength: true });
            }
            },error=>console.error('error',error)); 
        }
       
        
    }
  
    static PhoneLengthValidator2(control: AbstractControl)
    {
        if(control.value!="" )
        {
            const cookieService =  InjectorInstance.get<CookieService>(CookieService);       
            const formData = new FormData();
            formData.append('phone_number',control.value);
            formData.append('country_code',cookieService.get('countrycode'));
            const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
            httpClient.post<any>(environment.url+"PhoneNumberLengthValidation.php",formData).subscribe(response=>{
            if(response.success)
            {
                return null;
            }
            else
            { 
                return { invalidPhoneLength: true };
            }
            },error=>console.error('error',error)); 
    
           
        }
    }
    static emailexist(control: AbstractControl)
    {
        if(control.get('email').value!="")
        {
            const cookieService =  InjectorInstance.get<CookieService>(CookieService);
            const formData = new FormData();
            formData.append('email',control.get('email').value);
        
            formData.append('cemail', cookieService.get('memberid'));
            formData.append('oauth', cookieService.get('oauth'));
            const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
            httpClient.post<any>(environment.url+"validation.php",formData).subscribe(response=>{
            if(response.success)
            {
                return null;
            }
            else
            { 
                control.get('email').setErrors({ invalidEmailExist: true });
            }
            },error=>console.error('error',error)); 
        }
       
    }
    static emailexist2(control: AbstractControl)
    {
        if(control.get('alternate_email').value!="")
        {
            const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
            const formData = new FormData();
           
            formData.append('email',control.get('alternate_email').value);
           
            httpClient.post<any>(environment.url+"validation.php",formData).subscribe(response=>{
            if(response.success)
            {
                return null;
            }
            else
            { 
                control.get('alternate_email').setErrors({ invalidEmailExist: true });
            }
            },error=>console.error('error',error)); 
        }
    }
    static mobileexist(control: AbstractControl)
    {
        if(control.get('mobile_no').value!="")
        {

            const cookieService =  InjectorInstance.get<CookieService>(CookieService);
            const formData = new FormData();
           
            formData.append('cemail', cookieService.get('memberid'));
            formData.append('oauth', cookieService.get('oauth'));
            formData.append('mobile_no',control.get('mobile_no').value);
            const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
            httpClient.post<any>(environment.url+"validation.php",formData).debounceTime(300).subscribe(response=>{
            if(response.success)
            {
                return null;
            }
            else
            { 
                control.get('mobile_no').setErrors({ invalidPhoneExist: true });
            }
            },error=>console.error('error',error)); 
        }
       
    }

    static companynamevalidator(control: AbstractControl)
    {
        const cookieService =  InjectorInstance.get<CookieService>(CookieService);
        if(cookieService.get('companymode')=="post")
        {
            if(control.get('company_name').value!="")
            {
                const formData = new FormData();
                formData.append('companyname',control.get('company_name').value);
                const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
                httpClient.post<any>(environment.url+"validation.php",formData).subscribe(response=>{
                if(response.success)
                {
                    return null;
                }
                else
                { 
                    control.get('company_name').setErrors({ invalidcompanyname: true });
                }
                },error=>console.error('error',error)); 
            }
       }
       else
       {
        return null;
       }
       
    }

    static companyregvalidator(control: AbstractControl)
    {
        const cookieService =  InjectorInstance.get<CookieService>(CookieService);
        if(cookieService.get('companymode')=="post")
        {
                if(control.get('company_reg_no').value!="")
                {
                    const formData = new FormData();
                    formData.append('companyregno',control.get('company_reg_no').value);
                    const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
                    httpClient.post<any>(environment.url+"validation.php",formData).subscribe(response=>{
                    if(response.success)
                    {
                        return null;
                    }
                    else
                    { 
                        control.get('company_reg_no').setErrors({ invalidregno: true });
                    }
                    },error=>console.error('error',error)); 
                }
       }
       else
       {
        return null;
       }
    }

    static mobileexist2(control: AbstractControl)
    {
        if(control.get('alternate_mobile_no').value!="")
        {
            const formData = new FormData();
            formData.append('mobile_no',control.get('alternate_mobile_no').value);
            const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
         
            httpClient.post<any>(environment.url+"validation.php",formData).debounceTime(100).subscribe(response=>{
            if(response.success)
            {
                return null;
            }
            else
            { 
                control.get('alternate_mobile_no').setErrors({ invalidPhoneExist: true });
            }
            },error=>console.error('error',error)); 
           
        }
       
    }
   
    static referralcodecheck(control: AbstractControl)
    {
        if(control.get('Referral_code').value!="")
        {
            const formData = new FormData();
            formData.append('referral_code',control.get('Referral_code').value);
            const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
            httpClient.post<any>(environment.url+"validation.php",formData).subscribe(response=>{
            if(response.success)
            {
                return null;
            }
            else
            { 
                control.get('Referral_code').setErrors({ invalidRefcode: true });
            }
            },error=>console.error('error',error)); 
        }
    } 
    static passwordValidator(control: AbstractControl)
    {
       
       
        if(control.get('confirmpassword').value!="" && control.get('newpassword').value!="")
        {
            
            if( control.get('confirmpassword').value!=control.get('newpassword').value)
            {
                control.get('confirmpassword').setErrors({ Passwordmismatch: true });
            }
            else
            {
                return null;
            }
        }
        else
        {
            return null;
        }
      
   
    }
    static samemobilenoValidator(control: AbstractControl)
    {
        if(control.get('mobile_no').value!="" && control.get('alternate_mobile_no').value!="")
        {
            
            if( control.get('mobile_no').value==control.get('alternate_mobile_no').value)
            {
                control.get('alternate_mobile_no').setErrors({ phonematch: true });
            }
            else
            {
                return null;
            }
        }
        else
        {
            return null;
        }
      
    }
    static sameemailValidator(control: AbstractControl)
    {
        if(control.get('email').value!="" && control.get('alternate_email').value!="")
        {
            
            if( control.get('email').value==control.get('alternate_email').value)
            {
                control.get('alternate_email').setErrors({emailmatch: true });
            }
            else
            {
                return null;
            }
        }
        else
        {
            return null;
        }
      
    }
    static passwordTest(control: AbstractControl)
    {
        const PASS_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        if(control.get('newpassword').value!="")
        {
         if (control.get('newpassword').value.match(PASS_REGEXP)) {
           return null;
         } else {
             
             control.get('newpassword').setErrors({ invalidpass: true });
         }
       }
       else
       {
           return null;
       }
    }

   
}
