import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CounterComponent } from './components/counter/counter.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'counter', component: CounterComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(
      routes
    ),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
