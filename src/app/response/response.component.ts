import {Component, OnInit} from '@angular/core';
import { Respuesta } from '../modelo/respuesta';
import {HttpClient} from '@angular/common/http';

@Component({selector: 'app-response', templateUrl: './response.component.html', styleUrls: ['./response.component.css']})

export class ResponseComponent implements OnInit {
    respuestas : Respuesta[] = [];
    //respuesta: Respuesta;
    url : string = 'http://localhost:5000/response';
    opcionSeleccionadaValue : number = 0;
    
    constructor(private http : HttpClient) { 
    //  this.respuesta = {id: 0, answer: '', response: '', moreOptions: false, moreQuestion: false, options: '' }
    }
    ngOnInit() { 
      this.getResponses()
    }
mostrarIndex(){
  console.log('Rsta: ',this.respuestas[this.opcionSeleccionadaValue]);
  console.log(this.opcionSeleccionadaValue,'opcion seleccionada');
  console.log(this.respuestas);
  
  
}
    getResponses() {
      this.http.get<Respuesta>(this.url).subscribe((data : any) => {
            this.respuestas = data;
        });
    }
modificar() {
  // if (this.opcionSeleccionadaValue !== undefined && this.opcionSeleccionadaValue >= 0 && this.opcionSeleccionadaValue < this.respuestas.length) {
  //   const selectedItem = this.respuestas[this.opcionSeleccionadaValue];
    this.http.put<Respuesta>(this.url +'/'+ this.opcionSeleccionadaValue,this.respuestas[this.opcionSeleccionadaValue]).subscribe(
      data => {
        console.log('Respuesta modificada con éxito', data);
      },
      error => {
        console.error('Error al modificar la respuesta', error);
      }
    );
  // }
}
    // public loadDataById(index: number) {
    //   console.log(index);
      
    //   this.respuesta = this.getResponseByOrder(index);
    // }

    // getResponseByOrder(order: number): Respuesta {
    //   return this.respuestas[order];
    // }


    // opcionSeleccionada(value: any) {
    //   console.log(value);
      
    //   this.opcionSeleccionadaValue = value;
    // }
    
  }