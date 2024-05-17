import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <div
      [ngClass]="variantClass"
      class="flex items-center justify-center rounded-lg px-3"
    >
      <!-- @if(iconPrefix) {
      <app-icon [name]="iconPrefix"></app-icon>
    } -->
      {{ iconPrefix }}
      <button
        [ngClass]="variantClass"
        class="rounded-lg text-white"
        (click)="handleClick()"
      >
        {{ label }}
      </button>
      {{ iconSuffix }}
      <!-- @if(iconS) { -->
      <!-- <app-icon [name]="iconPrefix"></app-icon> -->
      <!-- } -->
    </div>
  `,
  styles: [
    `
      .normal {
        background-color: #007bff;
      }
      .danger {
        background-color: #dc3545;
      }
      .create {
        background-color: #7ffc03;
      }
    `,
  ],
  imports: [CommonModule, IconComponent],
})
export class ButtonComponent {
  @Input() label: string = 'Click me';
  @Input() variant: 'normal' | 'danger' | 'create' = 'normal';
  @Input() disabled?: boolean;
  @Input() iconPrefix?: string;
  @Input() iconSuffix?: string;
  @Output() onClick = new EventEmitter<void>();

  get variantClass(): string {
    return this.variant;
  }

  handleClick(): void {
    this.onClick.emit();
  }
}
