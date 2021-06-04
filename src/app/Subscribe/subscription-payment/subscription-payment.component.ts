import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExternalLibraryService } from './util';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/auth-service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

declare let Razorpay: any;

export interface PeriodicElement {
  serial_no: number,
  name: string,
  age: number,
  seatNumber: number,
  departue: number,
  arrival: number
}

@Component({
  selector: 'app-subscription-payment',
  templateUrl: './subscription-payment.component.html',
  styleUrls: ['./subscription-payment.component.css']
})
export class SubscriptionPaymentComponent implements OnInit {

  name = 'Angular';
  response;
  razorpayResponse;
  showModal = false;
  reservationInfo: any;
  totalAmount;
  transaction: any;
  tripInfo;
  newEvent: any;
  ticketEvent:any;
  ELEMENT_DATA: PeriodicElement[] ;
  datasource;

  displayedColumns: string[] = ['serial_no', 'name', 'age', 'seatNumber','departue','arrival'];

  RAZORPAY_OPTIONS = {
    "key": "rzp_test_z3M2aJldzPRnTW",
    "amount": "",
    "name": "TransNitya",
    "order_id": "",
    "description": "ticket booking",
    //"image": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.theweek.in%2Fcontent%2Fdam%2Fweek%2Fnews%2Fbiz-tech%2Fimages%2F2020%2F8%2F13%2Fvolvo-bus.jpg&imgrefurl=https%3A%2F%2Fwww.theweek.in%2Fnews%2Fbiz-tech%2F2020%2F08%2F13%2Fvecv-and-volvos-bus-business-to-be-consolidated-into-a-new-bus-division-within-vecv.html&tbnid=wAJF1KFcSiVvrM&vet=12ahUKEwixpLibsdDwAhXdp0sFHQ8YAlEQMygIegUIARDdAQ..i&docid=nmvF3nOjE0Y6UM&w=760&h=443&q=bus%20images&ved=2ahUKEwixpLibsdDwAhXdp0sFHQ8YAlEQMygIegUIARDdAQ",
    "prefill": {
      "name": "",
      "email": "",
      "contact": "",
      "method": ""
    },
    "modal": {},
    "theme": {
      "color": "rgb(230, 139, 87)"
    }
  };

  constructor(
    private razorpayService: ExternalLibraryService, 
    private cd:  ChangeDetectorRef, 
    private service: AuthService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();

      this.tripInfo = this.service.getTripInfo();
      this.reservationInfo = this.service.getReservationInfo();
      this.totalAmount = this.service.getTotalAmount();
      this.RAZORPAY_OPTIONS.prefill.email = this.reservationInfo.mailId;
      this.RAZORPAY_OPTIONS.prefill.contact = this.reservationInfo.phoneNumber;

      this.ELEMENT_DATA = [];
      for(let i=0;i<this.reservationInfo.passengers.length;i++){
        this.ELEMENT_DATA.push({
          serial_no: i+1,
          name: this.reservationInfo.passengers[i].name,
          age: this.reservationInfo.passengers[i].age,
          seatNumber: this.reservationInfo.passengers[i].seatNumber,
          departue: this.tripInfo.travelDate,
          arrival: this.tripInfo.travelDate
        })
      }
      this.datasource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  }


  public proceed() {
    this.RAZORPAY_OPTIONS.amount = this.discount(this.totalAmount) + '00';
    
    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open();
  }

  public updateTransaction(payment_id){
    this.transaction = {
      mailId: this.reservationInfo.mailId,
      paymentId: payment_id,
      date: this.tripInfo.travelDate,
      source: this.reservationInfo.source,
      destination: this.reservationInfo.destination,
      busNumber: this.reservationInfo.busNumber,
      numberOfSeats: this.reservationInfo.passengers.length
    }
  }

  public razorPaySuccessHandler(response) {
    console.log(response);
    //window.alert("payment id: "+response.razorpay_payment_id);

    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    console.log(this.reservationInfo);
    this.ticketEvent = {
      //mailId: this.service.getMailId(),
      mailId:localStorage.getItem("currentUser"),
      events: [{
       start: this.tripInfo.travelDate,
       end: this.tripInfo.travelDate,
       title: "TransNithya Ticket"
      }]
     };
    this.http.post('http://localhost:8080/api/v1/bus/subscription',{reserveSeat:this.reservationInfo, startDate: this.tripInfo.travelDate,ticketEvent: this.ticketEvent},{'headers':header,observe: 'response',responseType: "text"})
    .subscribe((response) => {
        console.log(response.body);
        window.alert("subscribed successfully");
    },
    (err)=>{
        console.log(err);
        window.alert("subscribed failed");
    })
    // this.updateTransaction(response.razorpay_payment_id);
    // this.service.addTransaction(this.transaction).then((response)=>{
    //   console.log(response);
    // },
    // (err)=>{
    //   console.log(err);
    // }) 
    // var temp:string = this.service.getMailId();
    // console.log(temp);

    // this.service.addCalendarEvent({
    //  mailId: this.service.getMailId(),
    //  events: [{
    //   start: this.tripInfo.travelDate,
    //   end: this.tripInfo.travelDate,
    //   title: "TransNithya Ticket"
    //  }]
    // })
    // .then((res)=> {
    //   console.log(res);
    // },
    // (err)=>{
    //   console.log(err);
    // })
  }

  public getDate(){
    return moment(this.tripInfo.travelDate*1000).format("M/D/YYYY");
  }

  public discount(amount){
    return amount-(amount*10/100);
  }

}
