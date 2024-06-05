import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [{
    path: "messenger",
    canActivate: [() => authGuard()],
    loadComponent: () => import('./messenger/messenger.component').then(c => c.MessengerComponent)
},{
    path: "",
    pathMatch: "full",
    canActivate: [() => authGuard()],
    loadComponent: () => import ('./home/home.component').then(c => c.HomeComponent)
},{
    path: "login",
    loadComponent: () => import ('./auth/login/login.component').then(c => c.LoginComponent)
},{
    path:"project",
    canActivate: [() => authGuard()],
    loadComponent: () => import('./project/project.component').then(c => c.ProjectComponent)
},
{
    path:"register",
    loadComponent: () => import('./user/user-create/user-create.component').then(c => c.UserCreateComponent)
},
{
    path:"users",
    loadComponent: () => import('./user/user-list/user-list.component').then(c => c.UserListComponent)
},
{
    path: 'user/:id',
    loadComponent: () => import('./user/user-details/user-details.component').then(c => c.UserDetailsComponent)
}
];
