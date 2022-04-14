import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pg1Component } from './pg1/pg1.component';
import { Pg2Component } from './pg2/pg2.component';

const routes: Routes = [
  { path: "home", component: Pg1Component },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'por-estado', component: Pg2Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
