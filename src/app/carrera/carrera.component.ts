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
  addMateria : Materia;
  idCarrera? : number | null;
  mostrar:boolean = false;
  mostrarMaterias:boolean = false;
  constructor(public apiService:ApiService, public route:Router, ) {
    this.carreras = [];
    this.materias = [];
    this.addCarrera = new Carrera();
    this.addMateria = new Materia();

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
  this.addCarrera.id === undefined
  this.mostrar = !this.mostrar;
}

  postDatos(){
    if (this.addCarrera.id === undefined) {
//      console.log("ps:", this.addCarrera);

      this.apiService.callURL('POST', 'carrera', this.addCarrera).subscribe(
        response => {
          alert(JSON.stringify(response));
          this.mostrar = !this.mostrar;
          this.ngOnInit()
        });
      } else {
      this.apiService.callURL('PUT', 'carrera', this.addCarrera).subscribe(
        response => {
          alert(JSON.stringify(response));
          this.mostrar = !this.mostrar;
          this.ngOnInit()
        });
    }
  }

  borrarCarrera(id?: number | null ) {
    console.log('mi id:', id);

      this.apiService.callURL<Carrera[]>('DELETE', 'carrera/'+id)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
    }

    verMaterias(id?: number | null){
      this.idCarrera = id;
      this.apiService.callURL<Materia[]>('GET', 'carrera/'+id+'/materias/', null)
      .subscribe((data) => {
        this.mostrarMaterias = true;
        this.materias = data;
        console.log(data);
    }, error => {
      console.log("error")
    });
    this.idCarrera = id
    }

    agregarMateria(){
      console.log(this.addMateria);
      if (this.idCarrera != null && this.addMateria.carrera_id == null) {
        this.addMateria.carrera_id=this.idCarrera;
      }
      if  (this.addMateria.id == null) {
        this.apiService.callURL('POST', 'carrera/'+ this.idCarrera +'/materias/', this.addMateria).subscribe(
          response => {
            alert(JSON.stringify(response));
          });
      } else {
        this.apiService.callURL('PUT', 'carrera/'+ this.idCarrera +'/materias/', this.addMateria).subscribe(
          response => {
            alert(JSON.stringify(response));
          });
      }
      this.verMaterias()
    }
    borrarMateria(id?: number | null ) {
      this.apiService.callURL<Materia[]>('DELETE', 'carrera/'+ id +'/materias/'+ id,)
      .subscribe((data) => {
        console.log(data);
        this.verMaterias();
      });
      this.verMaterias();
    }

    editarMateria(id?: number | null){
    this.apiService.callURL<Materia>('GET', 'carrera/' + this.idCarrera +'/materias/'+ id, null).subscribe(
      response => { this.addMateria = response;
      console.log("mateteria: ",Materia);
      alert(JSON.stringify(response)); }
      )
    }
  }

