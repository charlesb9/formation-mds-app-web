import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div
      [ngClass]="!disabled ? variantClass : null"
      class="flex items-center justify-center rounded-lg px-3"
    >
      @if(iconPrefix && !disabled) {
        <app-icon [iconName]="iconPrefix" />
      }
      <button
      [disabled]=disabled
        class="rounded-lg text-white bg-transparent"
        (click)="handleClick()"
      >
        {{ label }}
      </button>
      @if(iconSuffix && !disabled) {
        <app-icon iconName="add" />
      }
    </div>
  `,
  styles: [
    `
      .normal {
        background: linear-gradient(45deg, #66afff, #007bff);
      }
      .danger {
        background: linear-gradient(45deg, #e6717c, #dc3545);
        // border: 2px solid #dc3545;
      }
      .create {
        background: linear-gradient(45deg, #73d494, #16b84e);
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() label: string = 'Click me';
  @Input() variant: 'normal' | 'danger' | 'create' = 'normal';
  @Input() disabled?: boolean = false;
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
