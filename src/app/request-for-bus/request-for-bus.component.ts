import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AuthService } from '../auth/auth-service';

interface requestForBus{
  mailId: string,
  source: string,
  destination: string,
  travelDate: number,
  numberOfSeats: number
}

@Component({
  selector: 'app-request-for-bus',
  templateUrl: './request-for-bus.component.html',
  styleUrls: ['./request-for-bus.component.css']
})
export class RequestForBusComponent implements OnInit {

  requestBusForm: FormGroup;
  requestBus: requestForBus;
  minDate: Moment;

  places = ["Hebbal bridge", "Veeranapalya", "Manyatha Tech Park", "Nagawara", "Hennur Cross", "Kalyananagara"
  , "Babusabpalya", "banasawadi", "Ramamurthi Nagar", "Kasturi Nagar", "Tin Factory,", "Railway Station KR Puram",
  "Mahadevapur", "EMC2", "Doddanekundi", "Karthik Nagar", "Marathahalli Bridge", "Multiplex Marathahalli", "Kadabisanahalli"];

  constructor(private http: HttpClient,private service: AuthService) { 
    this.requestBusForm = new FormGroup ({
      'userTripData' : new FormGroup ({
        'mailId' : new FormControl(null,[Validators.required]),
        'source' : new FormControl(null, [Validators.required]),
        'destination': new FormControl(null,[Validators.required]),
        'travelDate': new FormControl(null,[Validators.required]),
        'totalSeats': new FormControl(null,[Validators.required])
      })
    })
    let trip = this.service.getTripInfo();
    console.log(trip);
    if(trip != null){
      this.requestBusForm.get('userTripData.mailId').setValue(localStorage.getItem('currentUser'));
      this.requestBusForm.get('userTripData.source').setValue(trip.source);
      this.requestBusForm.get('userTripData.destination').setValue(trip.destination);
    }
    
  }

  ngOnInit(): void {
    this.minDate =  moment().add(1,'days');
  }

  onSubmit(requestData:{
    mailId: string,
    source: string,
    destination: string,
    travelDate: Moment,
    totalSeats: number
  }){
    //window.alert("we will notify soon");
    //console.log(requestData.travelDate);
    var epoch = moment(requestData.travelDate, "MM/DD/YYYY HH:mm:ss").valueOf();
    //console.log(epoch);
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));

    this.requestBus = {mailId: requestData.mailId,source: requestData.source, destination: requestData.destination, travelDate: epoch, numberOfSeats: requestData.totalSeats}
    this.http.post('http://localhost:8080/api/v1/bus/requestForBus',this.requestBus, {'headers': header,observe: 'response',responseType: "text"})
    .subscribe((res)=> {
      window.alert("we will notify soon");
    },
    (err)=> {
      console.log(err);
    })
    console.log(requestData);
   }

}
