import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  standalone: true,
  imports: [FormsModule]
})

export class UserLoginComponent implements OnInit{
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/users']);
    }
  }

  login(): void {
    this.userService.login(this.email, this.password).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed');
      }
    });
  }
}