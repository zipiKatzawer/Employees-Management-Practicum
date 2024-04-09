import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { EmployeeService } from '../../services/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';


@Component({
  selector: 'tr[app-employee-details]',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() employee!: Employee
  constructor(private _employeeService: EmployeeService, private dialog: MatDialog, private router: Router) { }
  ngOnInit(): void {
    console.log("employee", this.employee);

  }
  openEditEmployeeDialog() {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      //  width: '250px',
      data: this.employee.id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // כאן תוכל לטפל בתוצאה שנמסרה בעת סגירת הדיאלוג
    });
  }

  deleteEmployee(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        // Implement your delete recipe logic here
        this._employeeService.deleteEmployee(this.employee.id).subscribe(
          () => {
            // הצגת הודעה למשתמש על הצלחת המחיקה
            console.log('Employee deleted successfully');
            // ניתוב לדף אחר, לדוגמה חזרה לדף הראשי
            // this.router.navigate(['/']);
          },
          (error: Error) => {
            // במקרה של כשל במחיקת המתכון, ניתן להציג הודעת שגיאה למשתמש
            console.error('Failed to delete employee:', error);
          }
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your employee has been deleted.",
          icon: "success"
        });
      }
    });

  }
}

