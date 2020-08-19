import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContectComponent } from './contect/contect.component';
import { HomeAboutUsComponent } from './home-about-us/home-about-us.component';
import { ContectCurd } from './contect-curd/contect-curd.component';
import { UpdateData } from './contect-curd/update-data/update-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContectComponent,
    HomeAboutUsComponent,
    ContectCurd,
    UpdateData,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
