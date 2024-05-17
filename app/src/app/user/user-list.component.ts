// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-list',
//   standalone: true,
//   imports: [],
//   template: `
//     <p>
//       user-list works!
//     </p>
//   `,
//   styles: ``
// })
// export class UserListComponent {

// }


import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
}
