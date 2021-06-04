import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';

interface TripInfo{
  source:string,
  destination: string,
  travelDate: number
}


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})

export class BookingDetailsComponent implements OnInit {

  detailsForm: FormGroup;

  selectedSeats: number[] = null;
  tripInfo: TripInfo;

  constructor(private service: AuthService, private router: Router,private http: HttpClient,private fb: FormBuilder) {
    this.detailsForm = fb.group({
      source : [],
      destination : [],
      busNumber: [],
      mailId : [],
      phoneNumber : [],
      passengers : fb.array([])
    })
   }

  ngOnInit(): void {
    this.selectedSeats = this.service.getSelectedSeats();
    this.tripInfo = this.service.getTripInfo();
    for(var i=0;i<this.selectedSeats.length;i++){
      this.addPassengers(this.selectedSeats[i]);
    }
    this.detailsForm.get('source').setValue(this.tripInfo.source);
    this.detailsForm.get('destination').setValue(this.tripInfo.destination);
    this.detailsForm.get('busNumber').setValue(this.service.getBusNumber());
    this.detailsForm.get('mailId').setValue(localStorage.getItem("currentUser"));
  }

  addPassengers(num){
    const add = this.detailsForm.get('passengers') as FormArray;
    add.push(this.fb.group({
      seatNumber : num,
      name : [],
      gender : ['Male'],
      age : []
    }))
  }

  onSubmit(){
    this.router.navigate(['/payment']);
    this.service.updateReservationInfo(this.detailsForm.value);
  }

  isLoaded(){
    if(this.selectedSeats != null){
      return true.valueOf;
    }
    return false;
    //this.router.navigate(['/payment']);
  }

}
