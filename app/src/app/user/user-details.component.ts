// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-details',
//   standalone: true,
//   imports: [],
//   template: `
//     <p>
//       user-details works!
//     </p>
//   `,
//   styles: ``
// })
// export class UserDetailsComponent {

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe((data: User) => {
        this.user = data;
      });
    }
  }
}
