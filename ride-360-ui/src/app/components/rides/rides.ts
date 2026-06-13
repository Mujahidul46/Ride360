// Rebuild trigger: March 14 2026
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { AddExpense } from '../add-expense/add-expense';

@Component({
  selector: 'app-rides',
  imports: [DecimalPipe, DatePipe, AddExpense],
  templateUrl: './rides.html',
  styleUrl: './rides.scss',
})
export class Rides {

  constructor (
    private authService : AuthService,
  ) {

  }
}
