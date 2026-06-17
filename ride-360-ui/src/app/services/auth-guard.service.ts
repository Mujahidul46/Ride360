import { Injectable } from "@angular/core";
import { CanActivate, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
    ) {}

    canActivate(): boolean | UrlTree {
        const token = this.authService.getToken();
        if (!token || this.authService.isTokenExpired(token)) {
            this.authService.logOut();
            return false;
        }
        return true;
    }
}