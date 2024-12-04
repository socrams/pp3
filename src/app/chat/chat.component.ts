import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Mensaje } from '../modelo/mensaje';
import { url } from '../modelo/config';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements AfterViewInit {
  @ViewChild('listamsj') private listamsj?: ElementRef;
  url = url + 'chat/';
  todosLosMensajes: Mensaje[] = [];
  msj: string = '';
  side: boolean = true;
  mostrarChat: boolean = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    // Asegurar el desplazamiento inicial al cargar el chat (si hay mensajes)
    this.scrollToBottom(true);
  }

  getHora() {
    const fechaActual = new Date();
    return fechaActual.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getMiMensaje(): Mensaje {
    const mensaje: Mensaje = {
      hora: this.getHora(),
      id: 'user',
      respuesta: {
        response: this.msj,
      },
    };
    return mensaje;
  }

  getData() {
    // Agregar el mensaje del usuario a la lista
    this.todosLosMensajes.push(this.getMiMensaje()); // Realizar la llamada HTTP para obtener la respuesta del servidor
    this.http.get<Mensaje>(this.url + this.msj).subscribe((data: Mensaje) => {
      this.todosLosMensajes.push(data);
      this.scrollToBottom(true); // Asegurar el desplazamiento cuando llega la respuesta
    });

    // Limpiar el input del mensaje
    this.msj = '';
    this.scrollToBottom(false); // Desplazar inicialmente tras enviar el mensaje
  }

  scrollToBottom(force: boolean = false) {
    const messageListEl = this.listamsj?.nativeElement;
    if (messageListEl) {
      const atBottom =
        messageListEl.scrollTop + messageListEl.clientHeight >=
        messageListEl.scrollHeight - 10;

      // Desplazar solo si está al final o si es forzado
      if (force || atBottom) {
        setTimeout(() => {
          messageListEl.scrollTop = messageListEl.scrollHeight;
        }, 0);
      }
    }
  }

  selectOption(text: any) {
    this.msj = text;
    this.scrollToBottom(false);
    if (this.msj.indexOf('http') >= 0) {
      window.open(`${this.msj}`, '_blank');
    } else {
      this.getData();
    }
  }
}
