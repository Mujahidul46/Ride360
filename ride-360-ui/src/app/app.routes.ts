import { Routes } from '@angular/router';
import { LoginComponent  } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { Stats } from './components/stats/stats';
import { Rides } from './components/rides/rides';
import { AddExpense } from './components/add-expense/add-expense';
import { ToggleRide } from './components/toggle-ride/toggle-ride';
import { Photos } from './components/photos/photos';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // empty path makes it so that login page is first one to load when app starts
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'add-expense', component: AddExpense },
    { path: 'rides', component: Rides },
    { path: 'stats', component: Stats },
    { path: 'start-stop-ride', component: ToggleRide },
    { path: 'photos', component: Photos },
];
