import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class GuardsGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.apiService
      .validateToken()
      .then((res) => {
        return true;
      })
      .catch((err) => {
        this.router.navigate(['/login']);
        return false;
      });
  }
}
