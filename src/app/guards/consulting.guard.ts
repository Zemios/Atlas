import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConsultingGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUrl = this.router.url;
    const targetUrl = state.url;

    const isInConsultingPage = currentUrl.startsWith('/consulting');

    if (isInConsultingPage) {
      if (targetUrl === '/contact') {
        this.router.navigate(['/consulting/contact'])
      }
      else {
        this.router.navigate(['/consulting']);
      }
      return false;
    }

    return true;
  }
}
