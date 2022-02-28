import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate : [AuthGuard] },
  { path: 'profile/:email', component: ProfileComponent },
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
