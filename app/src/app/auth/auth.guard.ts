import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (!authService.isAuth){
    router.navigate(['/login'])
  }
  return authService.isAuth;
};
