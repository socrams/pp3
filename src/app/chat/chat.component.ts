import { HttpClient } from '@angular/common/http';
import { Component, ViewChild,ElementRef } from '@angular/core';
import { Mensaje } from '../modelo/mensaje';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('listamsj') private listamsj?: ElementRef;
  url: string = 'http://localhost:5000/chat/';
  todosLosMensajes: Mensaje[]=[];
  msj:string = "";
  side: boolean = true;
  options: String[] = [];
  mostrarChat : boolean = true;

  constructor( private http: HttpClient ) {}

  getHora(){
    let fechaActual = new Date();
    return (fechaActual.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
  }

  getMiMensaje(): Mensaje {
    const mensaje: Mensaje = {
      hora: this.getHora(),
      id: 'user',
      respuesta: {
        response: this.msj
      }
    };
    return mensaje;
  }

  getData(){
    this.todosLosMensajes.push(this.getMiMensaje())
    this.http.get<Mensaje>(this.url + this.msj)
    .subscribe((data: Mensaje ) => {
      this.options = data.respuesta?.options?.split(", ")||[];
      this.todosLosMensajes.push(data);
    });
    this.msj = "";
    this.scrollToBottomOnInit()    
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
      const messageListEl = this.listamsj?.nativeElement;
      messageListEl.scrollTop = messageListEl.scrollHeight;
    }, 300);
  }

  selectOption(text: any){
    this.msj=text;
    this.getData()
  }
}




