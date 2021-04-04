import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboard = [];
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _eventService: EventService
  ) {}

  ngOnInit() {
    this._eventService.getDashboard().subscribe((response: any) => {
      if (response.status == 'error') {
        console.log(response);
        alert(response.message);
        this.router.navigate(['']);
      } else {
        console.log(response.message);
      }
    });
  }

  loggedIn() {
    var outA = this._authService.loggedIn();
    return outA;
  }

  logoutUser() {
    this._authService.logoutUser();
  }
}
