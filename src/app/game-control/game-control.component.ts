import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { canComponentDeactivate } from '../shared/can-deactivate-guard.service';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent implements OnInit, canComponentDeactivate {
  swapComponents: boolean;
  numbers: { type: string; number: number }[];
  oddNumbers: number[];
  evenNumbers: number[];
  gameOn: boolean;
  gameNumber: number;
  gameInterval;

  constructor(private router: Router) {
    this.swapComponents = false;
    this.numbers = [];
    this.oddNumbers = [];
    this.evenNumbers = [];
    this.gameOn = false;
    this.gameNumber = 0;
  }

  ngOnInit() {}

  onStartGame() {
    this.gameOn = true;
    this.gameInterval = setInterval(() => {
      const type = ++this.gameNumber % 2 ? 'odd' : 'even';
      this.numbers.push({ type: type, number: this.gameNumber });
    }, 2000);
  }

  onStopGame() {
    this.gameOn = false;
    clearInterval(this.gameInterval);
  }

  onResetpGame() {
    if (this.gameOn) this.onStopGame();
    this.numbers = [];
    this.gameNumber = 0;
  }

  onResetAndBack() {
    this.onResetpGame();
    this.router.navigate(['/'], {
      queryParams: { source: 'game controller' },
      fragment: 'source-card',
    });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (
      (this.gameOn || this.gameNumber) &&
      !confirm('Your game is on, stop game and leave?')
    )
      return false;

    return true;
  }
}
