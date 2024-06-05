import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input
      type="text"
      [value]="defaultDate || selectedDate"
      [(ngModel)]="selectedDate"
      (click)="toggleDatePicker()"
    />
    <div *ngIf="showDatePicker" class="date-picker ">
      <div class="date-picker-header">
        <button class="prev-month" (click)="prevMonth()">&lt;</button>
        <span class="current-month">{{ getCurrentMonth() }}</span>
        <button class="next-month" (click)="nextMonth()">&gt;</button>
        <button class="prev-year" (click)="prevYear()">&lt;</button>
        <span class="current-year">{{ currentYear }}</span>
        <button class="next-year" (click)="nextYear()">&gt;</button>
      </div>
      <div class="date-picker-body">
        <div class="day-names">
          <span *ngFor="let dayName of getDayNames()" class="day-name">{{
            dayName
          }}</span>
        </div>
        <div class="days">
          <span
            class="day"
            *ngFor="let day of getDaysArray()"
            (click)="selectDate(day)"
          >
            {{ day.day }}
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
      .next-month,
      .prev-year,
      .next-year {
        color: black !important;
      }
    `,
  ],
})
export class DatePickerComponent {
  @Output() dateSelected = new EventEmitter<string>();
  @Input() formatLetter: boolean = false;
  @Input() defaultDate: string | Date = '';

  ngOnInit() {
    if (this.defaultDate) {
      const defaultDayjs = dayjs(this.defaultDate, 'DD/MM/YYYY');
      this.currentMonth = dayjs().month(defaultDayjs.month());
      this.currentYear = defaultDayjs.year();
      this.selectedDate = defaultDayjs.format('DD/MM/YYYY');
    } else {
      this.currentMonth = dayjs();
      this.currentYear = this.currentMonth.year();
    }
  }
  


  currentMonth: dayjs.Dayjs;
  showDatePicker: boolean = false;
  selectedDate: string = '';
  currentYear: number;

  constructor() {
    this.currentMonth = dayjs();
    this.currentYear = this.currentMonth.year();
  }

  getDayNames(): string[] {
    const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    return daysOfWeek;
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  prevMonth() {
    this.currentMonth = this.currentMonth.subtract(1, 'month');
    this.currentYear = this.currentMonth.year();
  }

  nextMonth() {
    this.currentMonth = this.currentMonth.add(1, 'month');
    this.currentYear = this.currentMonth.year();
  }

  prevYear() {
    this.currentYear--;
    this.updateCurrentMonth();
  }

  nextYear() {
    this.currentYear++;
    this.updateCurrentMonth();
  }

  updateCurrentMonth() {
    this.currentMonth = this.currentMonth.year(this.currentYear);
  }

  getCurrentMonth(): string {
    return this.currentMonth.format('MMMM');
  }

  getDaysArray(): { day: number; month: string }[] {
    const daysArray: { day: number; month: string }[] = [];
    const daysInMonth = this.currentMonth.daysInMonth();
    const startOfMonth = this.currentMonth.startOf('month');
    const firstDayOfWeek = startOfMonth.day() || 7;

    const offset = firstDayOfWeek - 1;

    const previousMonth = this.currentMonth.subtract(1, 'month');
    const daysInPreviousMonth = previousMonth.daysInMonth();

    for (let i = offset - 1; i >= 0; i--) {
      daysArray.push({ day: daysInPreviousMonth - i, month: 'previous' });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({ day: i, month: 'current' });
    }

    const remainingDays = 7 - (daysArray.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        daysArray.push({ day: i, month: 'next' });
      }
    }

    return daysArray;
  }

  selectDate(dayInfo: { day: number; month: string }) {
    let selectedMonth = this.currentMonth;
    if (dayInfo.month === 'previous') {
      selectedMonth = this.currentMonth.subtract(1, 'month');
    } else if (dayInfo.month === 'next') {
      selectedMonth = this.currentMonth.add(1, 'month');
    }

    const formattedDate = this.formatLetter
      ? selectedMonth.date(dayInfo.day).format('DD MMM. YYYY')
      : selectedMonth.date(dayInfo.day).format('DD/MM/YYYY');
    this.toggleDatePicker();
    this.selectedDate = formattedDate;
    this.dateSelected.emit(formattedDate);
  }
}
