import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SendMessageComponent } from './send-message.component';
import { CommonModule } from '@angular/common';
import { ParseLinkPipe } from '../utils/parse-link.pipe';
import { fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '../interfaces/message.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [FormsModule, SendMessageComponent, CommonModule, ParseLinkPipe],
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.scss',
  animations: [
    trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('150ms', style({ opacity: 1 }))
        ])
    ])
],
})
export class MessengerComponent {

  messages : Message[] = [];
  logged : boolean = false;
  username = "";
  
  
  http = inject(HttpClient);

  constructor( ) { 
    fromEvent(window, 'storage').subscribe((event) => {
      let messages = localStorage.getItem("messages");
      if(messages){
        let parsedMessages = JSON.parse(messages)
        this.messages = parsedMessages
      }
    });
  }

  send(message : string){
    if(this.username){
      this.messages.push({
        username : this.username,
        content : message,
        datetime : new Date()
      })
      localStorage.setItem("messages", JSON.stringify(this.messages))
    }
    console.log("Messages envoyés",this.messages)
  }

  login(){
    if(this.username){
      this.logged = true;
    }
  }

}
