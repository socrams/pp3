import { Component } from '@angular/core';
import { Carrera } from '../modelo/carrera';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent {
  carreras: Carrera[];
  addCarrera : Carrera;
  mostrar:boolean = false;
  constructor(public apiService:ApiService, public route:Router, ) {
    this.carreras = [];
    this.addCarrera = new Carrera();
  }
  ngOnInit(): void {
    this.getAllCareer();
  }
  getAllCareer(){
    this.apiService.callURL<Carrera[]>('GET', 'carrera', null)
      .subscribe((data) => {
        this.carreras = data;
    }, error => {
      this.route.navigateByUrl("login");
    });
  }

  editarCarrera(id?: number | null){
    this.mostrar = true;
    this.apiService.callURL<Carrera>('GET', 'carrera/' + id, null).subscribe(
      response => { this.addCarrera = response;
        console.log(this.addCarrera) }
    )
  }
agregarCarrera(){
  this.addCarrera.id = undefined
  this.mostrar = !this.mostrar;
}

  postDatos(){
    if (this.addCarrera.id === undefined) {
      this.apiService.callURL('POST', 'carrera', this.addCarrera).subscribe(
        response => {
          console.log('respuesta: ', response);
          this.ngOnInit()
        });
      } else {
      this.apiService.callURL('PUT', 'carrera', this.addCarrera).subscribe(
        response => {
          console.log('respuesta: ', response);
          this.ngOnInit()
        });
    }
  }

  borrar(id?: number | null ) {
      this.apiService.callURL<Carrera[]>('DELETE', 'carrera/'+id)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
    }
}

