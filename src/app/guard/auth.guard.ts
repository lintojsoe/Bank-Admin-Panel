import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}

  private _check(): boolean {
    return localStorage.getItem('isLogin') == 'true' ? true : false;
  }

  canActivate(): boolean {
    if (!this._check()) {
      this._router.navigate(['login']);
      return false;
    }
    return true;
  }
}
