import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Respuesta } from '../modelo/respuesta';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import Tagify from '@yaireo/tagify';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css'],
})
export class ResponseComponent implements OnInit,AfterViewInit {
  respuestas: Respuesta[] = [];
  //respuesta: Respuesta;
  url: string = 'https://pp3-python.vercel.app/response';
  opcionSeleccionadaValue: number = 0;
  keywords = [];
  placeHolderString = 'Type and press Enter to add more than one keywords...';

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  tagifyInstance!: Tagify;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private route: Router
  ) {
  }

  ngAfterViewInit(): void {
    this.tagifyInstance = new Tagify(this.tagInput.nativeElement);
  }

  handleTagsAdded(e: any) {
    const tags = e.detail.tagify.value.map((tag: any) => tag.value);
    console.log('Tags added:', tags);
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
    this.http
      .put<Respuesta>(
        this.url + '/' + this.opcionSeleccionadaValue,
        this.respuestas[this.opcionSeleccionadaValue]
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
