import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Position } from '../../models/position.model';
import { PositionService } from '../../services/position.service';
import { validateEntryDate } from '../validators/entryDateValidator';
import { validatePositionId } from '../validators/positionIdValidate';
import { formatDateExternal } from '../validators/formatDate';


@Component({
  selector: 'app-add-employee-position',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatCheckboxModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './add-employee-position.component.html',
  styleUrl: './add-employee-position.component.css'
})
export class AddEmployeePositionComponent implements OnInit {
  @Input() startDate!: Date
  @Output() savePositionData: EventEmitter<any> = new EventEmitter();
  positionGroups: FormGroup[] = [];
  positions: Position[] = [];

  constructor(private fb: FormBuilder, private _positionService: PositionService) { }
  ngOnInit(): void {
    this.getPositions();
  }

  getPositions(): void {
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
      entryDate: ['', [Validators.required, validateEntryDate(this.startDate)]]
    });

    // Formatting entryDate
    positionGroup.get('entryDate')?.valueChanges.subscribe((value) => {
      if (value) {
        const formattedDate = new Date(value); // המרת המחרוזת לתאריך מסוג Date
        positionGroup.get('entryDate')?.setValue(formatDateExternal(formattedDate), { emitEvent: false });
      }
    });


    this.positionGroups.push(positionGroup);
    this.savePositionData.emit(this.positionGroups);

  }
  deletePosition(index: number): void {
    this.positionGroups.splice(index, 1);
  }
  isInvalid(): boolean {
    return this.positionGroups.length === 0 || this.positionGroups.some(group => group.invalid);
  }
}
