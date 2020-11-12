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
export class ProductserviceService {

  private _url:string=environment.url;

  constructor(private http:HttpClient) { }
  productlist(response):Observable<any>
  {
    return this.http.post<any>(this._url+"productlisting.php",response)
    .catch(this.errorHandler);
  }
  getindustry(response):Observable<any>
  {
    return this.http.post<any>(this._url+"industrytype.php",response)
    .catch(this.errorHandler);
  }
  getbrand(response):Observable<any>
  {
    return this.http.post<any>(this._url+"brand.php",response)
    .catch(this.errorHandler);
  }
  clearancesale(response):Observable<any>
  {
    return this.http.post<any>(this._url+"clearancesale.php",response)
    .catch(this.errorHandler);
  }
  productdetail(response):Observable<any>
  {
    return this.http.post<any>(this._url+"productdetail.php",response)
    .catch(this.errorHandler);
  }
  addcart(response):Observable<any>
  {
    return this.http.post<any>(this._url+"addcart.php",response)
    .catch(this.errorHandler);
  }
  removecart(response):Observable<any>
  {
    return this.http.post<any>(this._url+"removecart.php",response)
    .catch(this.errorHandler);
  }
  placeorder(response):Observable<any>
  {
    return this.http.post<any>(this._url+"placeorder.php",response)
    .catch(this.errorHandler);
  }
  getshippingaddress(response):Observable<any>
  {
    return this.http.post<any>(this._url+"getshippingaddress.php",response)
    .catch(this.errorHandler);
  }
  updatecart(response):Observable<any>
  {
    return this.http.post<any>(this._url+"updatecart.php",response)
    .catch(this.errorHandler);
  }
  updatedirectbuy(response):Observable<any>
  {
    return this.http.post<any>(this._url+"updatedirectbuyquant.php",response)
    .catch(this.errorHandler);
  }
  getcart(response):Observable<any>
  {
    return this.http.post<any>(this._url+"getcart.php",response)
    .catch(this.errorHandler);
  }
  getdirectbuy(response):Observable<any>
  {
    return this.http.post<any>(this._url+"directbuy.php",response)
    .catch(this.errorHandler);
  }
  sendenquiry(response):Observable<any>
  {
    return this.http.post<any>(this._url+"sendenquiry.php",response)
    .catch(this.errorHandler);
  }
  addfavourite(response):Observable<any>
  {
    return this.http.post<any>(this._url+"addfavourite.php",response)
    .catch(this.errorHandler);
  }
  getfavourite(response):Observable<any>
  {
    return this.http.post<any>(this._url+"getfavourite.php",response)
    .catch(this.errorHandler);
  }
  deletefavourite(response):Observable<any>
  {
    return this.http.post<any>(this._url+"deletefavourite.php",response)
    .catch(this.errorHandler);
  }
  errorHandler(error:HttpErrorResponse)
  {
     return Observable.throw(error.message || "Server Error");
  }
}
