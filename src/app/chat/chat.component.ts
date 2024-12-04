import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Mensaje } from '../modelo/mensaje';
import { url } from '../modelo/config';
import { Time } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  @ViewChild('listamsj') private listamsj?: ElementRef;
  url = url + 'chat/';
  todosLosMensajes: Mensaje[] = [];
  msj: string = '';
  side: boolean = true;
  mostrarChat: boolean = false;

  constructor(private http: HttpClient) {}

  getHora() {
    let fechaActual = new Date();
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
    this.todosLosMensajes.push(this.getMiMensaje());
    this.http.get<Mensaje>(this.url + this.msj).subscribe((data: Mensaje) => {
      const horaServidorGMT = data.hora;
      const horaBuenosAires = this.convertirAGMTMinus3(horaServidorGMT);
      console.log('Respuesta del servidor:', data);
      // Agregar el mensaje con la hora convertida
      const mensajeConHora = { ...data, hora: horaBuenosAires };
      this.todosLosMensajes.push(mensajeConHora);
    });
    this.msj = '';
    this.scrollToBottomOnInit();
  }

  convertirAGMTMinus3(horaGMT: string | undefined): string {
    const fechaGMT = new Date(horaGMT + ' GMT'); // Convertimos la hora recibida a un objeto Date en GMT
    // Si la fecha no es válida, devolver un valor predeterminado
    if (isNaN(fechaGMT.getTime())) {
      console.error('Invalid Date:', horaGMT);
      return 'Hora no válida';
    }
    // Ajustamos la hora a GMT-3 (Buenos Aires)
    fechaGMT.setHours(fechaGMT.getHours() - 3);
    // Retornamos la hora convertida en formato de 24 horas o cualquier formato que prefieras
    return fechaGMT.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,  // Ajuste a formato de 24 horas
    });
  }
  

  scrollToBottomOnInit() {
    setTimeout(() => {
      const messageListEl = this.listamsj?.nativeElement;
      messageListEl.scrollTop = messageListEl.scrollHeight;
    }, 500);
  }

  selectOption(text: any) {
    this.scrollToBottomOnInit();
    this.msj = text;
    if (this.msj.indexOf('http') >= 0) {
      window.open(`${this.msj}`, '_blank');
    } else {
      this.getData();
    }
  }
}
