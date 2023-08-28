import { Component, OnInit } from '@angular/core';
import { Respuesta } from '../modelo/respuesta';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css'],
})
export class ResponseComponent implements OnInit {
  respuestas: Respuesta[] = [];
  //respuesta: Respuesta;
  url: string = 'https://pp3-python.vercel.app/response';
  opcionSeleccionadaValue: number = 0;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private route: Router
  ) {
    //  this.respuesta = {id: 0, answer: '', response: '', moreOptions: false, moreQuestion: false, options: '' }
  }
  ngOnInit() {
    this.getResponses();
  }
  mostrarIndex() {
    console.log('Rsta: ', this.respuestas[this.opcionSeleccionadaValue]);
    console.log(this.opcionSeleccionadaValue, 'opcion seleccionada');
    console.log(this.respuestas);
  }
  getResponses() {
    this.apiService.callURL<Respuesta>('GET', 'response/', null).subscribe(
      (data: any) => {
        this.respuestas = data;
      },
      (error) => {
        this.route.navigateByUrl('login');
      }
    );
  }
  modificar() {
    this.http.put<Respuesta>(this.url + '/' + this.opcionSeleccionadaValue,this.respuestas[this.opcionSeleccionadaValue]
      )
      .subscribe(
        (data) => {
          console.log(this.respuestas[this.opcionSeleccionadaValue]);
          console.log('Respuesta modificada con éxito', data);
        },
        (error) => {
          console.error('Error al modificar la respuesta', error);
        }
      );
  }
}
