import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})


export class WelcomeComponent implements OnInit {
  @ViewChild('miIframe') miIframe: ElementRef | any ;

  constructor(private renderer: Renderer2) {
  }
  cambiarTamanioIframe() {
    const iframe = this.miIframe.nativeElement as HTMLIFrameElement;
    if (iframe.width === '300') {
      this.renderer.setStyle(iframe, 'width', '600px');
      this.renderer.setStyle(iframe, 'height', '400px');
    } else {
      this.renderer.setStyle(iframe, 'width', '400px');
      this.renderer.setStyle(iframe, 'height', '300px');
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      const element = document.getElementById('con-bolsa');
      if (element) {
        element.style.opacity = '1'; // Cambia la opacidad de la imagen transformada a 1 después de un retraso
      }
    }, 2000)
  }
}
