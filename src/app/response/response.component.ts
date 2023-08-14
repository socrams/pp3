import {Component, OnInit} from '@angular/core';
import { Respuesta } from '../modelo/respuesta';

import {HttpClient} from '@angular/common/http';
@Component({selector: 'app-response', templateUrl: './response.component.html', styleUrls: ['./response.component.css']})

export class ResponseComponent implements OnInit {
    respuestas : Respuesta[] = [];
    respuesta: Respuesta;
    url : string = 'http://localhost:5000/response/';
    opcionSeleccionadaValue : any = '' ; 

    constructor(private http : HttpClient) { 
      this.respuesta = {id: 0, answer: '', response: '', moreOptions: false, moreQuestion: false, options: '' }
    }

    getResponses() {
        this.http.get<Respuesta>(this.url).subscribe((data : any) => {
            this.respuestas = data;
        });
    }

    public loadDataById() {
      this.respuesta = this.getResponseByOrder(0);
    }

    getResponseByOrder(order: number): Respuesta {
      return this.respuestas[order];
    }

    ngOnInit(): void { 
      // Buscamos todas las prespuestas del server.
        this.getResponses()

    }
    opcionSeleccionada(value: any) {
      this.opcionSeleccionadaValue = value;
    }
    
  }