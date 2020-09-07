import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/Http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
   providedIn: 'root'
})

export class ContactService {

   private _url: string = environment.url;

   constructor(private contactapicall: HttpClient) { }



   AddContact(contactData): Observable<any> {
      return this.contactapicall.post<any>(this._url + "Contactmail.php", contactData).catch(this.errorHandler);
   }
   errorHandler(error: HttpErrorResponse) {
      return Observable.throw(error.message || "Server Error");
   }
}
