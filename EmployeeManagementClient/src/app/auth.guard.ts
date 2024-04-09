import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('isLogin')) {
      return true;
    } else {
      Swal.fire({
        title: 'You must login!',
        icon: 'warning',
        confirmButtonText: 'Confirm'
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}
