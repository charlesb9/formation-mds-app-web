import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, SimpleChange, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
   <div class="modal">
    <div class="modal-container">
        <div class="modal-content">
            <div class="modal-header">
                <p>{{title}}</p>
                <div class="x-mark" (click)="handleClose()">X</div>
            </div>
            <div class="modal-inner-content">
                <ng-content select=".modal-inner-content"></ng-content>
            </div>
        </div>
    </div>
  </div>
  `,
  styles: [
    `
      .modal {
        z-index: 100;
        position: absolute;
        top: 0;
        width: 100vw;
        height: 120vh;
        background: rgba($color: black, $alpha: 0.5);
        .x-mark {
            margin-left: auto;
            width: 20px;
            height: 20px;
            color: black;
            cursor: pointer;
        }
        &-container {
            height: calc(100% - 20vh);
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &-header {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            align-items: center;
            background: white;
            padding-bottom: 10px;
            border-radius: 5px 5px 0 0;
        }
        &-content {
            background: white;
            padding: 20px;
            border-radius: 5px;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
        }
        &-inner-content {
            overflow-y: hidden;
        }
    }
    `,
  ],
})
export class AppModal {
    @Input() title: string = '';
    @Input () show: boolean = false;
    @Output() close = new EventEmitter();

    ngOnInit() {
        if (this.show) {
            this.blockScroll();
        }
    }

    ngOnDestroy() {
        this.allowScroll();
    }

    handleClose() {
        this.close.emit();
        this.allowScroll();
    }

    blockScroll() {
        document.body.classList.add('no-scroll');
    }
    
    allowScroll() {
        document.body.classList.remove('no-scroll');
    }
}
