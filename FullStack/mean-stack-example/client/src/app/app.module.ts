import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSigninFormComponent } from './user-signin-form/user-signin-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';

 
@NgModule({
 declarations: [
   AppComponent,
   UserSigninFormComponent,
   NavbarComponent,
   HeroComponent,
   HomeComponent
 ],
 imports: [
   BrowserModule,
   AppRoutingModule,
   HttpClientModule,
   ReactiveFormsModule // <-- add this line
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }
