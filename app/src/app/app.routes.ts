import { Routes } from '@angular/router';
import { AuthGuard } from './user/auth.guard';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [{
    path: "login",
    loadComponent: () => import ('./user/user-login/user-login.component').then(c => c.UserLoginComponent)
},{
    path: "",
    canActivate: [AuthGuard],
    pathMatch: "full",
    loadComponent: () => import ('./home/home.component').then(c => c.HomeComponent),
},{
    path:"projet",
    canActivate: [AuthGuard],
    loadComponent: () => import('./project/project.component').then(c => c.ProjectComponent)
},{
    path: "project/:id",
    canActivate: [AuthGuard],
    loadComponent: () => import('./project/project.component').then(c => c.ProjectComponent)
},{
    path: 'users',
    canActivate: [AuthGuard],
    loadComponent: () => import('./user/user-list/user-list.component').then(c => c.UserListComponent),
}, {
    path: 'user/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./user/user-details/user-details.component').then(c => c.UserDetailsComponent),
}];
