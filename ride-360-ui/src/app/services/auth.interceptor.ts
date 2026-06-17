import { HttpInterceptorFn } from "@angular/common/http";
import { throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token && authService.isTokenExpired(token)) {
        authService.logOut();
        return throwError(() => new Error('Token expired - please login again'));
    }
    
    if (token) {
        const clonedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clonedRequest);
    }

    return next(request);
}