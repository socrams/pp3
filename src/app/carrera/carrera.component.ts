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
  nombreCarrera?: string;
  mostrar:boolean = false;
  mostrarMaterias:boolean = false;
  mostrarAgregarMaterias:boolean = false;
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
      //  alert(JSON.stringify(response));
      }
      )
    this.mostrarMaterias=false;

  }
agregarCarrera(){
  this.mostrar= !this.mostrar;
}
botonAgregarMaterias(){
  this.addCarrera.id === undefined
  this.mostrarAgregarMaterias = !this.mostrarAgregarMaterias;
}

  postDatos(){
    if (this.addCarrera.id === undefined) {
      this.apiService.callURL('POST', 'carrera', this.addCarrera).subscribe(
        response => {
         // alert(JSON.stringify(response));
          this.mostrar = !this.mostrar;
          this.ngOnInit()
        });
      } else {
      this.apiService.callURL('PUT', 'carrera', this.addCarrera).subscribe(
        response => {
          this.mostrar = !this.mostrar;
          this.ngOnInit()
        });
    }
    this.addCarrera.descripcion= "";
    this.addCarrera.duracion=undefined;
    this.mostrar=false;
    this.mostrarMaterias=false;
  }

  borrarCarrera(id?: number | null ) {
    console.log('mi id:', id);

      this.apiService.callURL<Carrera[]>('DELETE', 'carrera/'+id)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
    }

    verMaterias(id?: number | null, carrera?: string){
      this.mostrar = false;
      this.idCarrera = id;
      this.nombreCarrera= carrera;
      this.apiService.callURL<Materia[]>('GET', 'carrera/'+id+'/materias/', null)
      .subscribe((data) => {
        this.materias = data;
        console.log(data);
      }, error => {
        console.log("error")
      });

      this.mostrarMaterias = true
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
           // alert(JSON.stringify(response));
            this.verMaterias(this.idCarrera)
          });
      } else {
        this.apiService.callURL('PUT', 'carrera/'+ this.idCarrera +'/materias/', this.addMateria).subscribe(
          response => {
            //alert(JSON.stringify(response));
          });
      }
      this.verMaterias(this.idCarrera)
      this.addMateria.anio=undefined;
      this.addMateria.descripcion="";
    }
    borrarMateria(id?: number | null ) {
      this.apiService.callURL<Materia[]>('DELETE', 'carrera/'+ this.idCarrera +'/materias/'+ id,)
      .subscribe((data) => {
        console.log(data);
      });
      this.verMaterias(this.idCarrera);
      this.addMateria.anio=undefined;
      this.addMateria.descripcion="";
    }

    editarMateria(id?: number | null){
      this.mostrarAgregarMaterias=true;
    this.apiService.callURL<Materia>('GET', 'carrera/' + this.idCarrera +'/materias/'+ id, null).subscribe(
      response => { this.addMateria = response;
      console.log("mateteria: ",Materia);
      //alert(JSON.stringify(response));
      }
      )
    }
  }

