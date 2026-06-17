import { HttpClient } from "@angular/common/http";
import { baseApiUrl } from "../../environment";
import { User } from "../interfaces/User";
import { Observable, tap } from "rxjs";
import { LoginRequest } from "../interfaces/LoginRequest";
import { LoginResponse } from "../interfaces/LoginResponse";
import { SignUpRequest } from "../interfaces/SignUpRequest";
import { Injectable, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "./toast-service";

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor (
        private http: HttpClient,
        private router: Router,
        private toastService: ToastService) {}

    public getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    // /auth/login
    // store the token in local storage
    public logIn(loginDetails: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${baseApiUrl}/auth/login`, loginDetails)
        .pipe(
            tap(response => {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userId', response.userId.toString());
                localStorage.setItem('username', response.username);
                localStorage.setItem('isAdmin', response.isAdmin.toString());
            })
        );
    }

    // /auth/signup
    // username, email , password
    public signUp(signUpDetails: SignUpRequest) : Observable<void> { // learning point: without observable you cant see if the response succeeded or failed
        return this.http.post<void>(`${baseApiUrl}/auth/signup`, signUpDetails);
    }

    public logOut(): void {
        // remove token from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');

        // redirect to login form
        this.router.navigate(['/login']);
    }

    public isAdmin(): boolean {
        return localStorage.getItem('isAdmin') === "true";
    }

    public isLoggedIn(): boolean {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    public getCurrentUserId(): number {
        return Number(localStorage.getItem('userId'));
    }

    // If the token is expired, log the user out. 
    // Without this code, the frontend was receiving 401 errors as the client 
    // was sending API requests whilst unauthorized.
    // This was causing bad UX because the user saw themselves as logged in,
    // but were not actually authorized.
    public isTokenExpired(token?: string | null): boolean {
        if (!token) return true;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const tokenExpiredAt = payload.exp * 1000; // Amount of time after Jan 1 1970 that has passed at the point of expiry
            const currentTime = Date.now(); // Amount of time after Jan 1 1970 that has passed until present
            return currentTime >= tokenExpiredAt;
        }
        catch {
            return true;
        }
    }
}