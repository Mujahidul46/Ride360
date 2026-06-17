import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastsContainer } from './shared/toasts-container/toasts-container';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { BottomNav } from './components/bottom-nav/bottom-nav';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastsContainer, CommonModule, BottomNav],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // on app startup, check if token is expired. if so then immediately logout
    const token = this.authService.getToken();
    if (this.authService.isTokenExpired(token)) {
      this.authService.logOut();
    }
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
}
