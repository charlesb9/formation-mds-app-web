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
      background: linear-gradient(45deg, #66AFFF, #007bff);
    }
    .danger {
      background: linear-gradient(45deg, #E6717C, #dc3545);
      border: 2px solid #dc3545;
    }
  `]
})
export class ButtonComponent {
  @Input() label: string = 'Click me';
  @Input() variant: 'normal' | 'danger' = 'normal';
  @Output() onClick = new EventEmitter<void>();

  get variantClass(): string {
    return this.variant;
  }

  handleClick(): void {
    this.onClick.emit();
  }
}
