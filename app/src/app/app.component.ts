import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TaskService } from './taches/task.service';
import { UserService } from './user/user.service';


@Component({
    selector: 'app-root',
    standalone: true,
    styles: `
      :host{
        @apply flex flex-col block h-screen
      }
    `,
    template:`
     @if(authService.loggedIn){
      <div class=" flex gap-5 bg-sky-900 text-white p-4 w-full">
          <a routerLink="/">Projets</a>
          <a routerLink="/users">Utilisateurs</a>  
          <a class="ml-auto" (click)="authService.logout()" >Déconnexion</a>
        </div>
      }
      <router-outlet></router-outlet>
    `,
    imports:[RouterOutlet, CommonModule, RouterModule]
})
export class AppComponent {
  service = inject(TaskService);


  authService = inject(UserService);

  ngOnInit(){
  }
  
}