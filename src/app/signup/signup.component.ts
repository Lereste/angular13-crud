import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    // private signUpApi: SignupService,
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  // make method to create User
  signUp() {
    if (this.signupForm.valid) {
      this.api.postUser(this.signupForm.value)
        .subscribe({
          next: (response) => {
            alert('Registration Successful');
            this.signupForm.reset();

            // navigation to login page if register success
            this.router.navigate(['login']);
          },
          error: (error) => {
            alert("Error: " + error.message);
          }
        })
    }
  }

}
