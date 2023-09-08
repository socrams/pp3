import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { Respuesta } from '../modelo/respuesta';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import Tagify from '@yaireo/tagify';
import { url } from '../modelo/config';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css'],
})
export class ResponseComponent implements OnInit,AfterViewInit { //},AfterViewChecked {
  respuestas: Respuesta[] = [];
  url = url + 'response' ;
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
  // ngAfterViewChecked(): void {
  
  //   console.log(this.tagInput.nativeElement.value);
  // }

  ngAfterViewInit(): void {
    this.tagifyInstance = new Tagify(this.tagInput.nativeElement);
    console.log("Entre");
  }


  handleTagsAdded(e: any) {
    console.log('Tags added:', e);
    const tags = e.detail.tagify.value.map((tag: any) => tag.value);
    
  }
  
  cambios() {
    console.log('Hola');
  }

  ngOnInit() {
    this.getResponses();
  }
  //mostrarIndex() {
    //console.log('Rsta: ', this.respuestas[this.opcionSeleccionadaValue]);
    //console.log(this.opcionSeleccionadaValue, 'opcion seleccionada');
    //console.log(this.respuestas);
  //}
  getResponses(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.apiService.callURL<Respuesta>('GET', 'response/', null).subscribe(
        (data: any) => {
          this.respuestas = data;
          console.log(this.respuestas);
          resolve();
        },
        (error) => {
          this.route.navigateByUrl('login');
          reject(error);
        }
      );
    });
  }
  
  

  modificar() {
    console.log(this.respuestas[this.opcionSeleccionadaValue]);
    this.http
      .put<Respuesta>(
        this.url + '/' + this.opcionSeleccionadaValue,
        this.respuestas[this.opcionSeleccionadaValue]
      )
      .subscribe(
        (data) => {
          console.log("lo q envio", this.respuestas[this.opcionSeleccionadaValue]);
          //console.log('Respuesta modificada con éxito', data);
        },
        (error) => {
          console.error('Error al modificar la respuesta', error);
        }
      );
  }
}
