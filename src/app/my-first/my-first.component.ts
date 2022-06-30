import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-first',
  templateUrl: './my-first.component.html',
  styleUrls: ['./my-first.component.css'],
})
export class MyFirstComponent implements OnInit, OnDestroy {
  isObsOn: boolean;
  intervalObservable: Subscription;

  maxNumber: number;
  badNumber: number;
  startNumber: number;
  observableState: string;
  observableValue: string;
  customObservable: Observable<number>;
  customObsOperators: any;
  customObsSubscriber: Subscription;

  source: string;
  sourceCard: string;
  username: string = 'initial value';
  isEmpty = true;
  displayDetais = false;
  logs = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.isObsOn = false;
    this.maxNumber = 0;
    this.badNumber = 0;
    this.startNumber = 0;
    this.observableState = 'secondary';
    this.observableValue = 'Click to start';
    this.customObservable = new Observable((observer) => {
      let counter = this.startNumber;
      setInterval(() => {
        if (counter >= this.badNumber)
          observer.error('badNumber reached! observable down.');
        if (counter >= this.maxNumber) observer.complete();
        observer.next(counter++);
      }, 1000);
    });
    this.customObsOperators = this.customObservable.pipe(
      map(
        (value: number) =>
          'Observable started on ' +
          this.startNumber +
          ' : Round ' +
          (value - this.startNumber)
      )
    );
  }

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

  toggleObservable() {
    if (this.isObsOn) this.intervalObservable.unsubscribe();
    else
      this.intervalObservable = interval(1000).subscribe(
        (counter) => (this.username = counter.toString())
      );
    this.isObsOn = !this.isObsOn;
  }

  startCustomObservable(startObsOperator: boolean) {
    if (this.observableState == 'primary') return;
    this.observableState = 'primary';
    if (startObsOperator)
      this.customObsSubscriber = this.customObsOperators.subscribe({
        next: (value) => start(value),
        error: (err) => error(err),
        complete: () => complete(),
      });
    else
      this.customObsSubscriber = this.customObservable.subscribe({
        next: (value) => start(value),
        error: (err) => error(err),
        complete: () => complete(),
      });

    const start = (value: any) => {
      console.log(value);
      this.observableValue = value.toString();
    };
    const error = (error: string) => {
      console.error(error);
      this.observableValue = error;
      this.observableState = 'danger';
    };
    const complete = () => {
      console.info('complete');
      this.observableValue =
        'maxNumber reached! observable completed successfuly.';
      this.observableState = 'success';
    };
  }

  ngOnDestroy() {
    if (this.isObsOn) this.intervalObservable.unsubscribe();
    if (this.observableState == 'primary')
      this.customObsSubscriber.unsubscribe();
  }
}
