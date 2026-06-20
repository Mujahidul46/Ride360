import { Routes } from '@angular/router';
import { LoginComponent  } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { Stats } from './components/stats/stats';
import { Rides } from './components/rides/rides';
import { AddExpense } from './components/add-expense/add-expense';
import { ToggleRide } from './components/toggle-ride/toggle-ride';
import { AuthGuard } from './services/auth-guard.service';
import { Social } from './components/social/social';
import { Reminders } from './components/reminders/reminders';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // empty path makes it so that login page is first one to load when app starts
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'add-expense', component: AddExpense, canActivate: [AuthGuard] },
    { path: 'rides', component: Rides, canActivate: [AuthGuard] },
    { path: 'social', component: Social, canActivate: [AuthGuard] },
    { path: 'reminders', component: Reminders, canActivate: [AuthGuard]},
    { path: 'stats', component: Stats, canActivate: [AuthGuard] },
    { path: 'start-stop-ride', component: ToggleRide, canActivate: [AuthGuard] },
];
