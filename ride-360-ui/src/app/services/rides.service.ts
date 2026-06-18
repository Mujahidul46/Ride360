import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Ride } from "../interfaces/Ride";
import { Injectable } from "@angular/core";
import { baseApiUrl } from "../../environment";

@Injectable({providedIn: 'root'})
export class RidesService {
    constructor(private http: HttpClient) {}

    public getRides(userId: number, date?: Date): Observable<Ride[]> {
        let url = `${baseApiUrl}/rides/users/${userId}`;
        
        if (date) {
            let dateAsString = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
            url += `?date=${dateAsString}`;
        }

        return this.http.get<Ride[]>(url);
    }

    // public deleteExpense(expenseId: number): Observable<void> {
    //     return this.http.delete<void>(`${baseApiUrl}/expenses/${expenseId}`);
    // }

    // public createExpense(expense : Expense) : Observable<Expense> {
    //     return this.http.post<Expense>(`${baseApiUrl}/expenses`, expense);
    // }

    // public updateExpense(expenseId: number, expense: Partial<Expense>) : Observable<Expense> {
    //     return this.http.put<Expense>(`${baseApiUrl}/expenses/${expenseId}`, expense);
    // }

    public createRide(ride: Ride): Observable<Ride> {
        return this.http.post<Ride>(`${baseApiUrl}/rides`, ride);
    }
}

