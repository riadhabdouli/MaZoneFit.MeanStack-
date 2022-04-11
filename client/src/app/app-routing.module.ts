import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { TrainerViewComponent } from './trainer-view/trainer-view.component';
import { workoutPlan } from './plans/workout/workout.component';
import { nutrtionPlan } from './plans/nutrition/nutrition.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate : [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component:RegisterComponent},
  { path: 'trainerview/:id', component:TrainerViewComponent},
  { path: 'workout/:id', component: workoutPlan },
  { path: 'nutrition/:id', component: nutrtionPlan },
  { path: 'nutrition', component: nutrtionPlan },
  { path: 'workout', component: workoutPlan }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
