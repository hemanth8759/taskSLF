import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  userGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })

  sendData() {
    var jsonData = this.userGroup.value;

    this.http
      .post('/registerNd', jsonData)
      .subscribe((response : any) => {
        if (response.status == "error") {
          console.log(response);
          alert(response.message);
        } else {
          alert('Registration success \n' + 'please press Enter or click OK');
          this.router.navigate(['']);
        }
      })
  }
}
