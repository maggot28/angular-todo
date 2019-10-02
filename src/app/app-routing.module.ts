import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },

  { path: '', component: TaskComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
