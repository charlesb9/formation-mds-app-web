import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="px-7 rounded-lg text-white"
      [ngClass]="variantClass"
      (click)="handleClick()">
      {{ label }}
    </button>
  `,
  styles: [`
    .normal {
      background-color: #007bff;
    }
    .danger {
      background-color: #dc3545;
    }
    .create {
      background-color: #7ffc03;
    }
  `]
})
export class ButtonComponent {
  @Input() label: string = 'Click me';
  @Input() variant: 'normal' | 'danger' | 'create' = 'normal';
  @Output() onClick = new EventEmitter<void>();


  get variantClass(): string {
    return this.variant;
  }

  handleClick(): void {
    this.onClick.emit();
  }
}
