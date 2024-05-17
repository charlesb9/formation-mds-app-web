import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';


@Component({
    selector: 'app-root',
    standalone: true,
    styles: `
      :host{
        @apply flex flex-col block h-screen
      }
    `,
    template:`
      <div class=" flex gap-5 bg-sky-900 text-white p-4 ">
        @if(isAuth){
          <a routerLink="/messenger">Chat</a>
          <a routerLink="/projet">Projet</a>
          <a (click)="authService.logout()" >Déconnexion</a>
        }@else {
          <a routerLink="/login">Connexion</a>
        }
      </div>
      <router-outlet></router-outlet>
    `,
    imports:[RouterOutlet, CommonModule, RouterModule]
})
export class AppComponent {

  authService = inject(AuthService);
  isAuth = false;

  ngOnInit(){
    this.authService.isAuth$.subscribe(e => {
      this.isAuth = e
    })
  }
  
}