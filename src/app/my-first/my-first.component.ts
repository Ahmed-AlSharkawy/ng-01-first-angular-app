import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-first',
  templateUrl: './my-first.component.html',
  styleUrls: ['./my-first.component.css'],
})
export class MyFirstComponent implements OnInit {
  source: string;
  sourceCard: string;
  username: string = 'initial value';
  isEmpty = true;
  displayDetais = false;
  logs = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.source = this.activatedRoute.snapshot.queryParams['source'];
    this.sourceCard = this.activatedRoute.snapshot.fragment;

    this.activatedRoute.queryParams.subscribe(
      (params) => (this.source = params['source'])
    );
    this.activatedRoute.fragment.subscribe(
      (value) => (this.sourceCard = value)
    );
  }

  onReset() {
    this.username = '';
    this.logs = [];
    this.displayDetais = false;
    this.router.navigate(['/']);
  }

  onToggleDisplay() {
    this.displayDetais = !this.displayDetais;
    this.logs.push({
      time: new Date(new Date().getTime()).toLocaleTimeString(),
      status: this.displayDetais ? 'Details displayed' : 'Detalis hided',
    });
  }
}
