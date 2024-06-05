import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="dropdown" [style.width.px]="width">
      <div class="dropdown-select" (click)="toggleDropdown()">
        {{ selectedDisplayValue || title }} <span class="arrow">&#x25BC;</span>
      </div>
      <div class="dropdown-list mt-2" *ngIf="dropdownOpen">
        <div class="dropdown-item " *ngIf="isSearch">
          <input
            type="text"
            placeholder="Recherche..."
            [formControl]="searchControl"
          />
        </div>
        <div
          *ngFor="let item of filteredData"
          (click)="selectItem(item)"
          class="dropdown-item"
        >
          {{ displayFunction(item) }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dropdown {
        position: relative;
        display: inline-block;
        margin: 10px;
      }

      .dropdown-select {
        padding: 10px;
        border: 1px solid #ccc;
        cursor: pointer;
        background-color: #fff;
        border-radius: 10px;
      }

      .arrow {
        float: right;
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
        border-radius: 10px;
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
    `,
  ],
})
export class SelectComponent {
  @Input() data: any[] = [];
  @Input() width: number = 200;
  @Input() isSearch: boolean = false;
  @Input() title: string = 'Recherche';
  @Input() displayFunction: (item: any) => string = (item) => item.toString();
  filteredData: string[] = [];
  selectedValue: string | null = null;
  dropdownOpen: boolean = false;

  searchControl = new FormControl();

  ngOnInit() {
    this.filteredData = this.data;
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.searchData(value);
      });
  }

  get selectedDisplayValue(): string {
    return this.selectedValue ? this.displayFunction(this.selectedValue) : '';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (!this.dropdownOpen) {
      this.filteredData = this.data;
    }
  }

  selectItem(item: string) {
    this.selectedValue = item;
    this.dropdownOpen = false;
  }

  searchData(value: string) {
    this.filteredData = !value
      ? this.data
      : this.data.filter((item) =>
          this.displayFunction(item).toLowerCase().includes(value.toLowerCase())
        );
  }
}
