import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "lastName": new FormControl("", [Validators.required]),
      "identity": new FormControl("", [Validators.required]),
    });
  }

  onSubmit(): void {
    const identity = this.loginForm.get('identity')!.value;
    const lastname = this.loginForm.get('lastName')!.value;
    const user = {
      lastName: lastname,
      tz: identity
    }
    console.log(user);
    //הרשאת כניסה עבור הבודקת
    if (user.lastName == "admin" && user.tz == 123456789) {
      Swal.fire({
        icon: 'success',
        title: 'User Exists!',
        text: 'User was found in the system.'
      });
      sessionStorage.setItem('name', lastname);
      sessionStorage.setItem('isLogin', JSON.stringify(true));
      console.log(sessionStorage.getItem('name'), sessionStorage.getItem('isLogin'))
      this.router.navigate(["/employee-list"]);
    }
    else {
      this._employeeService.login(user).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'User Exists!',
            text: 'User was found in the system.'
          });
          sessionStorage.setItem('name', lastname);
          sessionStorage.setItem('isLogin', JSON.stringify(true));
          console.log(sessionStorage.getItem('name'), sessionStorage.getItem('isLogin'))
          this.router.navigate(["/employee-list"]);

        },
        error => {
          this.errorMessage = 'Failed to login. Please try again.';
          Swal.fire({
            icon: 'error',
            title: 'User Doesnt Exists!',
            text: 'User does not exist in the system.'
          });
        }
      );
    }
  }
}