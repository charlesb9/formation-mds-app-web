import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dropdown">
      <div class="dropdown-select" (click)="toggleDropdown()">
        {{ selectedValue || 'Select an option' }}
      </div>
      <div class="dropdown-list" *ngIf="dropdownOpen">
        <input *ngIf="isSearch" type="text" [(ngModel)]="searchTerm" placeholder="Rechercher..." (input)="onSearchChange()" />
        <div *ngFor="let item of filteredData()" (click)="selectItem(item)" class="dropdown-item">
          {{ item }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dropdown {
      position: relative;
      display: inline-block;
      width: 200px;
    }
    .dropdown-select {
      padding: 10px;
      border: 1px solid #ccc;
      cursor: pointer;
      background-color: #fff;
    }
    .dropdown-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      border: 1px solid #ccc;
      background-color: #fff;
      z-index: 1000;
      max-height: 200px;
      overflow-y: auto;
    }
    .dropdown-list input {
      width: calc(100% - 20px);
      padding: 10px;
      border: none;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
    }
    .dropdown-item {
      padding: 10px;
      cursor: pointer;
    }
    .dropdown-item:hover {
      background-color: #f0f0f0;
    }
  `]
})
export class SelectComponent {
  @Input() data: string[] = [];
  @Input() isSearch: boolean = false;
  searchTerm: string = '';
  selectedValue: string | null = null;
  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (!this.dropdownOpen) {
      this.searchTerm = '';
    }
  }

  selectItem(item: string) {
    this.selectedValue = item;
    this.dropdownOpen = false;
  }

  onSearchChange() {
    this.filteredData();
  }

  filteredData(): string[] {
    if (!this.searchTerm) {
      return this.data;
    }
    return this.data.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
