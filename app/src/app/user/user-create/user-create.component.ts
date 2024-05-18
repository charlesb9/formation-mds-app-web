import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../interfaces/user.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class UserCreateComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  createUser(): void {
    this.userService.createUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}