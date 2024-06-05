import { Routes } from '@angular/router';
import { AuthGuard } from './user/auth.guard';
import { authGuard } from './auth/auth.guard';

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
    loadComponent: () => import ('./user/user-login/user-login.component').then(c => c.UserLoginComponent)
},{
    path:"projet",
    loadComponent: () => import('./project/project.component').then(c => c.ProjectComponent)
},{
    path: "project/:id",
    canActivate: [() => authGuard()],
    loadComponent: () => import('./project/project.component').then(c => c.ProjectComponent)
}
];
