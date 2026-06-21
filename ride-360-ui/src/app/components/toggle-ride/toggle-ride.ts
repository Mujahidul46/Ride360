import { Component } from '@angular/core';
import { RidesService } from '../../services/rides.service';
import { AuthService } from '../../services/auth.service';
import { Ride } from '../../interfaces/Ride';
import { CreateRideDto } from '../../interfaces/CreateRideDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toggle-ride',
  imports: [],
  templateUrl: './toggle-ride.html',
  styleUrl: './toggle-ride.scss',
})
export class ToggleRide {
  isRiding: boolean = false;
  elapsedSeconds: number = 0;
  seconds: number = 0;
  hours: number = 0;
  minutes: number = 0;
  timerInterval: any = null;
  currentGreeting: string = '';
  isDisplayingRideStartGreeting: boolean = false;
  showSaveRideModal: boolean = false;
  startTime: string = '';
  endTime: string = '';
  selectedRating: number = -1;
  rideStartGreetings: string[] = [
    'Have a great ride!',
    'Enjoy the journey!',
    'Stay safe out there!',
    'Happy riding!',
    'Let\'s go! 🏍️',
    'Adventure awaits!',
    'Ride your own ride 😎'
  ];

  constructor(
    private ridesService: RidesService,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleRideStatus() {
    if (!this.isRiding) {
      this.startStopwatch();
      this.showSaveRideModal = false;
      this.startTime = new Date().toISOString()
    }
    else {
      this.stopStopwatch();
      this.isDisplayingRideStartGreeting = false;
      this.showSaveRideModal = true;
      this.endTime = new Date().toISOString()
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

  setRating(value: number): void {
    this.selectedRating = value;
  }

  isRatingSelected(value: number): boolean {
    return value <= this.selectedRating;
  }

  createRide(rideName: string, rideDescription?: string, categoryId?: number,) {
    const ride: CreateRideDto = {
      name: rideName,
      description: rideDescription,
      rating: this.selectedRating,
      //categoryId: categoryId,
      startTime: this.startTime,
      endTime: this.endTime,
    }

    this.ridesService.createRide(ride)
      .subscribe({
        next: createdRide => {
          console.log('Ride created: ' + createdRide);
          this.showSaveRideModal = false;
          this.router.navigate(['/rides']);
          this.startTime = '';
          this.endTime = '';
          this.elapsedSeconds = 0;
          this.selectedRating = -1;
          this.formatTime();
        },
        error: err => {
          console.error('Create ride failed: ' + err)
        }
      });
  }

  closeSaveRideModal() {
    this.showSaveRideModal = false;
  }
}
