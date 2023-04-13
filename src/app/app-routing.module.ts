import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path:'chat', component:ChatComponent},
  {path:'login', component:LoginComponent},
  {path:'user', component:UserComponent},
  {path:'userlist', component:RegisterComponent},
  {path:'nav', component:NavbarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
