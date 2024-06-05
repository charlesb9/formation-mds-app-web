import { Routes } from '@angular/router';
import { AuthGuard } from './user/auth.guard';

export const routes: Routes = [{
    path: "messenger",
    canActivate: [AuthGuard],
    loadComponent: () => import('./messenger/messenger.component').then(c => c.MessengerComponent)
},{
    path: "",
    pathMatch: "full",
    loadComponent: () => import ('./home/home.component').then(c => c.HomeComponent)
},{
    path: "login",
    canActivate: [AuthGuard],
    loadComponent: () => import ('./user/user-login/user-login.component').then(c => c.UserLoginComponent)
},{
    path:"projet",
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
