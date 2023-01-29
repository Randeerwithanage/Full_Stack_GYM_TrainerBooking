import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSigninFormComponent } from './user-signin-form/user-signin-form.component';
import { HomeComponent } from './home/home.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TimeslotComponent } from './timeslot/timeslot.component';

 
const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent },
 { path: 'home/trainers', component: TrainersComponent },
 { path: 'home/trainers/timeslot', component: TimeslotComponent },
 { path: 'login', component: UserSigninFormComponent }]; 
 
 
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }