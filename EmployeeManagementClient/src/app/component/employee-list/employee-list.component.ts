import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent, FormsModule, AddEmployeeComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  filterText: string = ''; // הוספת משתנה כדי לאחסן את ערך הפילטר

  constructor(private _employeeService: EmployeeService, private router: Router, private dialog: MatDialog) { }
  ngOnInit() {
    this.getEmployeeList()
  }
  getEmployeeList() {
    this._employeeService.getEmployeeList().subscribe(
      (employee: Employee[]) => {
        console.log(employee)
        this.employees = employee
        this.filteredEmployees = this.employees
      }, (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    if (!filterValue) {
      this.filteredEmployees = this.employees;
      return;
    }
    this.filteredEmployees = this.employees.filter((employee: Employee) =>
      employee.firstName.toLowerCase().includes(filterValue) ||
      employee.lastName.toLowerCase().includes(filterValue) ||
      employee.tz.toLowerCase().includes(filterValue) ||
      employee.startDate.toLowerCase().includes(filterValue)
    );
  }
  navigateToEdit() {
    this.router.navigate(['/add-employee']);
  }
  exportToExcel() {
    const data: any[] = [];
    const headers = ['First Name', 'Last Name', 'Tz', 'Start Date'];
    data.push(headers);

    this.filteredEmployees.forEach(employee => {
      const { firstName, lastName, tz, startDate } = employee;
      data.push([firstName, lastName, tz, startDate]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, 'employees.xlsx');
  }
}
