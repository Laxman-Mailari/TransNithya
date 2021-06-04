import { passenger } from './../models/bus';
import { ExternalLibraryService } from './util';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import {MatPaginator} from '@angular/material/paginator';
import { RouteConfigLoadStart, Router } from '@angular/router';
import * as moment from 'moment';
import { CalendarEvent, DateAdapter } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';
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
  selector: 'app-rzrpayment',
  templateUrl: './rzrpayment.component.html',
  styleUrls: ['./rzrpayment.component.css']
})
export class RzrpaymentComponent implements OnInit {

  name = 'Angular';
  response;
  razorpayResponse;
  showModal = false;
  reservationInfo: any;
  totalAmount;
  transaction: any;
  tripInfo;
  newEvent: any;
  ELEMENT_DATA: PeriodicElement[] ;
  datasource;

  departure:number;
  arrival:number;

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
    private router: Router) { }

  ngOnInit(): void {
    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();

      this.tripInfo = this.service.getTripInfo();
      this.reservationInfo = this.service.getReservationInfo();
      this.totalAmount = this.service.getTotalAmount();
      this.RAZORPAY_OPTIONS.prefill.email = this.reservationInfo.mailId;
      this.RAZORPAY_OPTIONS.prefill.contact = this.reservationInfo.phoneNumber;
      this.departure = this.tripInfo.travelDate + this.service.getStartTime();
      this.arrival = this.tripInfo.travelDate + this.service.getEndTime();

      //console.log(this.arrival + " "+ this,this.departure);

      //console.log(this.reservationInfo.passengers);

      this.ELEMENT_DATA = [];
      for(let i=0;i<this.reservationInfo.passengers.length;i++){
        this.ELEMENT_DATA.push({
          serial_no: i+1,
          name: this.reservationInfo.passengers[i].name,
          age: this.reservationInfo.passengers[i].age,
          seatNumber: this.reservationInfo.passengers[i].seatNumber,
          departue: this.departure ,
          arrival: this.arrival
        })
      }
      this.datasource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  }


  public proceed() {
    this.RAZORPAY_OPTIONS.amount = this.totalAmount + '00';
    
    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open();
  }

  public updateTransaction(payment_id){
    this.transaction = {
      mailId: this.reservationInfo.mailId,
      transaction : [
        {
          paymentId: payment_id,
          date: this.departure,
          source: this.reservationInfo.source,
          destination: this.reservationInfo.destination,
          busNumber: this.reservationInfo.busNumber,
          status: "booked",
          seatNumbers : this.service.getSelectedSeats()
        }
      ]
    }
  }

  public razorPaySuccessHandler(response) {
    //console.log(response);
    //window.alert("payment id: "+response.razorpay_payment_id);

    this.service.reserveSeats().then((reserResponse)=>{
      //console.log(response);
      window.alert("seat reserved successfully");
      this.updateTransaction(response.razorpay_payment_id);

      // add transaction
      this.service.addTransaction(this.transaction).then((response)=>{
        console.log(response);
      },
      (err)=>{
        console.log(err);
      }),

      //add calendar event
      this.service.addCalendarEvent({
        mailId: localStorage.getItem("currentUser"),
        events: [{
         source: this.tripInfo.source,
         destination: this.tripInfo.destination,
         start: this.departure,
         end: this.arrival,
         title: "TransNithya Ticket"
        }]
       })
       .then((res)=> {
         console.log(res);
       },
       (err)=>{
         console.log(err);
       })
    },
    (err)=>{
      console.log(err);
      window.alert(err)
    })
  
  }

  public getDate(date){
    console.log(date);
    return moment(date*1000).format("YYYY-MM-DD HH:mm:ss");
  }
  public getTravelDate(inputDate){
    return moment(inputDate*1000).format("DD-MM-YYYY");
  }

}
