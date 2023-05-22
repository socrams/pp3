import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  url: string = "http://127.0.0.1:5000/users/"
  usuario: Usuario;

  constructor (public http: HttpClient, private aRoute: ActivatedRoute, public route:Router) {
    this.usuario = new Usuario();
    this.aRoute.queryParams.subscribe(params => {
      if (params['id'] != null){
        this.getUser(params['id']);
      }
    });

  }

  getUser(id: number){
    this.apiService.callURL<Usuario>('GET', 'users/' + id, null).subscribe(
      response => { this.usuario = response; }
    )
  }

  postDatos(){
    console.log(this.usuario);
    if (this.usuario.id === 0) {
      this.http.post(this.url,this.usuario).subscribe(
        response => {
          console.log('respuesta: ', response);
          }
        )
    } else {
      this.http.put(this.url,this.usuario).subscribe(
        response => {
          console.log('respuesta: ', response);
          }
        )
    }
    this.route.navigateByUrl("/userlist")
  }
}
