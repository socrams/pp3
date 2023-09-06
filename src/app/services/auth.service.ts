import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'cbToken';
  private readonly SALT_LENGTH: number =  2;

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
    this.route.navigateByUrl('login');
  }

  async encryptPassword(password: string): Promise<string> {
    let hash = CryptoJS.SHA256(password).toString();
    return hash;
  }
}
