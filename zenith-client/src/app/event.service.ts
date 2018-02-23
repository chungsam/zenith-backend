import { Event } from './event';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class EventService {
  private BASE_URL = "api/events";

  constructor(public _http: Http) { }

  getEvents(): Promise<Event[]> {
    return this._http.get(this.BASE_URL)
      .toPromise()
      .then(data => data.json() as Event[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

