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
@Injectable({
  providedIn: 'root',
})
export class GuardsGuard implements CanActivate {
  constructor(private _guard: ApiService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if ((let x=1) == 1)){
    return true;
    // }else{
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
}
