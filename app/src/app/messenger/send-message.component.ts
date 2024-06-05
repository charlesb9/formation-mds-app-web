import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector : "send-message",
    standalone : true,
    imports: [
        FormsModule
    ],
    template : 
        `<div class="bg-slate-100 p-4 flex gap-2 items-center">
            <input type="text" [ngModel]="message" (ngModelChange)="message = $event" class="rounded border-slate-200 p-2"/>
            <button (click)="_send()" class="ml-2">Envoyer</button>
        </div>`
    
})
export class SendMessageComponent {

    message = "";

    @Output()
    send = new EventEmitter<string>();

    protected _send() {

        if (!this.message) {
            alert("YA PAS DE MESSAGE ");
            this.message = "";
        } else {
            this.send.emit(this.message);
            this.message = "";
        }
    }
}