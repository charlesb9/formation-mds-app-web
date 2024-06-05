// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-routing',
//   standalone: true,
//   imports: [],
//   template: `
//     <p>
//       user-routing works!
//     </p>
//   `,
//   styles: ``
// })
// export class UserRoutingComponent {

// }


// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { UserListComponent } from './user-list/user-list.component';
// import { UserDetailsComponent } from './user-details/user-details.component';
// import { UserCreateComponent } from './user-create/user-create.component';
// import { UserLoginComponent } from './user-login/user-login.component';
// import { AuthGuard } from './auth.guard';
// import { HomeComponent } from '../home/home.component';

// const routes: Routes = [
//   { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
//   { path: 'users/create', component: UserCreateComponent, canActivate: [AuthGuard] },
//   { path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: UserLoginComponent },
//   { path: '', component: HomeComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class UserRoutingModule { }
