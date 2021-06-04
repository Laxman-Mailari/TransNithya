import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SubscriptionComponent } from './Subscribe/subscription/subscription.component';
import { WalletComponent } from './wallet/wallet.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { BusAnimationComponent } from './home/bus-animation/bus-animation.component';
import { BusSearchComponent } from './home/bus-search/bus-search.component';
import { FaqComponent } from './home/faq/faq.component';
import { FooterComponent } from './home/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FaqsComponent } from './faqs/faqs.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatSortModule} from '@angular/material/sort';

import { MyInterceptor } from './auth/my-interceptor';
import { AuthService } from './auth/auth-service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BusInfoComponent } from './bus-info/bus-info.component';
import { RequestForBusComponent } from './request-for-bus/request-for-bus.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentComponent } from './payment/payment.component';
import { information } from './Store/information';
import { RzrpaymentComponent } from './rzrpayment/rzrpayment.component';
import { CalendarTestComponent } from './calendar-test/calendar-test.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { SearchBusComponent } from './Subscribe/search-bus/search-bus.component';
import { PassengerDetailsComponent } from './Subscribe/passenger-details/passenger-details.component';
import { SubscriptionPaymentComponent } from './Subscribe/subscription-payment/subscription-payment.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HistoryComponent } from './history/history.component';
import { CrudOperationsComponent } from './Admin/crud-operations/crud-operations.component';
import { MasterSearchComponent } from './Admin/master-search/master-search.component';
import { RequestedBusComponent } from './Admin/requested-bus/requested-bus.component';
import { AllBusComponent } from './Admin/all-bus/all-bus.component';
import { AllUserComponent } from './Admin/all-user/all-user.component';
import { SubscriptionsComponent } from './Admin/subscriptions/subscriptions.component';
import { AllTransactionsComponent } from './Admin/all-transactions/all-transactions.component';
import { DeleteBusComponent } from './Admin/delete-bus/delete-bus.component';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { MapExampleComponent } from './map-example/map-example.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarComponent,
    SubscriptionComponent,
    WalletComponent,
    AboutUsComponent,
    LoginComponent,
    BusAnimationComponent,
    BusSearchComponent,
    FaqComponent,
    FooterComponent,
    FaqComponent,
    FaqsComponent,
    SignUpComponent,
    BusInfoComponent,
    RequestForBusComponent,
    BookingDetailsComponent,
    PaymentComponent,
    RzrpaymentComponent,
    CalendarTestComponent,
    DashboardComponent,
    SearchBusComponent,
    PassengerDetailsComponent,
    SubscriptionPaymentComponent,
    ProfileComponent,
    FeedbackComponent,
    HistoryComponent,
    CrudOperationsComponent,
    MasterSearchComponent,
    RequestedBusComponent,
    AllBusComponent,
    AllUserComponent,
    SubscriptionsComponent,
    AllTransactionsComponent,
    DeleteBusComponent,
    MapExampleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCollapseModule,
    NgbModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatMomentDateModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatGridListModule,
    MatSidenavModule,
    MatDividerModule,
    MatSortModule,

    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
    AuthService,
    information
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent],
  
})
export class AppModule { }
