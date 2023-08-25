import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, Routes } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  password: any = '';
  username: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: Router
  ) {}

  async onSubmit() {
    const pass = await this.authService.encryptPassword(this.password);
    console.log(pass);
    this.apiService.login(this.username, pass).subscribe((response) => {
      if (response === true) {
        this.route.navigate(['/userlist']);
      }
    });
  }
}
