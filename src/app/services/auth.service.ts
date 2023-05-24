import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'cbToken';

  constructor(private route: Router) { }

  getToken(): string {
    let _token = localStorage.getItem(this.TOKEN_KEY);
    if (_token && _token != "") {
      return _token;
    } else {
      return "";
    }
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
