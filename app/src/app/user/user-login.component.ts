// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-login',
//   standalone: true,
//   imports: [],
//   template: `
//     <p>
//       user-login works!
//     </p>
//   `,
//   styles: ``
// })
// export class UserLoginComponent {

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

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
