import { EventService } from './../event.service';
import { Event } from './../event';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  title:string = "This Week's Events";
  events:Array<Event> = [];

  constructor(public eventService:EventService) { }

  getEvents(): void {
    this.eventService.getEvents()
    .then(events => this.events = events);

    console.log(this.events);
  }

  ngOnInit() {
    this.getEvents();

  }

}
