import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input type="text" [(ngModel)]="selectedDate" (click)="toggleDatePicker()">
    <div *ngIf="showDatePicker" class="date-picker ">
      <div class="date-picker-header">
        <button class="prev-month" (click)="prevMonth()">&lt;</button>
        <span class="current-month">{{ getCurrentMonth() }}</span>
        <button class="next-month" (click)="nextMonth()">&gt;</button>
      </div>
      <div class="date-picker-body" >
        <div class="day-names">
          <span>Dim</span><span>Lun</span><span>Mar</span><span>Mer</span
          ><span>Jeu</span><span>Ven</span><span>Sam</span>
        </div>
        <div class="days">
          <span class="day" 
                *ngFor="let day of getDaysArray()" 
                (click)="selectDate(day)">
            {{ day }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .date-picker {
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 300px;
        font-family: Arial, sans-serif;
      }
      .date-picker-header {
        display: flex;
        justify-content: space-between;
        align-items: center !important;
        padding: 10px;
        background-color: #f0f0f0;
        border-bottom: 1px solid #ccc;
      }
      .date-picker-header button {
        background: none;
        border: none;
        cursor: pointer;
      }
      .date-picker-body {
        padding: 10px;
      }
      .day-names,
      .days {
        display: flex;
        flex-wrap: wrap;
      }
      .day-names span,
      .days .day {
        width: 14.28%;
        text-align: center;
        padding: 5px 0;
      }
      .days .day {
        cursor: pointer;
        border-radius: 4px;
      }
      .days .day:hover {
        background-color: #e0e0e0;
      }
      .prev-month,
      .next-month {
        color: black !important;
      }
    `,
  ],
})
export class DatePickerComponent {
  @Output() dateSelected = new EventEmitter<string>();

  currentMonth: dayjs.Dayjs;
  showDatePicker: boolean = false;
  selectedDate: string = '';

  constructor() {
    this.currentMonth = dayjs();
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  prevMonth() {
    this.currentMonth = this.currentMonth.subtract(1, 'month');
  }

  nextMonth() {
    this.currentMonth = this.currentMonth.add(1, 'month');
  }
  
  getCurrentMonth(): string {
    return this.currentMonth.format('MMMM YYYY');
  }

  getDaysArray(): number[] {
    const daysArray: number[] = [];
    const daysInMonth = this.currentMonth.daysInMonth();
  
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
  
    return daysArray;
  }

  selectDate(day: number) {
    const formattedDate = this.currentMonth.format(`${day}/MM/YYYY`);
    this.toggleDatePicker();
    this.selectedDate = formattedDate;
    this.dateSelected.emit(formattedDate);
  }
}
