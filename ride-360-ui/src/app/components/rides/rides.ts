// Rebuild trigger: March 14 2026
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { AddExpense } from '../add-expense/add-expense';
import { Ride } from '../../interfaces/Ride';
import { RidesService } from '../../services/rides.service';

@Component({
  selector: 'app-rides',
  imports: [DecimalPipe, DatePipe, AddExpense],
  templateUrl: './rides.html',
  styleUrl: './rides.scss',
})
export class Rides {
    userId! : number;
    rides : Ride[] = [];
    totalExpense: number = 0;
    currentDate: Date = new Date();
    showAddExpenseModal: boolean = false;

    constructor (
      private authService : AuthService,
      private ridesService: RidesService,
    ) {}

  ngOnInit() {
      this.userId = this.authService.getCurrentUserId();
      this.ridesService.getRides(this.userId, this.currentDate).subscribe({
        next: (data) => { this.rides = data;
        //this.getTotalExpense();
        },
        error: (err) => console.error(err),
      });
    }

    // getTotalExpense() { // could re-write this to get total riding duration
    //   let total = 0;
    //   for (let expense of this.expenses) {
    //     total += expense.amount;
    //   }
    //   this.totalExpense = total;
    // }

    getRidesForDate(previousOrNextDay: string) {
      this.rides = [];
      if (previousOrNextDay === 'previousDay') {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
      } else if (previousOrNextDay === 'nextDay') {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
      }

      this.currentDate = new Date(this.currentDate);

      this.ridesService.getRides(this.userId, this.currentDate).subscribe({
        next: (data) => { this.rides = data;
        //this.getTotalExpense();
        },
        error: (err) => console.error(err),
      });
    }

    isToday(): boolean {
      const today = new Date();
      return (this.currentDate.toDateString() === today.toDateString());
    }

}
