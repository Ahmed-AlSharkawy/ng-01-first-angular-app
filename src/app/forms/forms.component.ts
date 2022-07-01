import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    router.navigate(['template'], { relativeTo: activatedRoute })
  }

  ngOnInit() {
  }

}
