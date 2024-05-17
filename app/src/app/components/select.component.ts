import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <input *ngIf="isSearch" type="text" [(ngModel)]="searchTerm" placeholder="Rechercher..." />
      <select>
        <option *ngFor="let item of filteredData()" [value]="item">{{ item }}</option>
      </select>
    </div>
  `,
  styles: [`
    div {
      margin: 10px;
    }
    input {
      margin-bottom: 10px;
      padding: 5px;
      width: calc(100% - 12px);
    }
    select {
      padding: 5px;
      width: 100%;
    }
  `]
})
export class SelectComponent {
  @Input() data: string[] = [];
  @Input() isSearch: boolean = false;
  searchTerm: string = '';

  filteredData(): string[] {
    if (!this.searchTerm) {
      return this.data;
    }
    return this.data.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
