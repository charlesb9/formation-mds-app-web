import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../components/button.component";
import { EuroInputComponent } from "../../components/euro-input.component";
import { SelectComponent } from "../../components/select.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [ButtonComponent, EuroInputComponent, SelectComponent, FormsModule]
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  users = [
    { id: 1, name: 'John', lastname: 'Doe', email: "john.doe@gmail.com" },
    { id: 2, name: 'Jane', lastname: 'Smith', email: "jane.smith@gmail.com" },
  ];
  
  email: string = '';

  displayUser(user: any): string {
    return `${user.name} ${user.lastname}`;
  }

  onUserSelected(user: any) {
    this.email = user.email;
  }

  ngOnInit(){
    this.authService.isAuth$.subscribe(e => {
      if (e) this.router.navigate(['/'])

    })
  }

  login(){
    this.authService.login();
  }

}
