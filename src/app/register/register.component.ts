
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

  constructor(public http: HttpClient, public route: Router, public apiService: ApiService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getAllUsers(); 
  }

  getAllUsers(): any {
    this.apiService.callURL<Usuario[]>('GET', 'users/', null)
      .subscribe((data) => {
        this.users = data;
    }, error => {
      this.route.navigateByUrl("login");
    });
  }

  deleteUser(id: number) {
    this.apiService.callURL<Usuario[]>('DELETE', 'users/'+id, null)
    .subscribe((data) => {
      console.log(data);
      this.getAllUsers();
    });
  }

  editUser(id: number) {
    this.route.navigateByUrl("/user?id=" + id);
  }


}
