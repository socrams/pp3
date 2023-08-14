import { Component, OnInit } from '@angular/core';
import { Respuesta } from '../modelo/mensaje';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
respuesta: Respuesta[] = [];
url: string = 'http://localhost:5000/response/'


constructor(private http: HttpClient) {
}

getResponses(){
  this.http.get<Respuesta>(this.url)
    .subscribe((data: any) => {
      this.respuesta = data;
      //quiero obtener con esto todas las respuestas solamente. y me da undefined.
      console.log("respuesta:", this.respuesta[1]);
    });
}




ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  //this.getResponses()
  
}
}