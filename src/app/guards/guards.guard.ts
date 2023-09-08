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
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return true;
    // let isValidToken = this.validateToken();
    // console.log(isValidToken);
    // if (!isValidToken) {
    //   this.router.navigate(['/login']);
    //   return false;
    // } else {
    //   return true;
    // }

    // return this.apiService
    //   .validateToken()
    //   .then((res) => {
    //     return true;
    //   })
    //   .catch((err) => {
    //     this.router.navigate(['/login']);
    //     return false;
    //   });
  }

  // validateToken() {
  //   let _token = this.authService.getToken();
  //   console.log("Token: ", _token);
  //   if (_token && _token != "") {
  //     this.apiService.callURL<Boolean>('POST', 'auth/validateToken', null).subscribe((data) => {
  //       return data;
  //     });
  //   }
  // }
}
