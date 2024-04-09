import { CommonModule, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';

import { Position } from '../../models/position.model';
import { EmployeePositions } from '../../models/employeePositions.model';
import { EditEmployeePositionComponent } from '../edit-employee-position/edit-employee-position.component';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { validateDateOfBirth } from '../validators/dateOfBirthValidator';
import { formatDateExternal } from '../validators/formatDate';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatCheckboxModule, MatButtonModule, MatDatepickerModule, EditEmployeePositionComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  positionGroups: FormGroup[] = [];
  employee!: Employee;
  positions: Position[] = [];
  isPossible = false;
  isSave = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private fb: FormBuilder, private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EditEmployeeComponent>, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployeeById(this.data);
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      tz: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dateBirth: ['', [Validators.required, validateDateOfBirth]],
      startDate: ['', [Validators.required]],
      gender: ['', Validators.required],
      positions: this.fb.array([])
    });
  }

  getEmployeeById(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      (employee: Employee) => {
        this.employee = employee
        console.log("employee", employee);
        this.isPossible = true;
        this.employeeForm.patchValue({
          tz: employee.tz,
          firstName: employee.firstName,
          lastName: employee.lastName,
          startDate: formatDate(employee.startDate, 'yyyy-MM-dd', 'en-US'),
          dateBirth: formatDate(employee.dateBirth, 'yyyy-MM-dd', 'en-US'),
          gender: employee.gender,
          positions: employee.employeePositions // עדכון נתוני הטופס עם נתוני תפקידי העובד
        });
      },
      error => {
        console.error('Failed to retrieve employee data', error);
      }
    );
  }
  isInvalid(): boolean {
    return this.employeeForm.invalid || !this.isSave;
  }
  savePositionDataHandler(data: any): void {
    this.positionGroups = data
    console.log("data", data, this.isSave);
    this.isSave = true

  }
  updateEmployee(): void {
    if (this.employeeForm.valid) {
      const employeeData: Employee = this.employeeForm.value;
      employeeData.startDate = formatDateExternal(this.employeeForm.value.startDate);// Formatting startDate
      employeeData.dateBirth = formatDateExternal(this.employeeForm.value.dateBirth); // Formatting dateBirth
      const positions: EmployeePositions[] = this.positionGroups.map(group => group.value);
      employeeData.employeePositions = positions;
      console.log("employeeData", employeeData);
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to save the changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#FF69B4',
        cancelButtonColor: '#FFFFFF',
        background: '#FFFFFF',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.employeeService.updateEmployee(this.data, employeeData)
            .subscribe(() => {
              Swal.fire({
                title: 'Employee updated successfully!',
                text: 'The employee has been updated successfully.',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                background: '#FFFFFF',
                iconColor: '#FF69B4'
              }
              ).then(() => {
                this.dialogRef.close()
                // this.router.navigate(['/employee-list']); 
              });

            }, (error) => {
              // Handle errors during update
              console.error('Error updating employee:', error);
              Swal.fire({
                title: 'Error!',
                text: 'An error occurred while saving changes.',
                icon: 'error',
                confirmButtonColor: '#FF69B4',
                background: '#FFFFFF'
              });
            });
        }
      });
    }
  }
}