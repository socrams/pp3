import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';
import { ResponseComponent } from './response/response.component';
import { GuardsGuard } from './guards/guards.guard';

const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path:'chat', component:ChatComponent},
  {path:'login', component:LoginComponent},
  {path:'user', component:UserComponent},
  {path:'userlist', component:RegisterComponent, canActivate: [GuardsGuard]},
  {path:'nav', component:NavbarComponent},
  {path:'logout', component: LogoutComponent},
  // {path:'carrera', component: CarreraComponent},
  {path:'response', component: ResponseComponent, canActivate: [GuardsGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
