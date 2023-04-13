import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})


export class WelcomeComponent implements OnInit {
  /**
   *
   */
  constructor() {

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
