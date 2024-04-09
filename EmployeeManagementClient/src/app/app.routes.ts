import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
    { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '**', component: NotFoundComponent },


];
