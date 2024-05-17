// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-create',
//   standalone: true,
//   imports: [],
//   template: `
//     <p>
//       user-create works!
//     </p>
//   `,
//   styles: ``
// })
// export class UserCreateComponent {

// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: User = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    roles: []
  };

  constructor(private userService: UserService, private router: Router) {}

  createUser(): void {
    this.userService.createUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
