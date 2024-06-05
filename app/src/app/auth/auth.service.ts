import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;
  isAuth$ = new BehaviorSubject(this.isAuth);
  router = inject(Router)

  constructor() { }

  login(){
    this.isAuth = true;
    this.isAuth$.next(this.isAuth);
  }
  
  logout(){
    this.isAuth = false;
    this.isAuth$.next(this.isAuth);
    this.router.navigate(['/login'])
  }
}
