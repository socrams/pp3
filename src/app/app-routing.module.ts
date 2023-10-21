import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';

import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';
import { ResponseComponent } from './response/response.component';
import { GuardsGuard } from './guards/guards.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserList } from './userlist/userlist.component';
import { EjemploComponent } from './external/ejemplo/ejemplo.component';

const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path:'chat', component:ChatComponent},
  {path:'login', component:LoginComponent},
  {path:'user', component:UserComponent},
  {path:'userlist', component:UserList, canActivate: [GuardsGuard]},
  {path:'nav', component:NavbarComponent},
  {path:'logout', component: LogoutComponent},
  {path:'userManagement', component: UserManagementComponent},
  // {path:'carrera', component: CarreraComponent},
  {path:'response', component: ResponseComponent, canActivate: [GuardsGuard]},
  {path: 'ejemplo', component: EjemploComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
