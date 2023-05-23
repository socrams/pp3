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

/**
 *
 */
constructor(private apiService: ApiService, private route: Router) {

}

ngOnSubmit() {
  this.apiService.login(this.username, this.password);
  this.apiService.getToken().subscribe(response => {
    if (response) {
      console.log(response);
      this.route.navigate(['/userlist']);
    }
  })
}
}
