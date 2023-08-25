import { Component } from '@angular/core';
import { GuardsGuard } from '../guards/guards.guard';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  
  constructor(private authService: AuthService) {
  }
  isActive(){
    return this.authService.getToken()!="" ? true : false;
  }
}
