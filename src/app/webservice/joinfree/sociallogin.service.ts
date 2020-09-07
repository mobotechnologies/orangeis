import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/Http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/throw';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocialloginService {

  private _url: string = environment.url;

  constructor(private http: HttpClient) { }

  Savesresponse(response): Observable<any> {

    return this.http.post<any>(this._url + "register.php", response)
      .catch(this.errorHandler);
  }
  phonelengthvalidator(response): Observable<any> {
    return this.http.post<any>(this._url + "PhoneNumberLengthValidation.php", response)
      .catch(this.errorHandler);
  }
  mobilexist(response): Observable<any> {
    return this.http.post<any>(this._url + "validation.php", response)
      .catch(this.errorHandler);
  }
  getindustrytype(response): Observable<any> {
    return this.http.post<any>(this._url + "getindustrytype.php", response)
      .catch(this.errorHandler);
  }
  otpvalid(response): Observable<any> {
    return this.http.post<any>(this._url + "emailverification.php", response)
      .catch(this.errorHandler);
  }
  emailexist(response): Observable<any> {
    return this.http.post<any>(this._url + "validation.php", response)
      .catch(this.errorHandler);
  }
  otp(response): Observable<any> {

    return this.http.post<any>(this._url + "emailverification.php", response)
      .catch(this.errorHandler);
  }
  verify_oauthid(response): Observable<any> {
    return this.http.post<any>(this._url + "validation.php", response)
      .catch(this.errorHandler);
  }
  resetpassword(response): Observable<any> {
    return this.http.post<any>(this._url + "resetpassword.php", response)
      .catch(this.errorHandler);
  }
  changepassword(response): Observable<any> {
    return this.http.post<any>(this._url + "aresetpassword.php", response)
      .catch(this.errorHandler);
  }
  uploadImage(response): Observable<any> {
    return this.http.post<any>(this._url + "fileupload.php", response)
      .catch(this.errorHandler);
  }
  uploadfinImage(response): Observable<any> {
    return this.http.post<any>(this._url + "financedocupload.php", response)
      .catch(this.errorHandler);
  }
  financesetup(response): Observable<any> {
    return this.http.post<any>(this._url + "financesetup.php", response)
      .catch(this.errorHandler);
  }
  getuserdata(response): Observable<any> {
    return this.http.post<any>(this._url + "userdata.php", response)
      .catch(this.errorHandler);
  }
  getstatedata(response): Observable<any> {
    return this.http.post<any>(this._url + "joinfreestatefilter.php", response)
      .catch(this.errorHandler);
  }
  getcitydata(response): Observable<any> {
    return this.http.post<any>(this._url + "getcompanycity.php", response)
      .catch(this.errorHandler);
  }
  getphonecodedata(response): Observable<any> {
    return this.http.post<any>(this._url + "joinfreegetcode.php", response)
      .catch(this.errorHandler);
  }
  forgotemail(response): Observable<any> {
    return this.http.post<any>(this._url + "forgotpassword.php", response)
      .catch(this.errorHandler);
  }
  verifyuser(response): Observable<any> {
    return this.http.post<any>(this._url + "loginverification.php", response)
      .catch(this.errorHandler);
  }
  consumeraccountsetup(response): Observable<any> {
    return this.http.post<any>(this._url + "consumeraccountsetup.php", response)
      .catch(this.errorHandler);
  }
  consumeraccountupdate(response): Observable<any> {
    return this.http.post<any>(this._url + "companyupdate.php", response)
      .catch(this.errorHandler);
  }
  getusercompanydata(response): Observable<any> {
    return this.http.post<any>(this._url + "getusercompanydata.php", response)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
  loggedIn() {

    return !!localStorage.getItem('token');
  }
}
