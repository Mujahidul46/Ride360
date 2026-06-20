// Rebuild trigger: March 14 2026
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { Ride } from '../../interfaces/Ride';
import { RidesService } from '../../services/rides.service';

@Component({
  selector: 'app-rides',
  imports: [DatePipe],
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

    // 02:38:12.017 -> 2 hours 38 minutes
    // 01:01:01.117 -> 1 hour 1 minute
    // 00:00:01.387 -> 1 second
    formatDuration(duration: string | undefined): string {
      if (!duration) {
        console.warn("Duration is undefined or empty - cannot format.");
        return "";
      }

      const hours = duration.split(":")[0];
      const minutes = duration.split(":")[1];
      const seconds = duration.split(":")[2];

      const hoursAsNum = parseInt(hours, 10);
      const minutesAsNum = parseInt(minutes, 10);
      const secondsAsNum = parseInt(seconds, 10);

      if (isNaN(hoursAsNum) || isNaN(minutesAsNum)) {
        console.warn("Failed to parse minutes and/or hours. One or both was NaN");
        return "";
      }

      const formattedComponents: string[] = [];

      if (hoursAsNum === 1) {
        formattedComponents.push(`${hoursAsNum} hour`);
      }
      else if (hoursAsNum > 0) {
        formattedComponents.push(`${hoursAsNum} hours`);
      }

      if (minutesAsNum === 1) {
        formattedComponents.push(`${minutesAsNum} minute`);
      }
      else if (minutesAsNum > 0) {
        formattedComponents.push(`${minutesAsNum} minutes`);
      }

      if (hoursAsNum === 0 && minutesAsNum === 0) {
        if (secondsAsNum === 1) {
          formattedComponents.push(`${secondsAsNum} second`);
        }
        else if (secondsAsNum > 0) {
          formattedComponents.push(`${secondsAsNum} seconds`);
        }
      }
      
      return formattedComponents.join(" ");
    }

    //2026-06-20T17:54:27.45Z -> 17:54
    formatTime(time: string | undefined): string {
      if (!time) {
        console.warn(`Time is undefined or empty - cannot format.`);
        return "";
      }

      const timePart = time?.split("T")[1];
      const hoursMinutesSecondsPart = timePart.split(".")[0];
      const hoursPart = hoursMinutesSecondsPart.split(":")[0];
      const minutesPart = hoursMinutesSecondsPart.split(":")[1];
      
      return `${hoursPart}:${minutesPart}`;
      
    }
}
