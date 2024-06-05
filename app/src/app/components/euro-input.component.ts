import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-euro-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class=" h-12" [style.width.px]="width" (click)="onDivClick($event)">
      <span class="w-full rounded-md h-full" *ngIf="!isEditing">{{ displayValue | currency}}</span>
      <input
        class="w-full h-fit"
        *ngIf="isEditing"
        type="number"
        [value]="displayValue"
        (blur)="onBlur($event)"
        (input)="onInput($event)"
        (keydown.enter)="onEnter()"
        step="0.1"
      />
    </div>
  `,
  styles: [
    `
      div {
        display: inline-block;
      }
      span {
        padding: 10px;
        border: 1px solid #ccc;
        cursor: pointer;
        display: inline-block;
        text-align: end;
      }
      input {
        padding: 10px;
        border: 1px solid #ccc;
        width: 100%;
        box-sizing: border-box;
      }
    `
  ]
})
export class EuroInputComponent {
  //width
  @Input() width: number = 120;
  value: number | null = null;
  displayValue: string = '';
  isEditing: boolean = false;

  onDivClick(event: MouseEvent) {
    if (!this.isEditing) {
      this.isEditing = true;
      setTimeout(() => {
        const input = document.querySelector('input');
        if (input) {
          input.focus();
          input.select();
        }
      });
    }
  }

  onBlur(event: FocusEvent) {
    this.isEditing = false;
    const input = event.target as HTMLInputElement;
    const newValue = parseFloat(input.value);
    if (!isNaN(newValue)) {
      this.value = this.roundToOneDecimal(newValue);
      this.displayValue = `${this.value}`;
    } else {
      this.value = null;
      this.displayValue = '€';
    }
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.displayValue = input.value;
  }

  onEnter() {
    this.isEditing = false;
    if (this.value !== null) {
      this.displayValue = `${this.value}`;
    }
  }

  roundToOneDecimal(value: number): number {
    return Math.round(value * 10) / 10;
  }
}
