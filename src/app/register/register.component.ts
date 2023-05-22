
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelo/usuario';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users: Usuario[];
  url: string = "http://127.0.0.1:5000/users/";

  ngOnInit(): void {
    this.users = [];
    this.getAllUsers();
  }
  constructor(public http: HttpClient, public route: Router) {
    this.getAllUsers();
    this.users = [];
  }

  getAllUsers() {
    this.apiService.callURL<Usuario[]>('GET', 'users/', null)
      .subscribe((data) => {
        this.users = data;
      });
    this.users = []
  }

  deleteUser(id: number) {
    this.http.delete(this.url + id)
      .subscribe((data) => {
        console.log(data);
        this.getAllUsers()
      });
  }

  editUser(id: number) {
    this.route.navigateByUrl("/user?id=" + id);
  }


}
