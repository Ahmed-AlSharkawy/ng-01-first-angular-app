import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  temp = ''
  states: string[];
  formDefaults = {
    loginData: { email: '', password: '' },
    personalData: { addressA: '', addressB: '', city: '', state: '0', zip: '' },
    optionsData: { remember: true, type: '' }
  };
  formResults = {
    loginData: { email: '', password: '' },
    personalData: { addressA: '', addressB: '', city: '', state: '', zip: '' },
    optionsData: { remember: '', type: '' }
  };
  constructor() {
    this.states = ['Medinah', 'Cairo', 'Aqsa', 'Baghdad', 'Tunis', 'Gaza'];
  }

  ngOnInit() {
    setTimeout(() => {
      // console.log(this.form);
      this.form.reset(this.formDefaults);
    }, 0);

  }

  onSubmit() {
    if (this.form.invalid) return;
    console.log(this.form.value);
    this.formResults = this.form.value;
    this.form.reset(this.formDefaults);
  }

}
