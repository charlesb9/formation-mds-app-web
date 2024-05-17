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
    path:"projet",
    canActivate: [() => authGuard()],
    loadComponent: () => import('./project/project.component').then(c => c.ProjectComponent)
}];
