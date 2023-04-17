
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelo/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
users: Usuario[];
url: string = "http://127.0.0.1:5000/users/";

  constructor(public http : HttpClient, public route: Router ) {

    this.users = [];
    this.getAllUsers();
  }

  getAllUsers(){
    this.http.get<Usuario[]>(this.url)
    .subscribe((data ) => {
      this.users = data;
      console.log(this.users);
    });
    this.users = []
  }

  deleteUser(id: number){
    this.http.delete(this.url+id)
    .subscribe((data ) => {
      console.log(data);
      this.getAllUsers()
    });
  }

  editUser(id: number) {
    this.route.navigateByUrl("/user?id="+id);
  }


}