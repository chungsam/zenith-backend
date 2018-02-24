import { EventService } from './../event.service';
import { Event } from './../event';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  title:string = "This Week's Events";
  events = [];
  currentWeekEvents = [];
  currentWeekNum = moment(new Date(),"YYYYMMDD").isoWeek();

  constructor(public eventService:EventService) { }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      
      this.currentWeekEvents = this.events.filter(event => {
        let weekNum = moment(event.eventDateTimes.date, "YYYYMMDD").isoWeek();

        return weekNum === this.currentWeekNum && event.isActive;
      });
      
      this.currentWeekEvents.sort(this.sortByDate);
    });

  }

  sortByDate(e1, e2) {
    if(e1.eventDateTimes.date < e2.eventDateTimes.date) {
      return -1;
    } else {
      if (e1.eventDateTimes.date > e2.eventDateTimes.date) {
        return 1;
      }
    } return 0;
  }

  ngOnInit() {
    this.getEvents();
  }

}
