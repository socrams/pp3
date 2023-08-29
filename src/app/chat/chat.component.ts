import { HttpClient } from '@angular/common/http';
import { Component, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { Mensaje } from '../modelo/mensaje';
import { url } from '../modelo/config';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit {
  @ViewChild('listamsj') private listamsj?: ElementRef;
  url= url + 'chat/';
  todosLosMensajes: Mensaje[]=[];
  msj:string = "";
  side: boolean = true;
  mostrarChat : boolean = false;

  constructor( private http: HttpClient ) {}


  ngAfterViewInit(): void {
    this.scrollToBottomOnInit();
  }

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
    if (this.msj) {
      
    }
    this.todosLosMensajes.push(this.getMiMensaje())
    this.http.get<Mensaje>(this.url + this.msj)
    .subscribe((data: Mensaje ) => {
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
    // console.log(this.msj.indexOf('http'));
    if (this.msj.indexOf('http') >= 0) {
      // console.log("redireccionando");
      window.open(`${this.msj}`, '_blank');
    }else{
      // console.log("no funco");
      this.getData();
    }
  }
}




