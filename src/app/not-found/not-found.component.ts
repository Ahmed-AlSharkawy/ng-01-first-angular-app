import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  state: string;
  message: string;
  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.data.subscribe((data: Data) => {
      this.state = data['state'];
      this.message = data['message'];
    });
  }
}
