import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../components/button.component";
import { EuroInputComponent } from "../../components/euro-input.component";
import { SelectComponent } from "../../components/select.component";
import { DatePickerComponent } from "../../components/date-picker.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [ButtonComponent, EuroInputComponent, SelectComponent, DatePickerComponent, CommonModule]
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  selectedDate: string = '';

  users = [
    { id: 1, name: 'John', lastname: 'Doe', email: "john.doe@gmail.com" },
    { id: 2, name: 'Jane', lastname: 'Smith', email: "jane.smith@gmail.com" },
  ];
  
  email: string = '';

  displayUser(user: any): string {
    return `${user.name} ${user.lastname}`;
  }

  

  onDateSelected(selectedDate: string) {
    const [day, month, year] = selectedDate.split(' ');
    const formattedDate = `${day}-${month}-${year}`;
    console.log('Date sélectionnée:', formattedDate);
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
