import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { TaskComponent } from './components/task/task.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },

  { path: 'tasks', component: TaskComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/tasks', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
