import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(){
    this.authService.isAuth$.subscribe(e => {
      if (e) this.router.navigate(['/'])
      
    })
  }

  login(){
    this.authService.login();
  }

}
