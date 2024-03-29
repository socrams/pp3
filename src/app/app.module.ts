import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { UserList } from './userlist/userlist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';
import { CarreraComponent } from './carrera/carrera.component';
import { ResponseComponent } from './response/response.component';
import { ContenedorMensajeComponent } from './contenedor-mensaje/contenedor-mensaje.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EjemploComponent } from './external/ejemplo/ejemplo.component';

@NgModule({
  declarations: [
    ResponseComponent,
    AppComponent,
    LoginComponent,
    ChatComponent,
    WelcomeComponent,
    UserComponent,
    UserList,
    NavbarComponent,
    LogoutComponent,
    CarreraComponent,
    ResponseComponent,
    ContenedorMensajeComponent,
    UserManagementComponent,
    EjemploComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
