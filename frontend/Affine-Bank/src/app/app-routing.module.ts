import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContectCurdComponent } from './contect-curd/contect-curd.component';
import { UpdateDataComponent } from './contect-curd/update-data/update-data.component';


const routes: Routes = [
  {
    path:'', redirectTo:'/Home',pathMatch:'full'
  },
  {
    path:'Home', component:HomeComponent
  },
  {
    path:'curd',component:ContectCurdComponent
  },
  {
    path:'updatedata',component:UpdateDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
