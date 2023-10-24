import { Component, OnInit } from '@angular/core';
import { Respuesta } from '../modelo/respuesta';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
//import Tagify from '@yaireo/tagify';
import { url } from '../modelo/config';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css'],
})
export class ResponseComponent implements OnInit {
  respuestas: Respuesta[] = [];
  url = url + 'response';
  j: number = 0;
  active: boolean = true; 
  datosCargados: boolean = false;
  
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadResponses();
  }

  loadResponses() {
    this.apiService.callURL<Respuesta | undefined>('GET', 'response/', null)
      .toPromise() // Convertimos el Observable en una Promesa
      .then((data: any) => {
        this.respuestas = data;
        this.datosCargados = true; // Cambiamos el estado cuando los datos se cargan correctamente
      })
      .catch((error) => {
        console.error(error);// Maneja el error de alguna manera si es necesario
      });
  }
  addQuestion() {
    this.active = false;
    this.respuestas[this.j].id=-1;
    
  }
  cancel(){
  this.active = true;
  }
  delete(){
    const to_delete = this.respuestas[this.j].id;
    this.http
           .delete(this.url + '/' + to_delete)
           .subscribe(
             (data) => {
               console.log("Borrado: ", data)
               alert('Borrado correctamente.')
             });
             //window.location.reload()
  }

  saveChanges() { 
      console.log(this.respuestas[this.j]);
  
      if (this.respuestas[this.j].id ==  -1) {
        this.respuestas[this.j].id = this.respuestas.length+1;
        console.log("post: ",this.respuestas[this.j]);
        this.http
        .post<Respuesta>(this.url+'/', this.respuestas[this.j])
        .subscribe(
          (data) => {
            //console.log("nuevo: ", this.respuestas[0]);
            alert('Pregunta Agregada.')
          });
        }
        else {
          if (this.respuestas && this.respuestas[this.j]) {
            this.http
            .put<Respuesta>(this.url + '/' + this.j, this.respuestas[this.j])
            .subscribe(
              (data) => {
                //console.log("Envio: ", this.respuestas[this.j]);
                alert('Se modifico la respuesta')
               },
               (error) => {
                alert('Error al modificar la respuesta',);
               }
             );
         } else {
           console.error('No se pudo acceder a la respuesta en la posición', this.j);
         }
       }
    }
}