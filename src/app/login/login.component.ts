import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.required,
        // Validators.email
      ],
      password: [
        '',
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(30),
      ],
    })
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }

  logIn() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.api.getUser()
        .subscribe({
          next: (response) => {
            const userInfo = response.find((userData: any) => {
              return userData.email === this.loginForm.value.email && userData.password === this.loginForm.value.password;
            });
            
            if (userInfo) {
              sessionStorage.setItem('email', userInfo.email);
              sessionStorage.setItem('password', userInfo.password);

              // console.log(localStorage);
              alert("Login is successfully ^^");
              this.loginForm.reset();
              this.router.navigate(['home']);
            } else {
              alert("User Not Found!, Please try again or Register");
            }
          },
          error: (error) => {
            alert("Error: " + error.message);
          }
        })
    }
  }
}