import { endOfDay, startOfDay,  endOfMonth,
  isSameDay,
  isSameMonth, } from 'date-fns';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { AuthService } from '../auth/auth-service';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-test',
  templateUrl: './calendar-test.component.html',
  styleUrls: ['./calendar-test.component.css']
})
export class CalendarTestComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  myEvents: any[];
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  public activeDayIsOpen: boolean = true;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  events: CalendarEvent[] = [];

  constructor(private service: AuthService, private http: HttpClient,private modal: NgbModal) { }

  ngOnInit() {
    this.addEventToArray();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    // if (isSameMonth(date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //     console.log("if");
    //   } else {
    //     this.activeDayIsOpen = true;
    //     console.log("else");
    //   }
    //   this.viewDate = date;
    // }
    
  }

  dateIsValid(date: Date): boolean {
    return date.getTime() > new Date().getTime();
  }

  applyDateSelectionPolicy({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      //console.log(day.date);
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'disabled-date';
        // day.backgroundColor="black";
        
      }
    });
  }

  addEventToArray(){
    this.service.getCalendarEvent().then((response: any)=>{
      this.myEvents = response.body.events;
      console.log(response.body.events);
      this.events = [] // create a new array here, angular will then be able to pick it up
      for(var i=0;i<this.myEvents.length;i++){
        this.events.push({
          start: startOfDay(new Date(this.myEvents[i].start * 1000)),
          end: endOfDay(new Date(this.myEvents[i].end * 1000)),
          title: this.myEvents[i].title
        })
      }
    });
  }

}