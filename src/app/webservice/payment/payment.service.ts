import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/Http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // private _url: string = environment.url;
  private _url: string = environment.url;
  constructor(private _paymentcall: HttpClient) { }

  paymentCall(params): Observable<any> {
    return this._paymentcall.post<any>(this._url + "pay.php", params).catch(this.errorHandler);

  }

  orderpayment(params): Observable<any> {
    return this._paymentcall.post<any>(this._url + "orderpay.php", params).catch(this.errorHandler);

  }
  getplandata(params): Observable<any> {
    return this._paymentcall.post<any>(this._url + "subcriptionPlan.php", params).catch(this.errorHandler);

  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
