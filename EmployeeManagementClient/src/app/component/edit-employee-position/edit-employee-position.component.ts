import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { Position } from '../../models/position.model';
import { PositionService } from '../../services/position.service';
import { EmployeePositions } from '../../models/employeePositions.model';
import { Employee } from '../../models/employee.model';
import { validatePositionId } from '../validators/positionIdValidate';
import { validateEntryDate } from '../validators/entryDateValidator';
import { formatDateExternal } from '../validators/formatDate';



@Component({
  selector: 'app-edit-employee-position',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatCheckboxModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './edit-employee-position.component.html',
  styleUrl: './edit-employee-position.component.css'
})
export class EditEmployeePositionComponent implements OnInit {
  @Output() savePositionData: EventEmitter<any> = new EventEmitter();
  @Input() employee!: Employee;
  positionGroups: FormGroup[] = [];
  positions: Position[] = [];
  constructor(
    private fb: FormBuilder,
    private _positionService: PositionService,
  ) {
  }
  ngOnInit(): void {
    this.getPositions();
    console.log('employee1', this.employee);

    // יצירת FormGroup עבור כל תפקיד והוספתו לתוך positionGroups
    this.employee.employeePositions.forEach(e => {
      const positionGroup = this.createPositionFormGroup(e); // יצירת FormGroup עבור התפקיד
      this.positionGroups.push(positionGroup); // הוספת התפקיד לתוך positionGroups
    });
  }
  createPositionFormGroup(positionData: EmployeePositions): FormGroup {
    return this.fb.group({
      positionId: [positionData.positionId, [(control: AbstractControl<any, any>) => validatePositionId(control, this.positionGroups)]],
      admin: [positionData.admin],
      entryDate: [formatDate(positionData.entryDate, 'yyyy-MM-dd', 'en-US'), validateEntryDate(new Date(this.employee.startDate))]
    });
  }
  getPositions() {
    this._positionService.getAllPositions().subscribe(
      (position: Position[]) => {
        console.log("position", position)
        this.positions = position;
      }, (error) => {
        console.error('Error fetching position:', error);
      }
    );
  }
  addPosition(): void {
    const positionGroup = this.fb.group({
      positionId: ['', [Validators.required, (control: AbstractControl<any, any>) => validatePositionId(control, this.positionGroups)]],
      admin: [false],
      entryDate: ['', [Validators.required, validateEntryDate(new Date(this.employee.startDate))]]
    });

    // Formatting entryDate
    positionGroup.get('entryDate')?.valueChanges.subscribe((value) => {
      if (value) {
        const formattedDate = new Date(value); // המרת המחרוזת לתאריך מסוג Date
        positionGroup.get('entryDate')?.setValue(formatDateExternal(formattedDate), { emitEvent: false });
      }
    });

    this.positionGroups.push(positionGroup);

  }
  deletePosition(index: number): void {
    this.positionGroups.splice(index, 1);
  }
  isInvalid(): boolean {
    return this.positionGroups.length === 0 || this.positionGroups.some(group => group.invalid);
  }
  save() {
    this.savePositionData.emit(this.positionGroups);

  }
}
