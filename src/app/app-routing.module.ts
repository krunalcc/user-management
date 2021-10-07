import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';
import { LoginComponent } from './login/login.component';
import { UserGridComponent } from './user-grid/user-grid.component';

const routes: Routes = [
  { path: "Login", component: LoginComponent },
  { path: "Users", component: UserGridComponent, canActivate: [AuthguardGuard] },
  { path: "**", redirectTo: "Login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
