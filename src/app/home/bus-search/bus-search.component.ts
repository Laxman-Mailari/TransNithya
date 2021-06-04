import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth-service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { information } from 'src/app/Store/information';


@Component({
  selector: 'app-bus-search',
  templateUrl: './bus-search.component.html',
  styleUrls: ['./bus-search.component.css']
})
export class BusSearchComponent implements OnInit {

  @Output() tripInfo = new EventEmitter();

  myForm: FormGroup;
  myControl = new FormControl();
  filteredOption: Observable<string[]>; 
  stops: string[] ;

  isdisabled = true;

  minDate: Moment;
  maxDate: Moment;

  constructor(private service: AuthService, private router: Router, private places: information) { 
    this.myForm = new FormGroup({
      'tripInfo': new FormGroup({
        'source' : new FormControl(null,[Validators.required]),
        'destination': new FormControl(null,[Validators.required]),
        'travelDate' : new FormControl(null,[Validators.required]),
      })
    });
    this.stops = this.places.allStopNames;
    this.minDate = moment().add(1,'days');
    this.maxDate = moment().add(2,'days');
  }


  ngOnInit() {
    this.filteredOption = this.myForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
    //window.alert(this.service.getMailId());
  }

  private _filter(value: string): string[]{
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.stops.filter(place =>
      place.toLowerCase().includes(filterValue));
  }


  onSubmit(postData: {source:string,destination:string,travelDate:Moment}){
    if(localStorage.getItem("isLoggedIn") === "true"){
      this.service.setTripinfo(postData).then((res) => {
        console.log(res);
      });
      
      this.router.navigate(['/search-bus']);
      //this.service.serachForBuses();
      console.log(postData);
    }else{
      window.alert("Please login then search");
    }
  }

}
