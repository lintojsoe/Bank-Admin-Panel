import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Animations } from 'app/shared/animations';

@Component({
  selector: 'app-fixed-container',
  templateUrl: './fixed-container.component.html',
  styleUrls: ['./fixed-container.component.scss'],
  animations: [Animations.slideInLeft]
})
export class FixedContainerComponent implements OnInit {
  constructor(public location: Location) {}

  ngOnInit(): void {}
}
