import { MapExampleComponent } from './map-example/map-example.component';
import { CalendarTestComponent } from './calendar-test/calendar-test.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WalletComponent } from './wallet/wallet.component';
import { SubscriptionComponent } from './Subscribe/subscription/subscription.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from "./home/home.component";
import { FaqsComponent } from './faqs/faqs.component';
import { BusInfoComponent } from './bus-info/bus-info.component';
import { RequestForBusComponent } from './request-for-bus/request-for-bus.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentComponent } from './payment/payment.component';
import { RzrpaymentComponent } from './rzrpayment/rzrpayment.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { SearchBusComponent } from './Subscribe/search-bus/search-bus.component';
import { PassengerDetailsComponent } from './Subscribe/passenger-details/passenger-details.component';
import { SubscriptionPaymentComponent } from './Subscribe/subscription-payment/subscription-payment.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HistoryComponent } from './history/history.component';
import { CrudOperationsComponent } from './Admin/crud-operations/crud-operations.component';
import { MasterSearchComponent } from './Admin/master-search/master-search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'subscription', component: SubscriptionComponent},
  {path: 'wallet', component: WalletComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'search-bus', component: BusInfoComponent},
  {path: 'request-for-bus', component: RequestForBusComponent},
  {path: 'booking-details', component: BookingDetailsComponent},
  {path: 'payment', component: RzrpaymentComponent},
  {path: 'calendar-test', component: CalendarTestComponent},
  {path: 'admin', component: DashboardComponent},
  {path: 'search-for-bus', component:SearchBusComponent},
  {path: 'passenger-details', component: PassengerDetailsComponent},
  {path: 'subscription-payment', component: SubscriptionPaymentComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'crud-operations', component: CrudOperationsComponent},
  {path: 'master-search', component: MasterSearchComponent},
  {path: 'map-example', component: MapExampleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
