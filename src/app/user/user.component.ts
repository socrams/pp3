import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  usuario: Usuario;

   constructor (public http: HttpClient, private aRoute: ActivatedRoute, public route:Router, public apiService: ApiService, private authService: AuthService) {
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
    if (this.usuario.id === 0) {
      this.apiService.callURL('POST', 'users/', this.usuario).subscribe(
        response => {
          console.log('respuesta: ', response);
        });
    } else {
      this.apiService.callURL('PUT', 'users/', this.usuario).subscribe(
        response => {
          console.log('respuesta: ', response);
        });
    }
    this.route.navigateByUrl("/userlist")
  }
}
