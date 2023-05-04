import { HttpClient } from '@angular/common/http';
import { Component, ViewChild,ElementRef } from '@angular/core';

export class formaMensaje {
  hora: string = "";
  id: string = "";
  respuesta: string = "";
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('listamsj') private listamsj?: ElementRef;
  title = 'chat';
  url: string = 'http://localhost:5000/chat/';
  todosLosMensajes: formaMensaje[]=[];
  msj:any;
  side: boolean = true;
  test:string = "Hola \n como stas";

  /**
   *
   */
  constructor( private http: HttpClient ) {

    }

  getHora(){
    let fechaActual = new Date();
    return (fechaActual.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
  }

  getMiMensaje(): formaMensaje {
    const mensaje = new formaMensaje();
    mensaje.hora= this.getHora();
    mensaje.id = "user";
    mensaje.respuesta = this.msj;
    return mensaje;
  }

  getData(){
    this.todosLosMensajes.push(this.getMiMensaje())
    this.http.get<formaMensaje>(this.url + this.msj)
    .subscribe((data ) => {
      // data.respuesta = data.respuesta.replace(/\n/g, "\n");
      console.log(data.respuesta);
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
}




