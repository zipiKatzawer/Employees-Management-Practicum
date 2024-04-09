import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';

import { Position } from '../../models/position.model';
import { EmployeeService } from '../../services/employee.service';
import { PositionService } from '../../services/position.service';
import { Employee } from '../../models/employee.model';
import { EmployeePositions } from '../../models/employeePositions.model';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { validateDateOfBirth } from '../validators/dateOfBirthValidator';
import { formatDateExternal } from '../validators/formatDate';
import { AddEmployeePositionComponent } from '../add-employee-position/add-employee-position.component';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatCheckboxModule, MatButtonModule, MatDatepickerModule, AddEmployeePositionComponent, TopBarComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  positionGroups: FormGroup[] = [];
  positions: Position[] = [];

  constructor(private fb: FormBuilder, private employeeService: EmployeeService,
    private _positionService: PositionService, private routr: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      tz: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dateBirth: ['', [Validators.required, validateDateOfBirth]],
      startDate: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  isInvalid(): boolean {
    return this.employeeForm.invalid || this.positionGroups.length === 0 || this.positionGroups.some(group => group.invalid);
  }
  savePositionDataHandler(data: any): void {
    this.positionGroups = data
    console.log("data", data);
  }
  addEmployee(): void {
    if (this.employeeForm.valid) {
      const employeeData: Employee = this.employeeForm.value;
      employeeData.startDate = formatDateExternal(this.employeeForm.value.startDate);// Formatting startDate
      employeeData.dateBirth = formatDateExternal(this.employeeForm.value.dateBirth); // Formatting dateBirth
      const positions: EmployeePositions[] = this.positionGroups.map(group => group.value);
      employeeData.employeePositions = positions;

      this.employeeService.addEmployee(employeeData)
        .subscribe((employee) => {
          console.log(employee);

          console.log('Employee added successfully');
          this.employeeForm.reset();
          this.positionGroups = [];
          // Show Sweet Alert
          Swal.fire({
            title: '!The employee was successfully added',
            icon: 'success',
            confirmButtonText: 'submit'
          })
            .then((result) => {
              // Navigate to all recipes page
              if (result.isConfirmed) {
                this.routr.navigate(['/employee-list']);
              }
            });

        }, error => {
          console.error("Error adding employee:", error);
          // this.successMessage = "שגיאה בהוספת עובד. אנא נסה שנית.";
          Swal.fire({
            title: 'שגיאה',
            text: 'Error adding an employee. please try again.',
            icon: 'error',
            confirmButtonText: 'submit'
          });
        });
    }
  }
}