import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../components/button.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [ButtonComponent]
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
