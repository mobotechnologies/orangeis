import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/Http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RecaptchaModule } from 'ng-recaptcha';
import { PopoverModule } from "ngx-smart-popover";
import { DynamiSocialLoginModule, AuthServiceConfig } from "ng-dynami-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider } from "ng-dynami-social-login";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingHomeComponents,routingCoperateServiceComponents,routingConsumerComponents,routingWomensWingComponents,routingErrorPageComponents, routingProductPageComponents,routingPaymentPageComponents,routingHomePageComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { CookieService } from 'ngx-cookie-service';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AboutusComponent } from './home/pages/aboutus/aboutus.component';
import { AgmCoreModule } from '@agm/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NetworkStatusComponent } from './network-status/network-status.component';
import { PlanComponent } from './webservice/plan/plan.component';
import {NgxPaginationModule} from 'ngx-pagination';







let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("31252165227-q07ip3caf0se4rnn60qhepj0gkqa8qjk.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("212376753535830")
  },
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ValidationMessageComponent,
    routingHomeComponents,
    routingConsumerComponents,
    routingErrorPageComponents,
    routingProductPageComponents,
    routingPaymentPageComponents,
    routingHomePageComponents,
    routingCoperateServiceComponents,
    AboutusComponent,
    NetworkStatusComponent,
    PlanComponent,
    routingWomensWingComponents
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RecaptchaModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    PopoverModule,
    HttpClientModule,
    DynamiSocialLoginModule,
    BrowserAnimationsModule,
    RxReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjPzMCvReUhc-EqTkLHcui5BUOH-G0UZQ'
    })
  ],
  providers: [{ provide: AuthServiceConfig, useFactory: provideConfig }, { provide: LocationStrategy, useClass: HashLocationStrategy }, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [
    ValidationMessageComponent
  ]
})
export class AppModule { }
