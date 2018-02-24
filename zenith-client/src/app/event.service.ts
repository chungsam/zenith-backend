import { Event } from './event';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class EventService {
  private BASE_URL = "/api/events";

  constructor(public _http: Http) { }

  getEvents() {
    return this._http.get(this.BASE_URL)
      .map(res => res.json());
  }

}

