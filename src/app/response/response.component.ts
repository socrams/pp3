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
export class ResponseComponent implements OnInit{//AfterViewInit { //},AfterViewChecked {
  respuestas: Respuesta[] = [];
  url = url + 'response' ;
  j: number = 0;
  placeHolderString = 'Type and press Enter to add more than one keywords...';

  // @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  // tagifyInstance!: Tagify;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private route: Router
  ) {
  }
  
  // ngAfterViewInit(): void {
  //   this.tagifyInstance = new Tagify(this.tagInput.nativeElement);
  // }

  ngOnInit(): void{
    this.loadResponses();
  }

  loadResponses(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.apiService.callURL<Respuesta>('GET', 'response/', null).subscribe((data: any) => {
        this.respuestas = data;
          resolve();
        },(error) => {
          this.route.navigateByUrl('login');
          reject(error);
        });
    });
  }
  
  saveChanges() {
    console.log(this.respuestas[this.j]);
    this.http
      .put<Respuesta>(this.url + '/' + this.j, this.respuestas[this.j])
      .subscribe((data) => {
          console.log("lo q envio", this.respuestas[this.j]);
        },(error) => {
          console.error('Error al modificar la respuesta', error);
        });
  }
}
// handleTagsAdded(e: any) {
  //   console.log('Tags added:', e);
  //   const tags = e.detail.tagify.value.map((tag: any) => {
  //     return { ngModel: this.respuestas };
  //   });
  // }
