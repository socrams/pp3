import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  newAnswer: Respuesta;
  url = url + 'response';
  j: number = 0;
  placeHolderString = 'Type and press Enter to add more than one keywords...';
  datosCargados: boolean = false;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private route: Router
  ) {
    this.newAnswer = new Respuesta()
  }

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
    this.newAnswer.id = undefined ;
    this.newAnswer.answer = 'aca la pregunta'
    this.newAnswer.response = 'test';
    this.newAnswer.options = 'opciones aca';
    this.newAnswer.moreoptions = false;
    this.newAnswer.morequestion = false;
    console.log('llegue', this.newAnswer);
    
  }
  saveChanges() {
    if (this.newAnswer.answer == null) {
      console.log('entre', this.newAnswer);
      this.http
      .post<Respuesta>(this.url + '/', this.newAnswer)
      .subscribe(
        (data) => {
          console.log("nuevo: ", this.newAnswer);
        });
      }
    //   else {      
    //   if (this.respuestas && this.respuestas[this.j]) {
    //     this.http
    //       .put<Respuesta>(this.url + '/' + this.j, this.respuestas[this.j])
    //       .subscribe(
    //         (data) => {
    //           console.log("Envio: ", this.respuestas[this.j]);
    //         },
    //         (error) => {
    //           console.error('Error al modificar la respuesta', error);
    //         }
    //       );
    //   } else {
    //     console.error('No se pudo acceder a la respuesta en la posición', this.j);
    //   }
    // }
  }
}
//   saveChanges() {
//     this.http
//       .put<Respuesta>(this.url + '/' + this.j, this.respuestas?[this.j])
//       .subscribe((data) => {
//           console.log("Envio: ", this.respuestas[this.j]);
//         },(error) => {
//           console.error('Error al modificar la respuesta', error);
//         });
//   }
// }
// handleTagsAdded(e: any) {
//   console.log('Tags added:', e);
//   const tags = e.detail.tagify.value.map((tag: any) => {
//     return { ngModel: this.respuestas };
//   });
// }
