import { Component } from '@angular/core';
import { Mensaje } from '../modelo/mensaje';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent {
respuesta: Mensaje[] = [];
url: string = 'http://localhost:5000/response/'


constructor(private http: HttpClient) {
}

getResponses(){
  this.http.get<Mensaje>(this.url)
  .subscribe((data: Mensaje ) => {
    console.log("data",data);
    console.log("respuesta:",this.respuesta);
  });
  
}

}