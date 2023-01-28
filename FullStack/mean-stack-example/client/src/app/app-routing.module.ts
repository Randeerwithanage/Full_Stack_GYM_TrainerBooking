import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSigninFormComponent } from './user-signin-form/user-signin-form.component';
import { HomeComponent } from './home/home.component';

 
const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent },
 { path: 'login', component: UserSigninFormComponent }]; 
 
 
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }