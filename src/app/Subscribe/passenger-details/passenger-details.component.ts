import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service';

interface TripInfo{
  source:string,
  destination: string,
  travelDate: number
}

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {

  detailsForm: FormGroup;

  selectedSeats: number[];
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
    this.router.navigate(['/subscription-payment']);
    // this.service.reserveSeats(this.detailsForm.value).then((response)=>{
    //   console.log(response);
    // },
    // (err)=>{
    //   console.log(err);
    // })
    this.service.updateReservationInfo(this.detailsForm.value);
  }

}
