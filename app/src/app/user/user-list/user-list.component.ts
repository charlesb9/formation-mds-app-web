import { Component, OnInit, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../../interfaces/user.interface';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  @Input() display: 'list' | 'grid' = 'list';

  setDisplay(newDisplay: 'list' | 'grid'): void {
    this.display = newDisplay;
  }


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  showUserDetails(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/user', id]);
    }
  }
}