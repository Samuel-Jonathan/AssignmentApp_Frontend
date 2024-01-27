import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const authenticated = await this.authService.isAdmin();
      
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    } catch (error) {
      console.error('Error in canActivate:', error);
      return false;
    }
  }
}
