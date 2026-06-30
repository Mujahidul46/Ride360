import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastsContainer } from './shared/toasts-container/toasts-container';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { BottomNav } from './components/bottom-nav/bottom-nav';
import { RidesService } from './services/rides.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastsContainer, CommonModule, BottomNav],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private activeRideStartTime?: string = '';
  private activeRideDuration?: string = '';
  private hours: number = 0;
  private minutes: number = 0;
  private seconds: number = 0;

  constructor (
    private authService: AuthService,
    private ridesService: RidesService
  ) {}

  ngOnInit() {
    console.log('INSIDE ngOnInit()');
    // on app startup, check if token is expired. if so then immediately logout
    const token = this.authService.getToken();
    if (this.authService.isTokenExpired(token)) {
      this.authService.logOut();
    }
    this.checkIfActiveRide();
  }

  logout() {
    this.authService.logOut();
  }

  isAdmin(): boolean{
    return this.authService.isAdmin();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  checkIfActiveRide(): void {
    //if active ride, retreive the start time.
    // calculate current time and do currentTime (new Date()) - startTime 
    // display this value
    const userId = this.authService.getCurrentUserId();
    const activeRide = this.ridesService.getActiveRide(userId)
                        .subscribe({
                          next: activeRide => {
                            const currentTimeDate = new Date();
                            const startTimeDate = new Date(activeRide.startTime);
                            const elapsedSeconds = (currentTimeDate.getTime() - startTimeDate.getTime()) / 1000;
                            this.formatDuration(elapsedSeconds);
                          },
                          error: err => {
                            console.error('no active ride found: ' + err);
                          }
                        });
    console.log('INSIDE checkIfActiveRide()');
  }

  formatDuration(elapsedSeconds: number) {
    this.hours = Math.floor(elapsedSeconds / 3600);
    this.minutes = Math.floor((elapsedSeconds % 3600) / 60);
    this.seconds = elapsedSeconds % 60;
  }
}
