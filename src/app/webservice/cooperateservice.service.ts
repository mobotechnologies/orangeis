import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/Http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/throw';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CooperateserviceService {
  private _url:string=environment.url;
  constructor(private http:HttpClient) { }
  gstregfileupload(data):Observable<any>
  {
    return this.http.post<any>(this._url + "gstregfileupload.php", data)
    .catch(this.errorHandler);
  }
  gstregistration(data):Observable<any>
  {
      return this.http.post<any>(this._url + "gstregistration.php", data)
    .catch(this.errorHandler);
  }
  gstmonthlyfiling(data):Observable<any>
  {
      return this.http.post<any>(this._url + "gstmonthlyfiling.php", data)
    .catch(this.errorHandler);
  }
  digitalsignregistration(data):Observable<any>
  {
      return this.http.post<any>(this._url + "digitalsignature.php", data)
    .catch(this.errorHandler);
  }
  esiregistration(data):Observable<any>
  {
      return this.http.post<any>(this._url + "esiregistration.php", data)
    .catch(this.errorHandler);
  }
  esimonthlyfiling(data):Observable<any>
  {
      return this.http.post<any>(this._url + "esimonthlyfiling.php", data)
    .catch(this.errorHandler);
  }
  companyinc(data):Observable<any>
  {
      return this.http.post<any>(this._url + "companyincoporation.php", data)
    .catch(this.errorHandler);
  }
  companyincfileupload(data):Observable<any>
  {
      return this.http.post<any>(this._url + "companyincfileupload.php", data)
    .catch(this.errorHandler);
  }
  digitalsignfileupload(data):Observable<any>
  {
      return this.http.post<any>(this._url + "digitalsignaturefileupload.php", data)
    .catch(this.errorHandler);
  }
  ESIfileupload(data):Observable<any>
  {
      return this.http.post<any>(this._url + "esifileupload.php", data)
    .catch(this.errorHandler);
  }
  errorHandler(error:HttpErrorResponse)
  {
     return Observable.throw(error.message || "Server Error");
  }
}
