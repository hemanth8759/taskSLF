import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
