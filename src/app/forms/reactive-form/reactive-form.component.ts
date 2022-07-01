import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  temp = ''
  states: string[];

  formResults = {
    loginData: { email: '', password: '' },
    personalData: { addressA: '', addressB: '', city: '', zip: '' },
    optionsData: { remember: true, type: 'free' },
    statesData: ['Medinah']
  };

  reactiveForm: FormGroup;

  constructor() {
    this.states = ['Medinah', 'Cairo', 'Aqsa', 'Baghdad', 'Tunis', 'Gaza'];
  }

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      loginData: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email], [this.emailNotValid]),
        password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
      }),
      personalData: new FormGroup({
        addressA: new FormControl('', Validators.required),
        addressB: new FormControl(''),
        city: new FormControl('', Validators.required),
        zip: new FormControl('')
      }),
      optionsData: new FormGroup({
        remember: new FormControl(true, Validators.required),
        type: new FormControl('free', Validators.required)
      }),
      statesData: new FormArray([new FormControl('Medinah', [Validators.required, this.stateNotValid.bind(this)])])
      // statesData: new FormArray([], Validators.required)
    });

    this.reactiveForm.valueChanges.subscribe(value => console.log(value));
    this.reactiveForm.statusChanges.subscribe(state => console.log(state));

    this.reactiveForm.setValue(this.formResults);
    this.reactiveForm.patchValue({ personalData: { city: 'Medinah' } });
  }

  onSubmit() {
    if (this.reactiveForm.invalid) return;
    console.log(this.reactiveForm.value);
    this.formResults = this.reactiveForm.value;
    this.reactiveForm.reset();
  }

  onAddState() {
    const control = new FormControl(null, [Validators.required, this.stateNotValid.bind(this)]);
    (<FormArray>this.reactiveForm.get('statesData')).push(control);
  }

  stateNotValid(control: FormControl): { [s: string]: boolean } {
    const randomIndex = Math.floor(Math.random() * 5);

    if (control.value == this.states[randomIndex]) return { 'invalid': true };
    return null;
  }

  emailNotValid(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'test@test.com') resolve({ 'invalid': true })
        else resolve(null)
      }, 2000);
    })
    return promise;
  }
}
