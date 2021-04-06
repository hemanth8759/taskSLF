import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  loginGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    var loginData = this.loginGroup.value;

    this.http.post('/loginNd', loginData).subscribe(
        (response : any) => {
        if (response.status == "error") {
          console.log(response);
          alert(response.message);
        } else {
          console.log(response.token);
          localStorage.setItem('token', response.token)
          this.router.navigate(['dashboard']);
        }
      }
    );
  }

  navigateRegister() {
    this.router.navigate(['register']);
  }
}
