import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _dashboard = "/dashboardNd";

  constructor(private http: HttpClient) { }

  getDashboard() {
    return this.http.get(this._dashboard);
  }
}
