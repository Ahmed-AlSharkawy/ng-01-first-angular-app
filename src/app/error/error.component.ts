import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  state: string;
  message: string;
  constructor(private route: ActivatedRoute) {
    this.state = '404';
    this.message = 'Page not found';
  }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.state = data['errorData'].state;
      this.message = data['errorData'].message;
    });
  }
}
