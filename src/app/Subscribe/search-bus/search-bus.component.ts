import { bus,passenger, stop } from './../../models/bus';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AuthService } from 'src/app/auth/auth-service';
import { information } from 'src/app/Store/information';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {

  collapsed = true;
  myForm: FormGroup;
  number_buses = 0;
  busData: bus[];
  tempSeats: passenger[]; 
  tempPass: passenger;
  classExpression = "Seat_Unoccupied";
  otherClass: string;
  seatNumber: number;
  seatSelected: number[];
  amount: number;
  stdAmount:number;
  places: string[] ;
  isDisabled: boolean;
  minDate: Moment;
  maxDate: Moment;

  constructor(private info: information,private service: AuthService,private router: Router) {
    this.myForm = new FormGroup({
      'tripInfo': new FormGroup({
        'source' : new FormControl(null,[Validators.required]),
        'destination': new FormControl(null,[Validators.required]),
        'travelDate' : new FormControl(null,[Validators.required]),
      })
    })
    this.seatSelected = [];
    this.amount = 0;
    this.places = this.info.allStopNames;
   }

  ngOnInit(): void {
    this.minDate = moment().add(3,'days');
    this.maxDate = moment().add(32,'days');
    let trip = this.service.getTripInfo()
    if(trip != null){
      var momentDate = moment(trip.travelDate*1000).format("M/D/YYYY");
      //window.alert(momentDate);
      this.myForm.get('tripInfo.source').setValue(trip.source);
      this.myForm.get('tripInfo.destination').setValue(trip.destination);
      this.myForm.get('tripInfo.travelDate').setValue(momentDate);

      this.service.serachForBuses().then((res: bus[]) => {
        this.busData = res;
        this.number_buses = res.length;
        console.log(res);
      });
    }
  }

  onCollapsed(){
    if(this.collapsed){
      this.collapsed = false;
    }
    else{
      this.collapsed=true;
    }
  }

  onSubmit(postData: {source:string,destination:string,travelDate:Moment}){
    this.service.setTripinfo(postData).then((res) => {});

    this.service.serachForBuses().then((res: bus[]) => {
      this.busData = res;
      this.number_buses = res.length;
      console.log(res);
    })
    .catch((err)=>{
      this.number_buses = 0;
      console.log("Error: "+ err.error.message);
    });
  }

  getTime(stops: stop[],place): string{
    for(var i=0;i<stops.length;++i){
      if(stops[i].name === place){
        return stops[i].time;
      }
    }
  }

  calculateTotalTime(time1, time2){
    let t1 = parseInt(time1.split(':')[0])*60 + parseInt(time1.split(':')[1]);
    let t2 = parseInt(time2.split(':')[0])*60 + parseInt(time2.split(':')[1]);
    t1 = t2-t1;
    this.stdAmount = t1*2;
    t2 = Math.floor(t1 / 60)
    t1 = t1 % 60;
    return t2.toString()+"hrs "+ t1.toString()+"mins";
  } 


  showEvent(seatNumber){
    //console.log(document.getElementById(seatNumber).classList.contains("Seat_Unoccupied"));
    if(document.getElementById(seatNumber).classList.contains("Seat_Unoccupied")){
      this.classExpression = "Seat_Active";
      this.otherClass = "Seat_Unoccupied";
      this.seatNumber = seatNumber;
      this.seatSelected.push(seatNumber);
      this.amount = this.stdAmount * this.seatSelected.length;
    }
    else if (document.getElementById(seatNumber).classList.contains("Seat_Occupied")) {
      this.otherClass = "Seat_Occupied";
    } 
    else{
      // document.getElementById(seatNumber).className = "Seat_Unoccupied";
      this.classExpression = "Seat_Unoccupied";
      this.seatNumber = seatNumber;
      this.otherClass = "Seat_Active";
      let temp = this.seatSelected.indexOf(seatNumber);
      if(temp != -1){
        let temp = [];
        for(var i=0;i<this.seatSelected.length;i++){
          if(this.seatSelected[i] != seatNumber){
            temp.push(this.seatSelected[i]);
          }
        }
        this.seatSelected = temp;
        this.amount = this.stdAmount * this.seatSelected.length;
      }
    }
    console.log(this.seatSelected);
  }

  isSeatsEqual(seat1,seat){
    if(this.seatNumber == undefined && seat.status == "Booked"){
      this.otherClass = "Seat_Occupied";
      return false;
    }
    else if (this.seatNumber == undefined && seat.status == "Not Booked") {
      this.otherClass = "Seat_Unoccupied";
      return false;
    } 
    else if(seat1 == this.seatNumber){
      if(document.getElementById(seat.seatNumber).classList.contains("Seat_Unoccupied")){
        this.otherClass = "Seat_Unoccupied";
      }else{
        this.otherClass = "Seat_Active";
      }
      return true;
    }else{
      if(document.getElementById(seat.seatNumber).classList.contains("Seat_Unoccupied")){
        this.otherClass = "Seat_Unoccupied";
      }else if(document.getElementById(seat1).classList.contains("Seat_Occupied")){
        this.otherClass = "Seat_Occupied";
      }
      else{
        this.otherClass = "Seat_Active";
      }
      return false;
    }
  }

  onProceed(busNumber){
    this.amount = this.amount * 5;
    this.router.navigate(['/passenger-details']);
    this.service.setSelectedSeats(this.seatSelected).then((res)=>{});
    this.service.updateTotalAmount(this.amount);
    this.service.updateBusNumber(busNumber);
  }

}
