import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './home/pages/main/main.component';
import { JoinfreeComponent } from './home/pages/joinfree/joinfree.component';
import { RfqformComponent } from './home/pages/requestforquote/rfqform.component';
import { ConsumeraccountsetupComponent } from './home/pages/consumeraccountsetup/consumeraccountsetup.component';
import { ResetpasswordComponent } from './home/pages/resetpassword/resetpassword.component';
import { PageexpiredComponent } from './shared/layout/pageexpired/pageexpired.component';
import { PagenotfoundComponent } from './shared/layout/pagenotfound/pagenotfound.component';
import { SubcriptionComponent } from './home/pages/subscription/subscription.component';
import { AboutusComponent } from './home/pages/aboutus/aboutus.component';
import { ContactusComponent } from './home/pages/contactus/contactus.component';
import { FinancesuppportComponent } from './home/pages/financesuppport/financesuppport.component';
import { ProductlistingComponent } from './home/pages/productlisting/productlisting.component';
import { ProductdetailviewComponent } from './home/pages/productdetailview/productdetailview.component';
import { ProductcartComponent } from './home/pages/productcart/productcart.component';
import { ProductshippingComponent } from './home/pages/productshipping/productshipping.component';
import { PaymentGatewayComponent } from './home/pages/payment-gateway/payment-gateway.component';
import { AuthGuardGuard } from './shared/layout/authGuard/auth-guard.guard';
import { CommonPopComponent } from './home/pages/common-pop/common-pop.component';
import { PaymentSuccessComponent } from './shared/layout/payment-success/payment-success.component';
import { PaymentFailureComponent } from './shared/layout/payment-failure/payment-failure.component';
import { SliderComponent } from './home/pages/slider/slider.component';
import { HomeRfqformComponent } from './home/pages/rfqform/rfqform.component';
import { TestimonialsComponent } from './home/pages/testimonials/testimonials.component';
import { ClientsSliderComponent } from './home/pages/clients-slider/clients-slider.component';
import { ProductHomeComponent } from './home/pages/product-home/product-home.component';
import { ProductwhishlistComponent } from './home/pages/productwhishlist/productwhishlist.component';
import { ProductenquiryComponent } from './home/productenquiry/productenquiry.component';
import { ChangePasswordComponent } from './home/pages/change-password/change-password.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { GstregistrationComponent } from './home/pages/gstregistration/gstregistration.component';
import { DigitalsignatureComponent } from './home/pages/digitalsignature/digitalsignature.component';
import { EsiregistrationComponent } from './home/pages/esiregistration/esiregistration.component';
import { EsimonthlyfilingComponent } from './home/pages/esimonthlyfiling/esimonthlyfiling.component';
import { CompanyincoperationComponent } from './home/pages/companyincoperation/companyincoperation.component';
import { GstmonthlyfilingComponent} from './home/pages/gstmonthlyfiling/gstmonthlyfiling.component';
import { AboutwomenComponent } from './home/pages/aboutwomen/aboutwomen.component';
import { WomenwingregistrationComponent } from './home/pages/womenwingregistration/womenwingregistration.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register/:logs', component: JoinfreeComponent },
  { path: 'requestforquote', component: RfqformComponent },
  { path: 'consumeraccountsetup', component: ConsumeraccountsetupComponent, canActivate: [AuthGuardGuard] },
  { path: 'resetpassword/:selector/:validator', component: ResetpasswordComponent },
  { path: 'pageexpired', component: PageexpiredComponent },
  { path: 'subscription', component: SubcriptionComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'Companyincoperation', component: CompanyincoperationComponent },
  { path: 'gstregistration', component: GstregistrationComponent },
  { path: 'gstmonthlyfiling', component: GstmonthlyfilingComponent },
  { path: 'Esiregistration', component: EsiregistrationComponent },
  { path: 'Esimonthlyfiling', component: EsimonthlyfilingComponent },
  { path: 'Digitalsignature', component: DigitalsignatureComponent },
  { path: 'aboutwomen', component: AboutwomenComponent },
  { path: 'womensWing', component: WomenwingregistrationComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'financesupport', component: FinancesuppportComponent, canActivate: [AuthGuardGuard] },
  { path: 'productlisting', component: ProductlistingComponent },
  { path: 'productdetailview/:id', component: ProductdetailviewComponent, canActivate: [AuthGuardGuard] },
  { path: 'sendenquiry/:id', component: ProductenquiryComponent },
  { path: 'productwhishlist', component: ProductwhishlistComponent, canActivate: [AuthGuardGuard] },
  { path: 'productcart', component: ProductcartComponent, canActivate: [AuthGuardGuard] },
  { path: 'productshipping', component: ProductshippingComponent, canActivate: [AuthGuardGuard] },
  { path: 'paymentgateway', component: PaymentGatewayComponent, canActivate: [AuthGuardGuard] },
  { path: 'paysuccess/:logs', component: PaymentSuccessComponent, canActivate: [AuthGuardGuard] },
  { path: 'payfailure', component: PaymentFailureComponent, canActivate: [AuthGuardGuard] },
  { path: 'popup', component: CommonPopComponent, canActivate: [AuthGuardGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuardGuard] },
  { path: "**", component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingHomeComponents = [MainComponent, JoinfreeComponent, RfqformComponent, GstregistrationComponent, SubcriptionComponent, ContactusComponent, ChangePasswordComponent, LogoutComponent];
export const routingConsumerComponents = [ConsumeraccountsetupComponent, ResetpasswordComponent, FinancesuppportComponent];
export const routingErrorPageComponents = [PageexpiredComponent, PagenotfoundComponent];
export const routingProductPageComponents = [ProductlistingComponent, ProductdetailviewComponent, ProductcartComponent, ProductshippingComponent,ProductwhishlistComponent,ProductenquiryComponent];
export const routingPaymentPageComponents=[PaymentGatewayComponent,CommonPopComponent,PaymentSuccessComponent,PaymentFailureComponent ];
export const routingHomePageComponents=[SliderComponent,HomeRfqformComponent,TestimonialsComponent,ClientsSliderComponent,ProductHomeComponent];
export const routingCoperateServiceComponents=[DigitalsignatureComponent,CompanyincoperationComponent,EsiregistrationComponent,EsimonthlyfilingComponent,GstregistrationComponent,GstmonthlyfilingComponent];
export const routingWomensWingComponents=[ AboutwomenComponent,WomenwingregistrationComponent]
