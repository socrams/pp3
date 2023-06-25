import { Component } from '@angular/core';
import { Carrera } from '../modelo/carrera';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Materia } from '../modelo/materia';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent {
  carreras: Carrera[];
  materias: Materia[];
  addCarrera : Carrera;
  mostrar:boolean = false;
  constructor(public apiService:ApiService, public route:Router, ) {
    this.carreras = [];
    this.materias = [];
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
        alert(JSON.stringify(response)); }
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
          alert(JSON.stringify(response));
          this.ngOnInit()
        });
      } else {
      this.apiService.callURL('PUT', 'carrera', this.addCarrera).subscribe(
        response => {
          alert(JSON.stringify(response));
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

    verMaterias(id?: number | null){
      this.apiService.callURL<Materia[]>('GET', '/carrera/materias/', null)
      .subscribe((data) => {
        this.materias = data;
    }, error => {
      this.route.navigateByUrl("login");
    });
    console.log(this.materias);
    }
}

