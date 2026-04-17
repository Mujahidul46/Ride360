import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-start-stop-ride',
  imports: [],
  templateUrl: './start-stop-ride.html',
  styleUrl: './start-stop-ride.scss',
})
export class StartStopRide {
  isRiding: boolean = false;
  elapsedSeconds: number = 0;
  seconds: number = 0;
  hours: number = 0;
  minutes: number = 0;
  timerInterval: any = null;
  currentGreeting: string = '';
  isDisplayingRideStartGreeting: boolean = false;
  rideStartGreetings: string[] = [
    'Have a great ride!',
    'Enjoy the journey!',
    'Stay safe out there!',
    'Happy riding!',
    'Let\'s go! 🏍️',
    'Adventure awaits!',
    'Ride your own ride 😎'
  ];

  toggleRideStatus() {
    if (!this.isRiding) {
      this.startStopwatch();
    }
    else {
      this.stopStopwatch();
      this.isDisplayingRideStartGreeting = false;
    }
    this.isRiding = !this.isRiding;
  }

  startStopwatch() {
    this.elapsedSeconds = 0;
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      this.formatTime();
      this.checkIfStopwatchLimitReached();
    }, 1000);
  }

  stopStopwatch() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    console.log('You have stopped riding. You rode for: ' + this.elapsedSeconds + ' seconds.');
  }

  formatTime() {
    this.hours = Math.floor(this.elapsedSeconds / 3600);
    this.minutes = Math.floor((this.elapsedSeconds % 3600) / 60);
    this.seconds = this.elapsedSeconds % 60;
  }

  checkIfStopwatchLimitReached() {
    if(this.elapsedSeconds >= 359999) // 99 hours, 59 minutes, 59 seconds
    {
      this.stopStopwatch();
      this.isRiding = false;
    }
  }

  padTimeToTwoDigits(time: number): string {
    if (time < 10) {
      return '0' + time.toString();
    }
    return time.toString();
  }

  selectRandomRideStartGreeting(): string {
    if(!this.isDisplayingRideStartGreeting) {
      let randomIndex = Math.floor(Math.random() * this.rideStartGreetings.length);
      this.isDisplayingRideStartGreeting = true;
      this.currentGreeting = this.rideStartGreetings[randomIndex];
     }
     return this.currentGreeting;
    
  }
}
