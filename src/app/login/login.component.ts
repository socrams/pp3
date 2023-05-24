import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password:any = ""
  username:string = ""

  constructor(private apiService: ApiService, private route: Router) {

  }

  onSubmit() {
    this.apiService.login(this.username, this.password).subscribe(response => {
      console.log(response); 
      if (response === true) {
        this.route.navigate(['/userlist']);
      }
    });
  }
}
