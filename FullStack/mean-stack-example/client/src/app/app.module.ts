import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSigninFormComponent } from './user-signin-form/user-signin-form.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TimeslotComponent } from './timeslot/timeslot.component';

 
@NgModule({
 declarations: [
   AppComponent,
   UserSigninFormComponent,
   HeroComponent,
   HomeComponent,
   NavBarComponent,
   TrainersComponent,
   TimeslotComponent
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
